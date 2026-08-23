"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, ArrowRight } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { RiskBar } from "@/components/charts/RiskBar";
import { RiskGauge } from "@/components/charts/RiskGauge";

type StepId = 0 | 1 | 2 | 3;

const stepMeta = [
  { label: "Protocol Information" },
  { label: "Risk Review" },
  { label: "Coverage Options" },
  { label: "Contact Underwriting" },
];

const coverageInterests = [
  "Smart Contract Cover",
  "Protocol Exploit Cover",
  "Cross-Chain & Bridge Cover",
  "Stablecoin & Depeg Cover",
  "Treasury & Digital Asset Cover",
  "Custom Protocol Cover",
];

const chains = ["Ethereum", "Arbitrum", "Optimism", "Base", "Polygon", "Solana", "Other"];

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
    incidents: "",
    interests: [] as string[],
    name: "",
    email: "",
    role: "",
    notes: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k: "chains" | "interests", v: string) =>
    setForm((f) => ({
      ...f,
      [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
    }));

  const [submitted, setSubmitted] = useState(false);
  const next = () => setStep((s) => Math.min(3, s + 1) as StepId);
  const back = () => setStep((s) => Math.max(0, s - 1) as StepId);
  const submit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="border border-line bg-white p-10 text-center shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)] sm:p-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold text-gold">
          <IconCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-7 font-serif text-3xl font-light text-navy">
          Your assessment request has been received.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-muted">
          Thank you, {form.name || "there"}. Our underwriting team will review the information for{" "}
          <span className="text-charcoal">{form.protocol || "your protocol"}</span> and follow up at{" "}
          <span className="text-charcoal">{form.email || "your email"}</span>. This acknowledgement
          does not constitute an offer of, or binding commitment to provide, insurance.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="secondary">
            Return Home
          </Button>
          <Button href="/legal/claims-procedure" variant="ghost">
            Read the Claims Process →
          </Button>
        </div>
      </div>
    );
  }

  const canContinue =
    step === 0
      ? form.protocol.trim() !== "" && form.category !== ""
      : step === 3
        ? form.name.trim() !== "" && form.email.trim() !== ""
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
                  active ? "text-navy" : done ? "text-charcoal/70" : "text-slate-faint"
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
            title="Tell us about your protocol"
            intro="Share the essentials of your architecture. This information initiates a preliminary risk review — it is not an application for insurance."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Protocol / Organization name" required>
                <input
                  className={inputCls}
                  value={form.protocol}
                  onChange={(e) => set("protocol", e.target.value)}
                  placeholder="e.g. Aperture Finance"
                />
              </Field>
              <Field label="Website">
                <input
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
                  {["Lending", "DEX / AMM", "Stablecoin", "Bridge", "Derivatives", "Staking / LST", "Infrastructure", "Other"].map(
                    (o) => (
                      <option key={o}>{o}</option>
                    )
                  )}
                </select>
              </Field>
              <Field label="Total value locked (approx.)">
                <select className={inputCls} value={form.tvl} onChange={(e) => set("tvl", e.target.value)}>
                  <option value="">Select range</option>
                  {["< $10M", "$10M – $50M", "$50M – $250M", "$250M – $1B", "> $1B"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Deployed networks" className="mt-6">
              <div className="flex flex-wrap gap-2">
                {chains.map((c) => (
                  <Chip key={c} active={form.chains.includes(c)} onClick={() => toggle("chains", c)}>
                    {c}
                  </Chip>
                ))}
              </div>
            </Field>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="Audit history">
                <select className={inputCls} value={form.audits} onChange={(e) => set("audits", e.target.value)}>
                  <option value="">Select</option>
                  {["No formal audit", "1 audit", "2–3 audits", "4+ audits / continuous"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Governance model">
                <select className={inputCls} value={form.governance} onChange={(e) => set("governance", e.target.value)}>
                  <option value="">Select</option>
                  {["Multisig", "Timelock + multisig", "On-chain DAO", "Foundation-controlled", "Immutable"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Admin / upgrade privileges">
                <select className={inputCls} value={form.admin} onChange={(e) => set("admin", e.target.value)}>
                  <option value="">Select</option>
                  {["Upgradeable proxies", "Timelocked upgrades", "Restricted admin", "No admin keys"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Oracle dependencies">
                <select className={inputCls} value={form.oracles} onChange={(e) => set("oracles", e.target.value)}>
                  <option value="">Select</option>
                  {["None", "Single provider", "Multiple providers", "Custom / internal"].map((o) => (
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
            title="Preliminary risk review"
            intro="Based on the information provided, our framework generates an indicative risk profile. This is illustrative and does not constitute an underwriting decision or offer of coverage."
          >
            <div className="grid gap-8 border border-line bg-ivory-50 p-7 sm:grid-cols-2 sm:p-9">
              <div className="flex flex-col items-center justify-center border-b border-line pb-8 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
                <span className="mb-4 text-[11px] uppercase tracking-label text-slate-faint">
                  Indicative Overall Risk
                </span>
                <RiskGauge score={72} label="Moderate" />
                <p className="mt-5 text-center text-[12px] text-slate-faint">
                  Composite of the factors below
                </p>
              </div>
              <div className="flex flex-col justify-center gap-5">
                <RiskBar label="Smart Contract" value={78} />
                <RiskBar label="Governance" value={form.governance.includes("Immutable") ? 88 : 69} />
                <RiskBar label="Oracle Dependency" value={74} />
                <RiskBar label="Liquidity" value={81} />
                <RiskBar label="Operational Controls" value={76} />
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Eligibility", v: "Preliminary: Eligible" },
                { k: "Suggested Review", v: "Standard underwriting" },
                { k: "Data Confidence", v: "Indicative" },
              ].map((s) => (
                <div key={s.k} className="border border-line p-4">
                  <div className="text-[11px] uppercase tracking-[0.1em] text-slate-faint">{s.k}</div>
                  <div className="mt-1.5 font-serif text-[15px] text-navy">{s.v}</div>
                </div>
              ))}
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            eyebrow="Step three"
            title="Coverage of interest"
            intro="Select the coverage lines relevant to your protocol. Availability, limits, deductibles and conditions are determined through underwriting and set out in policy documentation."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {coverageInterests.map((c) => {
                const active = form.interests.includes(c);
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => toggle("interests", c)}
                    className={`flex items-center justify-between border px-5 py-4 text-left transition-colors ${
                      active
                        ? "border-navy bg-navy/[0.03]"
                        : "border-line hover:border-navy/40"
                    }`}
                  >
                    <span className="text-[14.5px] text-charcoal">{c}</span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center border ${
                        active ? "border-gold bg-gold text-white" : "border-line text-transparent"
                      }`}
                    >
                      <IconCheck />
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-slate-faint">
              Coverage is subject to underwriting, applicable policy terms, limits, deductibles,
              exclusions and conditions. Selection here indicates interest only.
            </p>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            eyebrow="Step four"
            title="Connect with underwriting"
            intro="Provide a point of contact and our underwriting team will follow up to continue the assessment."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" required>
                <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
              </Field>
              <Field label="Work email" required>
                <input
                  type="email"
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="jane@protocol.xyz"
                />
              </Field>
              <Field label="Role" className="sm:col-span-2">
                <input className={inputCls} value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Head of Treasury, Security Lead" />
              </Field>
              <Field label="Anything else we should know?" className="sm:col-span-2">
                <textarea
                  rows={4}
                  className={`${inputCls} resize-none`}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Context on your architecture, timelines or specific risks."
                />
              </Field>
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-slate-faint">
              By submitting, you consent to being contacted regarding your risk assessment. See our{" "}
              <Link href="/legal/privacy" className="underline decoration-line underline-offset-2 hover:text-navy">
                Privacy Policy
              </Link>
              . This submission is not an application for, or a binding offer of, insurance.
            </p>
          </StepShell>
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
            <Button variant="primary" onClick={next} disabled={!canContinue} className="group">
              {step === 0 ? "Review Risk" : step === 1 ? "Explore Coverage" : "Continue"}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button variant="gold" onClick={submit} disabled={!canContinue} className="group">
              Submit for Review
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
      <span className="text-[11px] font-medium uppercase tracking-label text-gold">{eyebrow}</span>
      <h2 className="mt-3 font-serif text-3xl font-light text-navy">{title}</h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-muted">{intro}</p>
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
        active ? "border-navy bg-navy text-ivory" : "border-line text-charcoal hover:border-navy/40"
      }`}
    >
      {children}
    </button>
  );
}
