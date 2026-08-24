"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, ArrowRight } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { insurancePrograms } from "@/lib/programs";

type StepId = 0 | 1 | 2 | 3;

const stepMeta = [
  { label: "Protocol information" },
  { label: "Information review" },
  { label: "Coverage interests" },
  { label: "Contact information" },
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

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class IntakeError extends Error {}

export function RiskAssessmentFlow() {
  const [step, setStep] = useState<StepId>(0);
  const [form, setForm] = useState({
    protocol: "",
    website: "",
    category: "",
    tvl: "",
    chains: [] as string[],
    audits: "",
    governance: "",
    admin: "",
    oracles: "",
    interests: [] as string[],
    name: "",
    email: "",
    role: "",
    notes: "",
    companySite: "",
  });

  const set = (k: keyof typeof form, v: string) => {
    setSubmissionState("idle");
    setSubmissionError("");
    setForm((current) => ({ ...current, [k]: v }));
  };
  const toggle = (k: "chains" | "interests", v: string) => {
    setSubmissionState("idle");
    setSubmissionError("");
    setForm((current) => ({
      ...current,
      [k]: current[k].includes(v)
        ? current[k].filter((item) => item !== v)
        : [...current[k], v],
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [submissionReference, setSubmissionReference] = useState("");
  const next = () => setStep((s) => Math.min(3, s + 1) as StepId);
  const back = () => setStep((s) => Math.max(0, s - 1) as StepId);
  const submit = async () => {
    setSubmissionError("");
    setSubmissionState("submitting");
    try {
      const response = await fetch("/api/risk-assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          Assessment request received
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-muted">
          The submitted information has been recorded under reference{" "}
          <span className="font-medium text-charcoal">
            {submissionReference}
          </span>
          . Receipt confirms intake for preliminary underwriting review only. It
          does not indicate eligibility, determine insurance coverage, or
          constitute an offer or binding commitment.
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

  const canContinue =
    step === 0
      ? form.protocol.trim() !== "" && form.category !== ""
      : step === 3
        ? form.name.trim() !== "" && EMAIL.test(form.email.trim())
        : true;

  return (
    <div className="border border-line bg-white shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)]">
      {/* Progress */}
      <ol className="grid grid-cols-2 border-b border-line md:grid-cols-4">
        {stepMeta.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li
              key={s.label}
              className={`flex items-center gap-3 border-line px-5 py-4 md:border-r md:last:border-r-0 ${
                i < 2 ? "border-b md:border-b-0" : ""
              } ${active ? "bg-ivory-50" : ""}`}
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
                {done ? <IconCheck /> : String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-[12.5px] font-medium ${
                  active
                    ? "text-navy"
                    : done
                      ? "text-charcoal/70"
                      : "text-slate-faint"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="p-7 sm:p-10">
        {step === 0 && (
          <StepShell
            eyebrow="Step one"
            title="Provide protocol information"
            intro="Provide information about the digital-asset protocol or infrastructure. Submission begins a preliminary underwriting review; it is not an application for insurance coverage."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Protocol or organization name" required>
                <input
                  type="text"
                  name="protocol"
                  autoComplete="organization"
                  maxLength={160}
                  className={inputCls}
                  value={form.protocol}
                  onChange={(e) => set("protocol", e.target.value)}
                  placeholder="Enter the protocol or organization name"
                />
              </Field>
              <Field label="Website">
                <input
                  type="url"
                  name="website"
                  autoComplete="url"
                  maxLength={300}
                  className={inputCls}
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="https://"
                />
              </Field>
              <Field label="Protocol category" required>
                <select
                  className={inputCls}
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  <option value="">Select category</option>
                  {[
                    "Lending",
                    "DEX / AMM",
                    "Stablecoin",
                    "Bridge",
                    "Derivatives",
                    "Staking / LST",
                    "Infrastructure",
                    "Other",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Total value locked (approx.)">
                <select
                  className={inputCls}
                  value={form.tvl}
                  onChange={(e) => set("tvl", e.target.value)}
                >
                  <option value="">Select range</option>
                  {[
                    "< $10M",
                    "$10M – $50M",
                    "$50M – $250M",
                    "$250M – $1B",
                    "> $1B",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Deployed networks" className="mt-6">
              <div className="flex flex-wrap gap-2">
                {chains.map((c) => (
                  <Chip
                    key={c}
                    active={form.chains.includes(c)}
                    onClick={() => toggle("chains", c)}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </Field>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="Audit history">
                <select
                  className={inputCls}
                  value={form.audits}
                  onChange={(e) => set("audits", e.target.value)}
                >
                  <option value="">Select</option>
                  {[
                    "No formal audit",
                    "1 audit",
                    "2–3 audits",
                    "4+ audits / continuous",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Governance model">
                <select
                  className={inputCls}
                  value={form.governance}
                  onChange={(e) => set("governance", e.target.value)}
                >
                  <option value="">Select</option>
                  {[
                    "Multisig",
                    "Timelock + multisig",
                    "On-chain DAO",
                    "Foundation-controlled",
                    "Immutable",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Admin / upgrade privileges">
                <select
                  className={inputCls}
                  value={form.admin}
                  onChange={(e) => set("admin", e.target.value)}
                >
                  <option value="">Select</option>
                  {[
                    "Upgradeable proxies",
                    "Timelocked upgrades",
                    "Restricted admin",
                    "No admin keys",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Oracle dependencies">
                <select
                  className={inputCls}
                  value={form.oracles}
                  onChange={(e) => set("oracles", e.target.value)}
                >
                  <option value="">Select</option>
                  {[
                    "None",
                    "Single provider",
                    "Multiple providers",
                    "Custom / internal",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell
            eyebrow="Step two"
            title="Information review"
            intro="The information has not yet been reviewed by an underwriter. This step confirms the status of the request before coverage interests and contact information are submitted."
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { k: "Assessment status", v: "Not yet reviewed" },
                { k: "Next step", v: "Underwriter review" },
                { k: "Coverage status", v: "Not determined" },
              ].map((status) => (
                <div
                  key={status.k}
                  className="border border-line bg-ivory-50 p-5"
                >
                  <div className="text-[11px] uppercase tracking-[0.1em] text-slate-faint">
                    {status.k}
                  </div>
                  <div className="mt-2 font-serif text-lg text-navy">
                    {status.v}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-slate-muted">
              No score, eligibility decision, insurance coverage determination,
              or terms have been produced. Any assessment depends on the
              information and evidence considered during preliminary
              underwriting review.
            </p>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            eyebrow="Step three"
            title="Insurance coverage interests"
            intro="Select relevant areas of potential insurance coverage for digital-asset protocols and infrastructure. Availability and terms can be determined only through underwriting and issued transaction documents."
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
            <p className="mt-6 text-[13px] leading-relaxed text-slate-faint">
              Selection records an area of interest only. Transaction documents
              control insurance coverage, including any limits, retentions,
              exclusions, and conditions.
            </p>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            eyebrow="Step four"
            title="Provide contact information"
            intro="Provide an authorized point of contact for the preliminary underwriting review."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" required>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  maxLength={120}
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Enter the authorized contact name"
                />
              </Field>
              <Field label="Work email" required>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="Enter a work email address"
                />
              </Field>
              <Field label="Role" className="sm:col-span-2">
                <input
                  type="text"
                  name="role"
                  autoComplete="organization-title"
                  maxLength={120}
                  className={inputCls}
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  placeholder="Position or function"
                />
              </Field>
              <Field
                label="Anything else we should know?"
                className="sm:col-span-2"
              >
                <textarea
                  name="notes"
                  rows={4}
                  maxLength={2_000}
                  className={`${inputCls} resize-none`}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Provide relevant architecture, timing, or risk context. Do not include credentials or confidential security material."
                />
              </Field>
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company-site">Company site</label>
                <input
                  id="company-site"
                  name="company-site"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.companySite}
                  onChange={(event) => set("companySite", event.target.value)}
                />
              </div>
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-slate-faint">
              By submitting, you consent to contact about this preliminary
              underwriting review. See the{" "}
              <Link
                href="/legal/privacy"
                className="underline decoration-line underline-offset-2 hover:text-navy"
              >
                Privacy policy
              </Link>
              . Submission does not produce insurance coverage or bind any
              terms.
            </p>
          </StepShell>
        )}

        {submissionState === "error" && (
          <div
            role="alert"
            className="mt-8 border border-[#B5623A]/40 bg-[#B5623A]/[0.05] px-5 py-4 text-[13.5px] text-[#8F4529]"
          >
            {submissionError}
          </div>
        )}

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between border-t border-line pt-7">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="text-[13.5px] font-medium text-slate-muted transition-colors hover:text-navy disabled:opacity-0"
          >
            ← Back
          </button>

          {step < 3 ? (
            <Button
              variant="primary"
              onClick={next}
              disabled={!canContinue}
              className="group"
            >
              {step === 0
                ? "Review information"
                : step === 1
                  ? "Select coverage interests"
                  : "Continue"}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button
              variant="gold"
              onClick={submit}
              disabled={!canContinue || submissionState === "submitting"}
              className="group"
            >
              {submissionState === "submitting"
                ? "Submitting…"
                : "Submit for review"}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- helpers --- */

const inputCls =
  "w-full border border-line bg-ivory-50 px-4 py-3 text-[14.5px] text-charcoal outline-none transition-colors placeholder:text-slate-faint focus:border-navy focus:bg-white";

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
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-muted">
        {intro}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[12px] font-medium uppercase tracking-[0.1em] text-slate-muted">
        {label} {required && <span className="text-gold">*</span>}
      </span>
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
