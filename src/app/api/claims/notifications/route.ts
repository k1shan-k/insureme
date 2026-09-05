import { NextResponse } from "next/server";
import { createIpRateLimiter } from "@/lib/rateLimit";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_BODY_BYTES = 32_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 4;

const ALLOWED_KEYS = new Set([
  "submissionId",
  "policyReference",
  "organization",
  "contactName",
  "email",
  "role",
  "phone",
  "discoveredAt",
  "discoveredAtLocal",
  "timezoneOffsetMinutes",
  "timezone",
  "incidentType",
  "incidentStatus",
  "summary",
  "affectedSystems",
  "transactionHashes",
  "estimatedLoss",
  "mitigation",
  "evidenceLinks",
  "acknowledgement",
  "companySite",
]);
const INCIDENT_TYPES = new Set([
  "smart-contract",
  "protocol-exploit",
  "bridge-cross-chain",
  "oracle",
  "depeg",
  "treasury-custody",
  "operational",
  "other",
]);
const INCIDENT_STATUSES = new Set([
  "active",
  "contained",
  "recovery",
  "resolved",
  "unknown",
]);
// Per-instance only. See src/lib/rateLimit.ts — edge rate limiting is required
// in production on Vercel/Netlify.
const isRateLimited = createIpRateLimiter({
  limit: RATE_LIMIT,
  windowMs: RATE_WINDOW_MS,
});

class BodyTooLargeError extends Error {}
function text(value: unknown, max: number) {
  return typeof value === "string" && value.length <= max ? value.trim() : null;
}

function choice(value: unknown, allowed: Set<string>) {
  return typeof value === "string" && allowed.has(value) ? value : null;
}

function isValidDiscoveryTime(value: string) {
  if (!value.endsWith("Z")) return false;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return false;
  const now = Date.now();
  const earliest = Date.UTC(2010, 0, 1);
  return timestamp >= earliest && timestamp <= now + 5 * 60_000;
}

function isValidTimezoneOffset(value: unknown): value is number {
  return (
    Number.isInteger(value) && Number(value) >= -840 && Number(value) <= 840
  );
}

function areValidEvidenceLinks(value: string) {
  if (!value) return true;
  const candidates = value.split(/[\s,]+/).filter(Boolean);
  if (candidates.length > 10) return false;
  return candidates.every((candidate) => {
    try {
      const url = new URL(candidate);
      return url.protocol === "https:" && !url.username && !url.password;
    } catch {
      return false;
    }
  });
}

async function readBodyWithLimit(request: Request) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytesRead = 0;
  let raw = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      if (bytesRead > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }
      raw += decoder.decode(value, { stream: true });
    }
    return raw + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 },
    );
  }

  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many notifications. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Notification exceeds the permitted size." },
      { status: 413 },
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(await readBodyWithLimit(request));
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return NextResponse.json(
        { error: "Notification exceeds the permitted size." },
        { status: 413 },
      );
    }
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json(
      { error: "Request body must be an object." },
      { status: 400 },
    );
  }

  const body = parsed as Record<string, unknown>;
  if (Object.keys(body).some((key) => !ALLOWED_KEYS.has(key))) {
    return NextResponse.json(
      { error: "Request contains unsupported fields." },
      { status: 422 },
    );
  }

  if (body.companySite !== undefined && body.companySite !== "") {
    return NextResponse.json(
      { error: "Notification could not be accepted." },
      { status: 400 },
    );
  }

  const submissionId = text(body.submissionId, 36);
  const policyReference = text(body.policyReference, 120);
  const organization = text(body.organization, 160);
  const contactName = text(body.contactName, 120);
  const email = text(body.email, 254)?.toLowerCase() || null;
  const role = text(body.role, 120);
  const phone = text(body.phone, 50);
  const discoveredAt = text(body.discoveredAt, 40);
  const discoveredAtLocal = text(body.discoveredAtLocal, 40);
  const timezoneOffsetMinutes = body.timezoneOffsetMinutes;
  const timezone = text(body.timezone, 100);
  const incidentType = choice(body.incidentType, INCIDENT_TYPES);
  const incidentStatus = choice(body.incidentStatus, INCIDENT_STATUSES);
  const summary = text(body.summary, 3_000);
  const affectedSystems = text(body.affectedSystems, 2_000);
  const transactionHashes = text(body.transactionHashes, 4_000);
  const estimatedLoss = text(body.estimatedLoss, 120);
  const mitigation = text(body.mitigation, 2_000);
  const evidenceLinks = text(body.evidenceLinks, 1_000);
  const acknowledgement = body.acknowledgement === true;

  if (
    !submissionId ||
    !UUID.test(submissionId) ||
    !policyReference ||
    !organization ||
    !contactName ||
    !email ||
    !EMAIL.test(email) ||
    !discoveredAt ||
    !isValidDiscoveryTime(discoveredAt) ||
    !discoveredAtLocal ||
    !isValidTimezoneOffset(timezoneOffsetMinutes) ||
    !timezone ||
    !incidentType ||
    !incidentStatus ||
    !summary ||
    summary.length < 20 ||
    !acknowledgement
  ) {
    return NextResponse.json(
      {
        error:
          "Policy reference, organization, authorized contact, valid email, discovery time, incident classification, summary and acknowledgement are required.",
      },
      { status: 422 },
    );
  }

  if (
    role === null ||
    phone === null ||
    affectedSystems === null ||
    transactionHashes === null ||
    estimatedLoss === null ||
    mitigation === null ||
    evidenceLinks === null ||
    !areValidEvidenceLinks(evidenceLinks)
  ) {
    return NextResponse.json(
      {
        error:
          "One or more submitted fields contain invalid or excessive values.",
      },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.CLAIMS_NOTIFICATION_WEBHOOK_URL;
  const webhookToken = process.env.CLAIMS_NOTIFICATION_WEBHOOK_TOKEN;
  if (!webhookUrl || !webhookToken) {
    return NextResponse.json(
      {
        error:
          "Online claims intake is temporarily unavailable. Follow the notice method and administrator contact stated in your issued documentation.",
      },
      { status: 503 },
    );
  }

  try {
    const configuredUrl = new URL(webhookUrl);
    if (
      configuredUrl.protocol !== "https:" ||
      configuredUrl.username ||
      configuredUrl.password
    ) {
      throw new Error("Claims webhook must use HTTPS without URL credentials");
    }
  } catch {
    return NextResponse.json(
      { error: "Online claims intake is temporarily unavailable." },
      { status: 503 },
    );
  }

  const reference = `CLM-${new Date(discoveredAt).getUTCFullYear()}-${submissionId.slice(0, 8).toUpperCase()}`;
  const payload = {
    reference,
    submissionId,
    receivedAt: new Date().toISOString(),
    policyReference,
    organization,
    contactName,
    email,
    role,
    phone,
    discoveredAt,
    discoveredAtLocal,
    timezoneOffsetMinutes,
    timezone,
    incidentType,
    incidentStatus,
    summary,
    affectedSystems,
    transactionHashes,
    estimatedLoss,
    mitigation,
    evidenceLinks,
    acknowledgement,
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${webhookToken}`,
        "Idempotency-Key": submissionId,
        "X-Claim-Reference": reference,
      },
      body: JSON.stringify(payload),
      redirect: "manual",
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok || (upstream.status >= 300 && upstream.status < 400)) {
      throw new Error(`Claims webhook returned ${upstream.status}`);
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "Claims intake is currently unavailable. Please retry; the same submission identifier will be reused to prevent duplicate intake.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      reference,
      status: "received_for_initial_review",
      message: "Incident notification received for initial review only.",
    },
    { status: 202 },
  );
}
