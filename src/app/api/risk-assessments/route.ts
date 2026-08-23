import { NextResponse } from "next/server";
import { insurancePrograms } from "@/lib/programs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 32_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;

const ALLOWED_KEYS = new Set([
  "protocol",
  "website",
  "category",
  "tvl",
  "chains",
  "audits",
  "governance",
  "admin",
  "oracles",
  "interests",
  "name",
  "email",
  "role",
  "notes",
  "companySite",
]);
const ALLOWED_CHAINS = new Set([
  "Ethereum",
  "Arbitrum",
  "Optimism",
  "Base",
  "Polygon",
  "Solana",
  "Other",
]);
const ALLOWED_PROGRAMS = new Set(
  insurancePrograms.map((program) => program.slug),
);
const ALLOWED_CATEGORIES = new Set([
  "Lending",
  "DEX / AMM",
  "Stablecoin",
  "Bridge",
  "Derivatives",
  "Staking / LST",
  "Infrastructure",
  "Other",
]);
const ALLOWED_TVL = new Set([
  "",
  "< $10M",
  "$10M – $50M",
  "$50M – $250M",
  "$250M – $1B",
  "> $1B",
]);
const ALLOWED_AUDITS = new Set([
  "",
  "No formal audit",
  "1 audit",
  "2–3 audits",
  "4+ audits / continuous",
]);
const ALLOWED_GOVERNANCE = new Set([
  "",
  "Multisig",
  "Timelock + multisig",
  "On-chain DAO",
  "Foundation-controlled",
  "Immutable",
]);
const ALLOWED_ADMIN = new Set([
  "",
  "Upgradeable proxies",
  "Timelocked upgrades",
  "Restricted admin",
  "No admin keys",
]);
const ALLOWED_ORACLES = new Set([
  "",
  "None",
  "Single provider",
  "Multiple providers",
  "Custom / internal",
]);

const rateBuckets = new Map<string, number[]>();

function text(value: unknown, max: number) {
  return typeof value === "string" && value.length <= max ? value.trim() : null;
}

function choice(value: unknown, allowed: Set<string>) {
  return typeof value === "string" && allowed.has(value) ? value : null;
}

function stringList(value: unknown, allowed: Set<string>, maxItems: number) {
  if (!Array.isArray(value) || value.length > maxItems) return null;
  const items = value.filter(
    (item): item is string => typeof item === "string",
  );
  if (items.length !== value.length || new Set(items).size !== items.length)
    return null;
  return items.every((item) => allowed.has(item)) ? items : null;
}

function isHttpUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isRateLimited(request: Request) {
  const forwarded =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for");
  const key = forwarded?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (rateBuckets.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );
  recent.push(now);
  rateBuckets.set(key, recent);
  return recent.length > RATE_LIMIT;
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
      { error: "Too many submissions. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Submission exceeds the permitted size." },
      { status: 413 },
    );
  }

  let parsed: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Submission exceeds the permitted size." },
        { status: 413 },
      );
    }
    parsed = JSON.parse(raw);
  } catch {
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

  // Hidden honeypot. Any supplied value indicates automated form completion.
  if (body.companySite !== undefined && body.companySite !== "") {
    return NextResponse.json(
      { error: "Submission could not be accepted." },
      { status: 400 },
    );
  }

  const protocol = text(body.protocol, 160);
  const website = text(body.website, 300);
  const category = choice(body.category, ALLOWED_CATEGORIES);
  const tvl = choice(body.tvl, ALLOWED_TVL);
  const chains = stringList(body.chains, ALLOWED_CHAINS, ALLOWED_CHAINS.size);
  const audits = choice(body.audits, ALLOWED_AUDITS);
  const governance = choice(body.governance, ALLOWED_GOVERNANCE);
  const admin = choice(body.admin, ALLOWED_ADMIN);
  const oracles = choice(body.oracles, ALLOWED_ORACLES);
  const interests = stringList(
    body.interests,
    ALLOWED_PROGRAMS,
    insurancePrograms.length,
  );
  const name = text(body.name, 120);
  const email = text(body.email, 254)?.toLowerCase() || null;
  const role = text(body.role, 120);
  const notes = text(body.notes, 2_000);

  if (!protocol || !category || !name || !email || !EMAIL.test(email)) {
    return NextResponse.json(
      {
        error:
          "Protocol, category, contact name and a valid work email are required.",
      },
      { status: 422 },
    );
  }

  if (
    website === null ||
    !isHttpUrl(website) ||
    tvl === null ||
    !chains ||
    audits === null ||
    governance === null ||
    admin === null ||
    oracles === null ||
    !interests ||
    role === null ||
    notes === null
  ) {
    return NextResponse.json(
      {
        error:
          "One or more submitted fields contain invalid or excessive values.",
      },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.RISK_ASSESSMENT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        error:
          "Online intake is temporarily unavailable. Please use the underwriting contact details below.",
      },
      { status: 503 },
    );
  }

  const reference = `MR-${new Date().getUTCFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const payload = {
    reference,
    receivedAt: new Date().toISOString(),
    protocol,
    website,
    category,
    tvl,
    chains,
    audits,
    governance,
    admin,
    oracles,
    interests,
    name,
    email,
    role,
    notes,
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.RISK_ASSESSMENT_WEBHOOK_TOKEN
          ? {
              Authorization: `Bearer ${process.env.RISK_ASSESSMENT_WEBHOOK_TOKEN}`,
            }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok)
      throw new Error(`Intake webhook returned ${upstream.status}`);
  } catch {
    return NextResponse.json(
      {
        error:
          "Underwriting intake is currently unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      reference,
      status: "received_for_preliminary_review",
      message: "Submission received for preliminary review only.",
    },
    { status: 202 },
  );
}
