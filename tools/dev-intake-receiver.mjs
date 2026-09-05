#!/usr/bin/env node
/**
 * DEVELOPMENT ONLY — local intake receiver for Prime Insurances.
 *
 * The two intake routes normally fail closed (503) because they need external
 * infrastructure. This script stands in for both so the forms can be exercised
 * end to end on a workstation:
 *
 *   1. A PostgREST-shaped endpoint at /rest/v1/risk_assessments, implementing
 *      only the two calls src/app/api/risk-assessments/route.ts actually makes:
 *        POST ?on_conflict=submission_id&select=...   (Prefer: resolution=ignore-duplicates)
 *        GET  ?submission_id=eq.<uuid>&select=...&limit=1
 *      Conflict handling mirrors ON CONFLICT DO NOTHING: an existing
 *      submission_id returns [] so the route performs its follow-up lookup.
 *
 *   2. A claims webhook receiver at /claims-webhook that checks the bearer
 *      token and deduplicates on the Idempotency-Key header, which is exactly
 *      what the README requires of a real receiver.
 *
 * NOT A SUPABASE REPLACEMENT. It does not implement Postgres types, RLS,
 * constraints or the status CHECK. Use supabase/migrations/0001_risk_assessments.sql
 * against a real project for anything beyond local form testing.
 *
 * Records are written as JSON lines outside the repository. Real submissions
 * contain contract addresses, security-control descriptions and named contacts,
 * so never point this at production traffic and never commit its output.
 *
 * Usage:
 *   node tools/dev-intake-receiver.mjs [--port 4000] [--data-dir <path>]
 */

import { createServer } from "node:http";
import { createServer as createTlsServer } from "node:https";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
}

const PORT = Number(arg("port", process.env.DEV_RECEIVER_PORT || 4000));
const DATA_DIR = arg("data-dir", process.env.DEV_RECEIVER_DATA_DIR || "/mnt/storage/insureme-dev-data");
const CLAIMS_TOKEN = process.env.DEV_CLAIMS_TOKEN || "dev-claims-token";

const ASSESSMENTS_LOG = join(DATA_DIR, "risk_assessments.jsonl");
const CLAIMS_LOG = join(DATA_DIR, "claims_notifications.jsonl");

// The claims route refuses any webhook URL that is not HTTPS, with no
// development exception, so TLS is required to exercise that form locally.
// Point Next at the same certificate with NODE_EXTRA_CA_CERTS so certificate
// verification stays ON rather than disabling it globally.
const TLS_CERT = arg("tls-cert", join(DATA_DIR, "dev-cert.pem"));
const TLS_KEY = arg("tls-key", join(DATA_DIR, "dev-key.pem"));
const useTls = existsSync(TLS_CERT) && existsSync(TLS_KEY);

/** submission_id -> stored assessment row */
const assessments = new Map();
/** Idempotency-Key -> stored claim reference */
const claims = new Map();

function json(res, status, body) {
  const raw = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(raw),
  });
  res.end(raw);
}

async function body(req) {
  const chunks = [];
  let bytes = 0;
  for await (const chunk of req) {
    bytes += chunk.length;
    // Generous local ceiling; the app already enforces its own limits.
    if (bytes > 1_000_000) throw new Error("body too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

/** Return only the columns PostgREST was asked for. */
function project(row, select) {
  if (!select) return row;
  const cols = select
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  return Object.fromEntries(cols.map((c) => [c, row[c]]));
}

async function restore() {
  await mkdir(DATA_DIR, { recursive: true });
  if (existsSync(ASSESSMENTS_LOG)) {
    const lines = (await readFile(ASSESSMENTS_LOG, "utf8")).split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const row = JSON.parse(line);
        if (row?.submission_id) assessments.set(row.submission_id, row);
      } catch {
        /* skip malformed line */
      }
    }
  }
  if (existsSync(CLAIMS_LOG)) {
    const lines = (await readFile(CLAIMS_LOG, "utf8")).split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const rec = JSON.parse(line);
        if (rec?.idempotencyKey) claims.set(rec.idempotencyKey, rec.payload?.reference ?? null);
      } catch {
        /* skip malformed line */
      }
    }
  }
}

const handler = async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  // ---- Inspection helpers (dev convenience) -------------------------------
  if (req.method === "GET" && path === "/_dev/health") {
    return json(res, 200, {
      ok: true,
      assessments: assessments.size,
      claims: claims.size,
      dataDir: DATA_DIR,
    });
  }
  if (req.method === "GET" && path === "/_dev/assessments") {
    return json(res, 200, [...assessments.values()]);
  }
  if (req.method === "GET" && path === "/_dev/claims") {
    return json(res, 200, [...claims.entries()].map(([key, reference]) => ({ key, reference })));
  }

  // ---- PostgREST-shaped assessment store ---------------------------------
  if (path === "/rest/v1/risk_assessments") {
    const select = url.searchParams.get("select");

    if (req.method === "POST") {
      let row;
      try {
        row = JSON.parse(await body(req));
      } catch {
        return json(res, 400, { code: "22P02", message: "invalid input syntax" });
      }

      if (!row?.submission_id) {
        return json(res, 400, { code: "23502", message: "null value in column submission_id" });
      }

      // ON CONFLICT (submission_id) DO NOTHING -> empty representation.
      if (assessments.has(row.submission_id)) {
        console.log(`[assessments] duplicate submission_id ${row.submission_id} -> [] (route will re-read)`);
        return json(res, 201, []);
      }

      // Reject a duplicate reference the way a UNIQUE index would.
      for (const existing of assessments.values()) {
        if (existing.reference === row.reference) {
          return json(res, 409, { code: "23505", message: "duplicate key value violates unique constraint" });
        }
      }

      const stored = { ...row, created_at: new Date().toISOString() };
      assessments.set(row.submission_id, stored);
      await appendFile(ASSESSMENTS_LOG, `${JSON.stringify(stored)}\n`, "utf8");
      console.log(`[assessments] stored ${stored.reference} (${stored.protocol}) <${stored.contact_email}>`);
      return json(res, 201, [project(stored, select)]);
    }

    if (req.method === "GET") {
      const eq = url.searchParams.get("submission_id");
      const id = eq?.startsWith("eq.") ? eq.slice(3) : null;
      const found = id ? assessments.get(id) : undefined;
      return json(res, 200, found ? [project(found, select)] : []);
    }

    return json(res, 405, { message: "method not allowed" });
  }

  // ---- Claims webhook receiver -------------------------------------------
  if (req.method === "POST" && path === "/claims-webhook") {
    if (req.headers.authorization !== `Bearer ${CLAIMS_TOKEN}`) {
      console.log("[claims] rejected: bad bearer token");
      return json(res, 401, { error: "unauthorized" });
    }

    const key = req.headers["idempotency-key"];
    if (!key) {
      console.log("[claims] rejected: missing Idempotency-Key");
      return json(res, 400, { error: "Idempotency-Key required" });
    }

    let payload;
    try {
      payload = JSON.parse(await body(req));
    } catch {
      return json(res, 400, { error: "invalid json" });
    }

    if (claims.has(key)) {
      console.log(`[claims] duplicate Idempotency-Key ${key} -> already stored as ${claims.get(key)}`);
      return json(res, 200, { deduplicated: true, reference: claims.get(key) });
    }

    // Persist BEFORE returning 2xx, as the README requires of a real receiver.
    await appendFile(
      CLAIMS_LOG,
      `${JSON.stringify({ idempotencyKey: key, receivedAt: new Date().toISOString(), payload })}\n`,
      "utf8",
    );
    claims.set(key, payload?.reference ?? null);
    console.log(`[claims] stored ${payload?.reference} (${payload?.incidentType}) <${payload?.email}>`);
    return json(res, 202, { accepted: true, reference: payload?.reference ?? null });
  }

  return json(res, 404, { error: "not found" });
};

const server = useTls
  ? createTlsServer(
      { cert: readFileSync(TLS_CERT), key: readFileSync(TLS_KEY) },
      handler,
    )
  : createServer(handler);

await restore();
server.listen(PORT, "127.0.0.1", () => {
  const scheme = useTls ? "https" : "http";
  console.log(`dev intake receiver on ${scheme}://127.0.0.1:${PORT}  (loopback only)`);
  console.log(`  data dir            ${DATA_DIR}`);
  if (!useTls) {
    console.log("  TLS OFF — the claims route requires an HTTPS webhook, so /claims/notify");
    console.log("            cannot be tested until dev-cert.pem and dev-key.pem exist.");
  }
  console.log(`  assessments (PostgREST shim)  /rest/v1/risk_assessments  [${assessments.size} loaded]`);
  console.log(`  claims webhook                /claims-webhook            [${claims.size} loaded]`);
  console.log(`  inspect                       /_dev/assessments  /_dev/claims  /_dev/health`);
});
