"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button, ArrowRight } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { insurancePrograms } from "@/lib/programs";

type StepId = 0 | 1 | 2 | 3 | 4;

type FormState = {
  protocol: string;
  legalName: string;
  website: string;
  category: string;
  jurisdiction: string;
  protocolDescription: string;
  tvl: string;
  chains: string[];
  contractDetails: string;
  audits: string;
  auditDetails: string;
  governance: string;
  admin: string;
  oracles: string;
  dependencies: string;
  securityControls: string;
  incidentHistory: string;
  incidentDetails: string;
  interests: string[];
  coverageObjectives: string;
  requestedLimit: string;
  targetEffectiveDate: string;
  policyPeriod: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  preferredContact: string;
  notes: string;
  authorityConfirmed: boolean;
  companySite: string;
};

const stepMeta = [
  { label: "Organization" },
  { label: "Architecture & controls" },
  { label: "Coverage request" },
  { label: "Review details" },
  { label: "Contact & submit" },
];

const categories = [
  "Lending",
  "DEX / AMM",
  "Stablecoin",
  "Bridge",
  "Derivatives",
  "Staking / LST",
  "Infrastructure",
  "Other",
];
const tvlRanges = [
  "< $10M",
  "$10M – $50M",
  "$50M – $250M",
  "$250M – $1B",
  "> $1B",
];
const chains = [
  "Ethereum",
  "Arbitrum",
  "Optimism",
  "Base",
  "Polygon",
  "Solana",
  "Other",
];
const auditOptions = [
  "No formal audit",
  "1 audit",
  "2–3 audits",
  "4+ audits / continuous",
];
const governanceOptions = [
  "Multisig",
  "Timelock + multisig",
  "On-chain DAO",
  "Foundation-controlled",
  "Immutable",
];
const adminOptions = [
  "Upgradeable proxies",
  "Timelocked upgrades",
  "Restricted admin",
  "No admin keys",
];
const oracleOptions = [
  "None",
  "Single provider",
  "Multiple providers",
  "Custom / internal",
];
const incidentOptions = [
  "No known incidents",
  "Past incidents — resolved",
  "Past incidents — remediation ongoing",
];
const requestedLimitOptions = [
  "< $1M",
  "$1M – $5M",
  "$5M – $25M",
  "$25M – $100M",
  "> $100M",
  "To be determined",
];
const policyPeriodOptions = [
  "6 months",
  "12 months",
  "Other / to be discussed",
];
const preferredContactOptions = ["Email", "Telephone", "Video call"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm: FormState = {
  protocol: "",
  legalName: "",
  website: "",
  category: "",
  jurisdiction: "",
  protocolDescription: "",
  tvl: "",
  chains: [],
  contractDetails: "",
  audits: "",
  auditDetails: "",
  governance: "",
  admin: "",
  oracles: "",
  dependencies: "",
  securityControls: "",
  incidentHistory: "",
  incidentDetails: "",
  interests: [],
  coverageObjectives: "",
  requestedLimit: "",
  targetEffectiveDate: "",
  policyPeriod: "",
  name: "",
  email: "",
  role: "",
  phone: "",
  preferredContact: "",
  notes: "",
  authorityConfirmed: false,
  companySite: "",
};

class IntakeError extends Error {}

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

function stepValidationMessage(step: StepId, form: FormState) {
  if (step === 0) {
    if (
      !form.protocol.trim() ||
      !form.legalName.trim() ||
      !form.website.trim() ||
      !form.category ||
      !form.jurisdiction.trim() ||
      !form.protocolDescription.trim() ||
      !form.tvl ||
      form.chains.length === 0
    ) {
      return "Complete every required organization field and select at least one deployed network.";
    }
    if (!isHttpUrl(form.website.trim())) {
      return "Enter a complete website URL beginning with http:// or https://.";
    }
  }

  if (step === 1) {
    if (
      !form.contractDetails.trim() ||
      !form.audits ||
      !form.auditDetails.trim() ||
      !form.governance ||
      !form.admin ||
      !form.oracles ||
      !form.dependencies.trim() ||
      !form.securityControls.trim() ||
      !form.incidentHistory
    ) {
      return "Complete every required architecture, dependency, control and incident field.";
    }
    if (
      form.incidentHistory !== "No known incidents" &&
      !form.incidentDetails.trim()
    ) {
      return "Provide incident and remediation details for the selected incident history.";
    }
  }

  if (step === 2) {
    if (
      form.interests.length === 0 ||
      !form.coverageObjectives.trim() ||
      !form.requestedLimit ||
      !form.targetEffectiveDate ||
      !form.policyPeriod
    ) {
      return "Select at least one coverage area and complete every required coverage request field.";
    }
  }

  if (step === 4) {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.role.trim() ||
      !form.preferredContact ||
      !form.authorityConfirmed
    ) {
      return "Complete every required contact field and confirm your authority before submitting.";
    }
    if (!EMAIL.test(form.email.trim())) {
      return "Enter a valid email address.";
    }
    if (form.preferredContact === "Telephone" && !form.phone.trim()) {
      return "Enter a telephone number when telephone is the preferred contact method.";
    }
  }

  return "";
}

export function RiskAssessmentFlow() {
  const [step, setStep] = useState<StepId>(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [validationError, setValidationError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [submissionReference, setSubmissionReference] = useState("");
  const submissionIdRef = useRef<string | null>(null);

  const clearMessages = () => {
    setValidationError("");
    setSubmissionState("idle");
    setSubmissionError("");
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    clearMessages();
    submissionIdRef.current = null;
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggle = (key: "chains" | "interests", value: string) => {
    clearMessages();
    submissionIdRef.current = null;
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };

  const goToStep = (target: StepId) => {
    clearMessages();
    setStep(target);
  };

  const next = () => {
    const message = stepValidationMessage(step, form);
    if (message) {
      setValidationError(message);
      return;
    }
    setValidationError("");
    setStep((current) => Math.min(4, current + 1) as StepId);
  };

  const back = () => {
    clearMessages();
    setStep((current) => Math.max(0, current - 1) as StepId);
  };

  const submit = async () => {
    const message = stepValidationMessage(4, form);
    if (message) {
      setValidationError(message);
      return;
    }

    setValidationError("");
    setSubmissionError("");
    setSubmissionState("submitting");
    const submissionId =
      submissionIdRef.current ?? globalThis.crypto.randomUUID();
    submissionIdRef.current = submissionId;
    try {
      const response = await fetch("/api/risk-assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, submissionId }),
      });

      let result: { reference?: string; error?: string } = {};
      try {
        const responseText = await response.text();
        result = responseText
          ? (JSON.parse(responseText) as { reference?: string; error?: string })
          : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new IntakeError(
          result.error ||
            "Online intake is temporarily unavailable. Please try again.",
        );
      }
      if (!result.reference) {
        throw new IntakeError(
          "We could not confirm receipt of the submission. Please try again.",
        );
      }

      setSubmissionReference(result.reference);
      setSubmitted(true);
    } catch (error) {
      setSubmissionError(
        error instanceof IntakeError
          ? error.message
          : "Online intake is temporarily unavailable. Check your connection and try again.",
      );
      setSubmissionState("error");
    }
  };

  if (submitted) {
    return (
      <div className="border border-line bg-white p-10 text-center shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)] sm:p-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold text-gold">
          <IconCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-7 font-serif text-3xl font-light text-navy">
          Assessment request received for manual review
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-muted">
          The complete submission has been recorded under reference{" "}
          <span className="font-medium text-charcoal">
            {submissionReference}
          </span>
          . A human underwriter will review a complete submission and send the
          assessment and quotation within 24 hours. If more information is
          required, the submitter will receive a status update within that
          period.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-slate-faint">
          No automated score is produced. Any quotation is subject to
          underwriting and authorized transaction documents and does not bind
          insurance coverage.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="secondary">
            Return home
          </Button>
          <Button href="/legal/underwriting-methodology" variant="ghost">
            Review underwriting methodology →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-white shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)]">
      <ol className="flex overflow-x-auto border-b border-line">
        {stepMeta.map((item, index) => {
          const active = index === step;
          const done = index < step;
          return (
            <li
              key={item.label}
              className={`flex min-w-[160px] flex-1 items-center gap-3 border-r border-line px-4 py-4 last:border-r-0 ${
                active ? "bg-ivory-50" : ""
              }`}
              aria-current={active ? "step" : undefined}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center border text-[12px] ${
                  done
                    ? "border-gold bg-gold text-white"
                    : active
                      ? "border-navy text-navy"
                      : "border-line text-slate-faint"
                }`}
              >
                {done ? <IconCheck /> : String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-[12px] font-medium ${
                  active
                    ? "text-navy"
                    : done
                      ? "text-charcoal/70"
                      : "text-slate-faint"
                }`}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="p-7 sm:p-10">
        {step === 0 && (
          <StepShell
            eyebrow="Step one"
            title="Organization"
            intro="Provide the legal, operating and deployment context a human underwriter needs to identify the organization and understand the protocol."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Protocol or trading name" required>
                <input
                  type="text"
                  name="protocol"
                  autoComplete="organization"
                  maxLength={160}
                  className={inputCls}
                  value={form.protocol}
                  onChange={(event) => set("protocol", event.target.value)}
                  placeholder="Public protocol or organization name"
                />
              </Field>
              <Field label="Full legal name" required>
                <input
                  type="text"
                  name="legalName"
                  autoComplete="organization"
                  maxLength={160}
                  className={inputCls}
                  value={form.legalName}
                  onChange={(event) => set("legalName", event.target.value)}
                  placeholder="Entity requesting the assessment"
                />
              </Field>
              <Field
                label="Public website"
                required
                guidance="Use a public HTTP or HTTPS URL without credentials, access tokens, or other secrets."
              >
                <input
                  type="url"
                  name="website"
                  autoComplete="url"
                  maxLength={300}
                  className={inputCls}
                  value={form.website}
                  onChange={(event) => set("website", event.target.value)}
                  placeholder="https://example.org"
                />
              </Field>
              <Field label="Protocol category" required>
                <select
                  name="category"
                  className={inputCls}
                  value={form.category}
                  onChange={(event) => set("category", event.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Legal jurisdiction" required>
                <input
                  type="text"
                  name="jurisdiction"
                  maxLength={120}
                  className={inputCls}
                  value={form.jurisdiction}
                  onChange={(event) => set("jurisdiction", event.target.value)}
                  placeholder="Country and state, territory or equivalent"
                />
              </Field>
              <Field label="Total value locked (approx.)" required>
                <select
                  name="tvl"
                  className={inputCls}
                  value={form.tvl}
                  onChange={(event) => set("tvl", event.target.value)}
                >
                  <option value="">Select range</option>
                  {tvlRanges.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="Protocol description"
                required
                className="sm:col-span-2"
                guidance="Describe the products, users, assets, transaction flows and current operating stage."
              >
                <textarea
                  name="protocolDescription"
                  rows={5}
                  maxLength={2_000}
                  className={textareaCls}
                  value={form.protocolDescription}
                  onChange={(event) =>
                    set("protocolDescription", event.target.value)
                  }
                  placeholder="Explain what the protocol does and how value moves through it."
                />
              </Field>
            </div>

            <Field
              label="Deployed networks"
              required
              className="mt-6"
              guidance="Select every network relevant to the requested assessment."
            >
              <div className="flex flex-wrap gap-2">
                {chains.map((chain) => (
                  <Chip
                    key={chain}
                    active={form.chains.includes(chain)}
                    onClick={() => toggle("chains", chain)}
                  >
                    {chain}
                  </Chip>
                ))}
              </div>
            </Field>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell
            eyebrow="Step two"
            title="Architecture & controls"
            intro="Document the deployed architecture, independent review, control model, external dependencies and incident readiness for manual underwriting review."
          >
            <SensitiveDataWarning />
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <Field
                label="Contracts and deployment details"
                required
                className="sm:col-span-2"
                guidance="List public deployed contract addresses, networks, implementation or proxy relationships, and the upgrade pattern."
              >
                <textarea
                  name="contractDetails"
                  rows={6}
                  maxLength={3_000}
                  className={textareaCls}
                  value={form.contractDetails}
                  onChange={(event) =>
                    set("contractDetails", event.target.value)
                  }
                  placeholder="Public contract addresses, networks and upgrade architecture"
                />
              </Field>
              <Field label="Audit history" required>
                <select
                  name="audits"
                  className={inputCls}
                  value={form.audits}
                  onChange={(event) => set("audits", event.target.value)}
                >
                  <option value="">Select audit history</option>
                  {auditOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Governance model" required>
                <select
                  name="governance"
                  className={inputCls}
                  value={form.governance}
                  onChange={(event) => set("governance", event.target.value)}
                >
                  <option value="">Select governance model</option>
                  {governanceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="Audit details"
                required
                className="sm:col-span-2"
                guidance="Provide firms, dates, public report URLs and remediation status. If there has been no formal audit, explain the review performed instead."
              >
                <textarea
                  name="auditDetails"
                  rows={5}
                  maxLength={2_000}
                  className={textareaCls}
                  value={form.auditDetails}
                  onChange={(event) => set("auditDetails", event.target.value)}
                  placeholder="Audit firms, dates, public reports and remediation"
                />
              </Field>
              <Field label="Admin / upgrade privileges" required>
                <select
                  name="admin"
                  className={inputCls}
                  value={form.admin}
                  onChange={(event) => set("admin", event.target.value)}
                >
                  <option value="">Select privilege model</option>
                  {adminOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label="Oracle dependencies" required>
                <select
                  name="oracles"
                  className={inputCls}
                  value={form.oracles}
                  onChange={(event) => set("oracles", event.target.value)}
                >
                  <option value="">Select oracle model</option>
                  {oracleOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="External dependencies"
                required
                className="sm:col-span-2"
                guidance="Describe bridges, custody, sequencers, cloud and service dependencies. Enter “None” if there are none."
              >
                <textarea
                  name="dependencies"
                  rows={5}
                  maxLength={2_000}
                  className={textareaCls}
                  value={form.dependencies}
                  onChange={(event) => set("dependencies", event.target.value)}
                  placeholder="Critical technical, operational and counterparty dependencies"
                />
              </Field>
              <Field
                label="Security and operational controls"
                required
                className="sm:col-span-2"
                guidance="Describe monitoring, pause or emergency controls, incident response, and access-control procedures."
              >
                <textarea
                  name="securityControls"
                  rows={6}
                  maxLength={3_000}
                  className={textareaCls}
                  value={form.securityControls}
                  onChange={(event) =>
                    set("securityControls", event.target.value)
                  }
                  placeholder="Monitoring, emergency procedures, response ownership and access controls"
                />
              </Field>
              <Field label="Incident history" required>
                <select
                  name="incidentHistory"
                  className={inputCls}
                  value={form.incidentHistory}
                  onChange={(event) =>
                    set("incidentHistory", event.target.value)
                  }
                >
                  <option value="">Select incident history</option>
                  {incidentOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="Incident details"
                required={
                  Boolean(form.incidentHistory) &&
                  form.incidentHistory !== "No known incidents"
                }
                guidance="For past incidents, describe dates, losses, causes, remediation and current status."
              >
                <textarea
                  name="incidentDetails"
                  rows={5}
                  maxLength={2_000}
                  className={textareaCls}
                  value={form.incidentDetails}
                  onChange={(event) =>
                    set("incidentDetails", event.target.value)
                  }
                  placeholder="Complete if an incident has occurred"
                />
              </Field>
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            eyebrow="Step three"
            title="Coverage request"
            intro="Identify the coverage areas, loss scenarios and proposed timing the underwriter should consider. Selections do not create coverage or bind terms."
          >
            <Field
              label="Coverage interests"
              required
              guidance="Select every program area relevant to the requested review."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {insurancePrograms.map((program) => {
                  const active = form.interests.includes(program.slug);
                  return (
                    <button
                      type="button"
                      key={program.slug}
                      onClick={() => toggle("interests", program.slug)}
                      className={`flex items-center justify-between border px-5 py-4 text-left transition-colors ${
                        active
                          ? "border-navy bg-navy/[0.03]"
                          : "border-line hover:border-navy/40"
                      }`}
                    >
                      <span className="text-[14.5px] text-charcoal">
                        {program.title}
                      </span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center border ${
                          active
                            ? "border-gold bg-gold text-white"
                            : "border-line text-transparent"
                        }`}
                      >
                        <IconCheck />
                      </span>
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field
                label="Coverage objectives"
                required
                className="sm:col-span-2"
                guidance="Describe the loss scenarios, assets, contracts and legal entities requested for consideration."
              >
                <textarea
                  name="coverageObjectives"
                  rows={6}
                  maxLength={2_000}
                  className={textareaCls}
                  value={form.coverageObjectives}
                  onChange={(event) =>
                    set("coverageObjectives", event.target.value)
                  }
                  placeholder="Requested risk boundary and loss scenarios"
                />
              </Field>
              <Field label="Requested limit" required>
                <select
                  name="requestedLimit"
                  className={inputCls}
                  value={form.requestedLimit}
                  onChange={(event) =>
                    set("requestedLimit", event.target.value)
                  }
                >
                  <option value="">Select requested limit</option>
                  {requestedLimitOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="Target effective date"
                required
                guidance="Enter the requested date. Timing remains subject to underwriting and authorized documents."
              >
                <input
                  type="date"
                  name="targetEffectiveDate"
                  className={inputCls}
                  value={form.targetEffectiveDate}
                  onChange={(event) =>
                    set("targetEffectiveDate", event.target.value)
                  }
                />
              </Field>
              <Field label="Policy period" required>
                <select
                  name="policyPeriod"
                  className={inputCls}
                  value={form.policyPeriod}
                  onChange={(event) => set("policyPeriod", event.target.value)}
                >
                  <option value="">Select proposed period</option>
                  {policyPeriodOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-slate-faint">
              Transaction documents control insurance coverage, including any
              limits, retentions, exclusions, conditions and effective date.
            </p>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            eyebrow="Step four"
            title="Review details"
            intro="Review the complete organization, architecture and coverage request before adding the authorized contact. A human underwriter will assess the submission; no automated score is produced."
          >
            <div className="border border-gold/30 bg-gold/[0.05] p-5 text-[13.5px] leading-relaxed text-charcoal">
              A human underwriter will review a complete submission and send the
              assessment and quotation within 24 hours. If more information is
              required, the submitter will receive a status update within that
              period. Any quotation remains subject to underwriting and
              authorized transaction documents.
            </div>
            <div className="mt-7 space-y-6">
              <SummarySection
                title="Organization"
                onEdit={() => goToStep(0)}
                items={[
                  ["Protocol or trading name", form.protocol],
                  ["Full legal name", form.legalName],
                  ["Public website", form.website],
                  ["Category", form.category],
                  ["Jurisdiction", form.jurisdiction],
                  ["Protocol description", form.protocolDescription],
                  ["Total value locked", form.tvl],
                  ["Deployed networks", form.chains.join(", ")],
                ]}
              />
              <SummarySection
                title="Architecture & controls"
                onEdit={() => goToStep(1)}
                items={[
                  ["Contracts and deployments", form.contractDetails],
                  ["Audit history", form.audits],
                  ["Audit details", form.auditDetails],
                  ["Governance model", form.governance],
                  ["Admin / upgrade privileges", form.admin],
                  ["Oracle dependencies", form.oracles],
                  ["External dependencies", form.dependencies],
                  ["Security and operational controls", form.securityControls],
                  ["Incident history", form.incidentHistory],
                  [
                    "Incident details",
                    form.incidentDetails || "Not applicable",
                  ],
                ]}
              />
              <SummarySection
                title="Coverage request"
                onEdit={() => goToStep(2)}
                items={[
                  [
                    "Coverage interests",
                    insurancePrograms
                      .filter((program) =>
                        form.interests.includes(program.slug),
                      )
                      .map((program) => program.title)
                      .join(", "),
                  ],
                  ["Coverage objectives", form.coverageObjectives],
                  ["Requested limit", form.requestedLimit],
                  ["Target effective date", form.targetEffectiveDate],
                  ["Policy period", form.policyPeriod],
                ]}
              />
            </div>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell
            eyebrow="Step five"
            title="Contact & submit"
            intro="Provide an authorized contact for the manual underwriting review and confirm the submission."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" required>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  className={inputCls}
                  value={form.name}
                  onChange={(event) => set("name", event.target.value)}
                  placeholder="Authorized contact name"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  className={inputCls}
                  value={form.email}
                  onChange={(event) => set("email", event.target.value)}
                  placeholder="name@example.org"
                />
              </Field>
              <Field label="Role" required>
                <input
                  type="text"
                  name="role"
                  autoComplete="organization-title"
                  maxLength={120}
                  className={inputCls}
                  value={form.role}
                  onChange={(event) => set("role", event.target.value)}
                  placeholder="Position or function"
                />
              </Field>
              <Field
                label="Telephone"
                required={form.preferredContact === "Telephone"}
              >
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  maxLength={40}
                  className={inputCls}
                  value={form.phone}
                  onChange={(event) => set("phone", event.target.value)}
                  placeholder="Optional"
                />
              </Field>
              <Field label="Preferred contact method" required>
                <select
                  name="preferredContact"
                  className={inputCls}
                  value={form.preferredContact}
                  onChange={(event) =>
                    set("preferredContact", event.target.value)
                  }
                >
                  <option value="">Select contact method</option>
                  {preferredContactOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field
                label="Additional notes"
                className="sm:col-span-2"
                guidance="Add timing, coordination or underwriting context not covered above."
              >
                <textarea
                  name="notes"
                  rows={5}
                  maxLength={2_000}
                  className={textareaCls}
                  value={form.notes}
                  onChange={(event) => set("notes", event.target.value)}
                  placeholder="Optional additional context"
                />
              </Field>
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company-site">Company site</label>
                <input
                  id="company-site"
                  name="companySite"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.companySite}
                  onChange={(event) => set("companySite", event.target.value)}
                />
              </div>
            </div>

            <SensitiveDataWarning className="mt-7" />

            <label className="mt-7 flex cursor-pointer items-start gap-3 border border-line bg-ivory-50 p-5">
              <input
                type="checkbox"
                name="authorityConfirmed"
                checked={form.authorityConfirmed}
                onChange={(event) =>
                  set("authorityConfirmed", event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-navy"
              />
              <span className="text-[13.5px] leading-relaxed text-charcoal">
                I confirm that I am authorized to submit this request and that
                the information is accurate to the best of my knowledge.
                <span className="text-gold"> *</span>
              </span>
            </label>

            <p className="mt-6 text-[13px] leading-relaxed text-slate-faint">
              By submitting, you consent to contact about this manual
              underwriting review. See the{" "}
              <Link
                href="/legal/privacy"
                className="underline decoration-line underline-offset-2 hover:text-navy"
              >
                Privacy policy
              </Link>
              . A human underwriter will review a complete submission and send
              the assessment and quotation within 24 hours. If more information
              is required, the submitter will receive a status update within
              that period. No automated score is produced. Any quotation is
              subject to underwriting and authorized transaction documents and
              does not bind insurance coverage.
            </p>
          </StepShell>
        )}

        {validationError && (
          <div
            role="alert"
            className="mt-8 border border-[#B5623A]/40 bg-[#B5623A]/[0.05] px-5 py-4 text-[13.5px] text-[#8F4529]"
          >
            {validationError}
          </div>
        )}

        {submissionState === "error" && (
          <div
            role="alert"
            className="mt-8 border border-[#B5623A]/40 bg-[#B5623A]/[0.05] px-5 py-4 text-[13.5px] text-[#8F4529]"
          >
            {submissionError}
          </div>
        )}

        <div className="mt-10 flex items-center justify-between border-t border-line pt-7">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="text-[13.5px] font-medium text-slate-muted transition-colors hover:text-navy disabled:opacity-0"
          >
            ← Back
          </button>

          {step < 4 ? (
            <Button variant="primary" onClick={next} className="group">
              {step === 0
                ? "Architecture & controls"
                : step === 1
                  ? "Coverage request"
                  : step === 2
                    ? "Review details"
                    : "Contact & submit"}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button
              variant="gold"
              onClick={submit}
              disabled={submissionState === "submitting"}
              className="group"
            >
              {submissionState === "submitting"
                ? "Submitting…"
                : "Submit for manual review"}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full border border-line bg-ivory-50 px-4 py-3 text-[14.5px] text-charcoal outline-none transition-colors placeholder:text-slate-faint focus:border-navy focus:bg-white";
const textareaCls = `${inputCls} resize-y`;

function StepShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-[11px] font-medium uppercase tracking-label text-gold">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-serif text-3xl font-light text-navy">{title}</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-muted">
        {intro}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  guidance,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  guidance?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.1em] text-slate-muted">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {guidance && (
        <span className="mb-2 block text-[12.5px] leading-relaxed text-slate-faint">
          {guidance}
        </span>
      )}
      {children}
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-2 text-[13px] transition-colors ${
        active
          ? "border-navy bg-navy text-ivory"
          : "border-line text-charcoal hover:border-navy/40"
      }`}
    >
      {children}
    </button>
  );
}

function SensitiveDataWarning({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border border-[#B5623A]/30 bg-[#B5623A]/[0.04] p-5 text-[13px] leading-relaxed text-charcoal ${className}`}
    >
      Provide public details only. Do not submit passwords, private keys, seed
      phrases, signing requests, privileged credentials, or confidential
      vulnerability or exploit material. This form does not accept file uploads.
    </div>
  );
}

function SummarySection({
  title,
  items,
  onEdit,
}: {
  title: string;
  items: [string, string][];
  onEdit: () => void;
}) {
  return (
    <section className="border border-line">
      <div className="flex items-center justify-between border-b border-line bg-ivory-50 px-5 py-4">
        <h3 className="font-serif text-xl text-navy">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-[12px] font-medium uppercase tracking-[0.08em] text-navy underline decoration-line underline-offset-4 hover:text-gold"
        >
          Edit
        </button>
      </div>
      <dl className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[10.5px] font-medium uppercase tracking-[0.1em] text-slate-faint">
              {label}
            </dt>
            <dd className="mt-1 whitespace-pre-wrap break-words text-[13.5px] leading-relaxed text-charcoal">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
