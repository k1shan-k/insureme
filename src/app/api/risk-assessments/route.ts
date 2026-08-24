import { NextResponse } from "next/server";
import { insurancePrograms } from "@/lib/programs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_BODY_BYTES = 128_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;

const ALLOWED_KEYS = new Set([
  "submissionId",
  "protocol",
  "legalName",
  "website",
  "category",
  "jurisdiction",
  "protocolDescription",
  "tvl",
  "chains",
  "contractDetails",
  "audits",
  "auditDetails",
  "governance",
  "admin",
  "oracles",
  "dependencies",
  "securityControls",
  "incidentHistory",
  "incidentDetails",
  "interests",
  "coverageObjectives",
  "requestedLimit",
  "targetEffectiveDate",
  "policyPeriod",
  "name",
  "email",
  "role",
  "phone",
  "preferredContact",
  "notes",
  "authorityConfirmed",
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
  "< $10M",
  "$10M – $50M",
  "$50M – $250M",
  "$250M – $1B",
  "> $1B",
]);
const ALLOWED_AUDITS = new Set([
  "No formal audit",
  "1 audit",
  "2–3 audits",
  "4+ audits / continuous",
]);
const ALLOWED_GOVERNANCE = new Set([
  "Multisig",
  "Timelock + multisig",
  "On-chain DAO",
  "Foundation-controlled",
  "Immutable",
]);
const ALLOWED_ADMIN = new Set([
  "Upgradeable proxies",
  "Timelocked upgrades",
  "Restricted admin",
  "No admin keys",
]);
const ALLOWED_ORACLES = new Set([
  "None",
  "Single provider",
  "Multiple providers",
  "Custom / internal",
]);
const ALLOWED_INCIDENT_HISTORY = new Set([
  "No known incidents",
  "Past incidents — resolved",
  "Past incidents — remediation ongoing",
]);
const ALLOWED_REQUESTED_LIMITS = new Set([
  "< $1M",
  "$1M – $5M",
  "$5M – $25M",
  "$25M – $100M",
  "> $100M",
  "To be determined",
]);
const ALLOWED_POLICY_PERIODS = new Set([
  "6 months",
  "12 months",
  "Other / to be discussed",
]);
const ALLOWED_CONTACT_METHODS = new Set(["Email", "Telephone", "Video call"]);

const rateBuckets = new Map<string, number[]>();

function text(value: unknown, max: number) {
  return typeof value === "string" && value.length <= max ? value.trim() : null;
}

function optionalText(value: unknown, max: number) {
  return value === undefined ? "" : text(value, max);
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
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

function isRealIsoDate(value: string) {
  if (!ISO_DATE.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return (
    year >= 1 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= daysInMonth[month - 1]
  );
}

function isValidWebhookUrl(value: string) {
  try {
    const url = new URL(value);
    const allowedProtocol =
      process.env.NODE_ENV === "production"
        ? url.protocol === "https:"
        : url.protocol === "https:" || url.protocol === "http:";
    return (
      allowedProtocol && Boolean(url.hostname) && !url.username && !url.password
    );
  } catch {
    return false;
  }
}

function intakeUnavailable() {
  return NextResponse.json(
    {
      error:
        "Online intake is temporarily unavailable. Please try again later.",
    },
    { status: 503 },
  );
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

  const submissionId = text(body.submissionId, 36);
  const protocol = text(body.protocol, 160);
  const legalName = text(body.legalName, 160);
  const website = text(body.website, 300);
  const category = choice(body.category, ALLOWED_CATEGORIES);
  const jurisdiction = text(body.jurisdiction, 120);
  const protocolDescription = text(body.protocolDescription, 2_000);
  const tvl = choice(body.tvl, ALLOWED_TVL);
  const chains = stringList(body.chains, ALLOWED_CHAINS, ALLOWED_CHAINS.size);
  const contractDetails = text(body.contractDetails, 3_000);
  const audits = choice(body.audits, ALLOWED_AUDITS);
  const auditDetails = text(body.auditDetails, 2_000);
  const governance = choice(body.governance, ALLOWED_GOVERNANCE);
  const admin = choice(body.admin, ALLOWED_ADMIN);
  const oracles = choice(body.oracles, ALLOWED_ORACLES);
  const dependencies = text(body.dependencies, 2_000);
  const securityControls = text(body.securityControls, 3_000);
  const incidentHistory = choice(
    body.incidentHistory,
    ALLOWED_INCIDENT_HISTORY,
  );
  const incidentDetails = optionalText(body.incidentDetails, 2_000);
  const interests = stringList(
    body.interests,
    ALLOWED_PROGRAMS,
    insurancePrograms.length,
  );
  const coverageObjectives = text(body.coverageObjectives, 2_000);
  const requestedLimit = choice(body.requestedLimit, ALLOWED_REQUESTED_LIMITS);
  const targetEffectiveDate = text(body.targetEffectiveDate, 10);
  const policyPeriod = choice(body.policyPeriod, ALLOWED_POLICY_PERIODS);
  const name = text(body.name, 120);
  const email = text(body.email, 254)?.toLowerCase() || null;
  const role = text(body.role, 120);
  const phone = optionalText(body.phone, 40);
  const preferredContact = choice(
    body.preferredContact,
    ALLOWED_CONTACT_METHODS,
  );
  const notes = optionalText(body.notes, 2_000);
  const authorityConfirmed = body.authorityConfirmed;

  if (
    !submissionId ||
    !UUID.test(submissionId) ||
    !protocol ||
    !legalName ||
    !website ||
    !category ||
    !jurisdiction ||
    !protocolDescription ||
    !tvl ||
    !chains?.length ||
    !contractDetails ||
    !audits ||
    !auditDetails ||
    !governance ||
    !admin ||
    !oracles ||
    !dependencies ||
    !securityControls ||
    !incidentHistory ||
    !interests?.length ||
    !coverageObjectives ||
    !requestedLimit ||
    !targetEffectiveDate ||
    !policyPeriod ||
    !name ||
    !email ||
    !role ||
    !preferredContact ||
    authorityConfirmed !== true
  ) {
    return NextResponse.json(
      {
        error:
          "Complete every required field and confirm authority before submitting.",
      },
      { status: 422 },
    );
  }

  if (
    !isHttpUrl(website) ||
    !EMAIL.test(email) ||
    !isRealIsoDate(targetEffectiveDate) ||
    incidentDetails === null ||
    phone === null ||
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

  if (incidentHistory !== "No known incidents" && !incidentDetails.trim()) {
    return NextResponse.json(
      {
        error:
          "Incident details are required when a past incident is reported.",
      },
      { status: 422 },
    );
  }

  if (preferredContact === "Telephone" && !phone?.trim()) {
    return NextResponse.json(
      {
        error:
          "A telephone number is required when telephone is the preferred contact method.",
      },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.RISK_ASSESSMENT_WEBHOOK_URL;
  const webhookToken = process.env.RISK_ASSESSMENT_WEBHOOK_TOKEN;
  if (!webhookUrl || !isValidWebhookUrl(webhookUrl)) {
    console.error(
      "Risk assessment intake is unavailable: webhook configuration is missing or invalid.",
    );
    return intakeUnavailable();
  }
  if (process.env.NODE_ENV === "production" && !webhookToken) {
    console.error(
      "Risk assessment intake is unavailable: receiver authentication is not configured.",
    );
    return intakeUnavailable();
  }

  const reference = `MR-${new Date().getUTCFullYear()}-${submissionId.replaceAll("-", "").slice(0, 8).toUpperCase()}`;
  const payload = {
    submissionId,
    reference,
    receivedAt: new Date().toISOString(),
    reviewType: "manual",
    responseTargetHours: 24,
    protocol,
    legalName,
    website,
    category,
    jurisdiction,
    protocolDescription,
    tvl,
    chains,
    contractDetails,
    audits,
    auditDetails,
    governance,
    admin,
    oracles,
    dependencies,
    securityControls,
    incidentHistory,
    incidentDetails,
    interests,
    coverageObjectives,
    requestedLimit,
    targetEffectiveDate,
    policyPeriod,
    name,
    email,
    role,
    phone,
    preferredContact,
    notes,
    authorityConfirmed,
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": submissionId,
        "X-Assessment-Reference": reference,
        ...(webhookToken
          ? {
              Authorization: `Bearer ${webhookToken}`,
            }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
      redirect: "error",
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
      message:
        "Submission received for manual review. A human underwriter will review a complete submission and send the assessment and quotation within 24 hours. If more information is required, the submitter will receive a status update within that period. Any quotation is subject to underwriting and authorized transaction documents.",
    },
    { status: 202 },
  );
}
