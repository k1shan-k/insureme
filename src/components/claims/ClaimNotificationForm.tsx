"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Button, ArrowRight } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const incidentTypes = [
  ["smart-contract", "Smart-contract incident"],
  ["protocol-exploit", "Protocol exploit"],
  ["bridge-cross-chain", "Bridge or cross-chain incident"],
  ["oracle", "Oracle or price-feed incident"],
  ["depeg", "Stablecoin or depeg event"],
  ["treasury-custody", "Treasury or custody incident"],
  ["operational", "Operational or access-control incident"],
  ["other", "Other / not yet classified"],
] as const;

const incidentStatuses = [
  ["active", "Active — loss may be continuing"],
  ["contained", "Contained — investigation ongoing"],
  ["recovery", "Recovery actions in progress"],
  ["resolved", "Resolved or no longer active"],
  ["unknown", "Status not yet known"],
] as const;

class ClaimIntakeError extends Error {}

export function ClaimNotificationForm() {
  const [form, setForm] = useState({
    policyReference: "",
    organization: "",
    contactName: "",
    email: "",
    role: "",
    phone: "",
    discoveredAt: "",
    incidentType: "",
    incidentStatus: "",
    summary: "",
    affectedSystems: "",
    transactionHashes: "",
    estimatedLoss: "",
    mitigation: "",
    evidenceLinks: "",
    acknowledgement: false,
    companySite: "",
  });
  const [state, setState] = useState<
    "idle" | "submitting" | "error" | "submitted"
  >("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const submissionIdRef = useRef("");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === "submitted") successHeadingRef.current?.focus();
  }, [state]);

  const set = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
    if (state === "submitting") return;
    if (submissionIdRef.current) submissionIdRef.current = "";
    if (state === "error") setState("idle");
    setError("");
    setForm((current) => ({ ...current, [key]: value }));
  };

  const canSubmit =
    form.policyReference.trim() !== "" &&
    form.organization.trim() !== "" &&
    form.contactName.trim() !== "" &&
    EMAIL.test(form.email.trim()) &&
    form.discoveredAt !== "" &&
    form.incidentType !== "" &&
    form.incidentStatus !== "" &&
    form.summary.trim().length >= 20 &&
    form.acknowledgement;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;
    if (!canSubmit) {
      setError(
        "Complete every required field with a valid email and an incident summary of at least 20 non-whitespace characters.",
      );
      setState("error");
      return;
    }

    const discoveredDate = new Date(form.discoveredAt);
    if (!Number.isFinite(discoveredDate.getTime())) {
      setError("Enter a valid discovery date and time.");
      setState("error");
      return;
    }

    if (!submissionIdRef.current) {
      submissionIdRef.current = crypto.randomUUID();
    }

    setState("submitting");
    setError("");

    try {
      const response = await fetch("/api/claims/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          submissionId: submissionIdRef.current,
          discoveredAt: discoveredDate.toISOString(),
          discoveredAtLocal: form.discoveredAt,
          timezoneOffsetMinutes: discoveredDate.getTimezoneOffset(),
          timezone:
            Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        }),
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
        throw new ClaimIntakeError(
          result.error ||
            "Claims intake is currently unavailable. Please try again.",
        );
      }
      if (!result.reference) {
        throw new ClaimIntakeError(
          "We could not confirm receipt of the notification. Please try again.",
        );
      }

      setReference(result.reference);
      setState("submitted");
    } catch (submissionError) {
      setError(
        submissionError instanceof ClaimIntakeError
          ? submissionError.message
          : "Claims intake is currently unavailable. Check your connection and try again.",
      );
      setState("error");
    }
  };

  if (state === "submitted") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-line bg-white p-8 text-center shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)] sm:p-14"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold text-gold">
          <IconCheck className="h-6 w-6" />
        </div>
        <p className="mt-7 text-[11px] font-medium uppercase tracking-label text-gold">
          Notification received
        </p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-3 font-serif text-3xl font-light text-navy outline-none"
        >
          Preserve evidence and continue mitigation.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-muted">
          Your notification reference is{" "}
          <strong className="font-medium text-charcoal">{reference}</strong>.
          Receipt confirms intake only. It does not confirm coverage, satisfy
          every policy notice or proof-of-loss requirement, waive any deadline,
          or determine claim payment.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/legal/claims-procedure" variant="primary">
            Review claims procedure
          </Button>
          <Button href="/client-login" variant="secondary">
            Policyholder portal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      aria-busy={state === "submitting"}
      className="border border-line bg-white shadow-[0_30px_90px_-50px_rgba(10,31,54,0.4)]"
    >
      <fieldset disabled={state === "submitting"} className="contents">
        <div className="border-b border-line bg-ivory-50 px-7 py-5 sm:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-medium uppercase tracking-label text-navy">
              Initial incident notification
            </p>
            <p className="text-[11px] text-slate-faint">
              Required fields are marked *
            </p>
          </div>
        </div>

        <div className="p-7 sm:p-10">
          <FormSection number="01" title="Policy and contact">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Policy / proposal reference"
                required
                hint="Enter “Unknown” if unavailable"
              >
                <input
                  name="policyReference"
                  required
                  autoComplete="off"
                  className={inputCls}
                  value={form.policyReference}
                  onChange={(event) =>
                    set("policyReference", event.target.value)
                  }
                  placeholder="MR-POL-… or Unknown"
                  maxLength={120}
                />
              </Field>
              <Field label="Organization" required>
                <input
                  name="organization"
                  required
                  autoComplete="organization"
                  className={inputCls}
                  value={form.organization}
                  onChange={(event) => set("organization", event.target.value)}
                  maxLength={160}
                />
              </Field>
              <Field label="Contact name" required>
                <input
                  name="contactName"
                  required
                  autoComplete="name"
                  className={inputCls}
                  value={form.contactName}
                  onChange={(event) => set("contactName", event.target.value)}
                  maxLength={120}
                />
              </Field>
              <Field label="Work email" required>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={inputCls}
                  value={form.email}
                  onChange={(event) => set("email", event.target.value)}
                  maxLength={254}
                />
              </Field>
              <Field label="Role">
                <input
                  name="role"
                  autoComplete="organization-title"
                  className={inputCls}
                  value={form.role}
                  onChange={(event) => set("role", event.target.value)}
                  maxLength={120}
                />
              </Field>
              <Field label="Telephone">
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className={inputCls}
                  value={form.phone}
                  onChange={(event) => set("phone", event.target.value)}
                  maxLength={50}
                />
              </Field>
            </div>
          </FormSection>

          <FormSection number="02" title="Incident parameters">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Date and time first discovered"
                required
                hint="Use your local time"
              >
                <input
                  type="datetime-local"
                  name="discoveredAt"
                  required
                  className={inputCls}
                  value={form.discoveredAt}
                  onChange={(event) => set("discoveredAt", event.target.value)}
                />
              </Field>
              <Field label="Current incident status" required>
                <select
                  name="incidentStatus"
                  required
                  className={inputCls}
                  value={form.incidentStatus}
                  onChange={(event) =>
                    set("incidentStatus", event.target.value)
                  }
                >
                  <option value="">Select status</option>
                  {incidentStatuses.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Incident type" required className="sm:col-span-2">
                <select
                  name="incidentType"
                  required
                  className={inputCls}
                  value={form.incidentType}
                  onChange={(event) => set("incidentType", event.target.value)}
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Incident summary"
                required
                hint="Minimum 20 characters; do not include private keys or credentials"
                className="sm:col-span-2"
              >
                <textarea
                  name="summary"
                  required
                  minLength={20}
                  rows={5}
                  className={`${inputCls} resize-y`}
                  value={form.summary}
                  onChange={(event) => set("summary", event.target.value)}
                  maxLength={3_000}
                  placeholder="What happened, what was affected, and what is currently known?"
                />
              </Field>
            </div>
          </FormSection>

          <FormSection number="03" title="Loss and evidence">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Affected chains, contracts, wallets or assets"
                className="sm:col-span-2"
              >
                <textarea
                  rows={3}
                  className={`${inputCls} resize-y`}
                  value={form.affectedSystems}
                  onChange={(event) =>
                    set("affectedSystems", event.target.value)
                  }
                  maxLength={2_000}
                  placeholder="Public addresses and asset identifiers only"
                />
              </Field>
              <Field
                label="Transaction hashes"
                className="sm:col-span-2"
                hint="One or more public hashes"
              >
                <textarea
                  rows={3}
                  className={`${inputCls} resize-y font-mono text-[13px]`}
                  value={form.transactionHashes}
                  onChange={(event) =>
                    set("transactionHashes", event.target.value)
                  }
                  maxLength={4_000}
                />
              </Field>
              <Field
                label="Initial estimated loss"
                hint="Amount and denomination; estimates may change"
              >
                <input
                  className={inputCls}
                  value={form.estimatedLoss}
                  onChange={(event) => set("estimatedLoss", event.target.value)}
                  maxLength={120}
                  placeholder="e.g. 1,250 ETH / USD equivalent unknown"
                />
              </Field>
              <Field
                label="Evidence link"
                hint="HTTPS only; use a secure channel for non-public evidence"
              >
                <input
                  type="url"
                  name="evidenceLinks"
                  pattern="https://.*"
                  title="Use an HTTPS URL"
                  autoComplete="off"
                  className={inputCls}
                  value={form.evidenceLinks}
                  onChange={(event) => set("evidenceLinks", event.target.value)}
                  maxLength={1_000}
                  placeholder="https://"
                />
              </Field>
              <Field
                label="Mitigation and recovery actions"
                className="sm:col-span-2"
              >
                <textarea
                  rows={4}
                  className={`${inputCls} resize-y`}
                  value={form.mitigation}
                  onChange={(event) => set("mitigation", event.target.value)}
                  maxLength={2_000}
                  placeholder="Pauses, notifications, containment, recovery attempts and expert involvement"
                />
              </Field>
            </div>
          </FormSection>

          <div hidden aria-hidden="true">
            <label htmlFor="claim-company-site">Company site</label>
            <input
              id="claim-company-site"
              tabIndex={-1}
              autoComplete="off"
              value={form.companySite}
              onChange={(event) => set("companySite", event.target.value)}
            />
          </div>

          <label className="mt-10 flex cursor-pointer items-start gap-3 border border-line bg-ivory-50 p-5">
            <input
              type="checkbox"
              name="acknowledgement"
              required
              className="mt-0.5 h-4 w-4 accent-[#0E2A47]"
              checked={form.acknowledgement}
              onChange={(event) => set("acknowledgement", event.target.checked)}
            />
            <span className="text-[13px] leading-relaxed text-slate-muted">
              I confirm that I am authorized to submit this notice and
              understand that notification is not acceptance of coverage, proof
              of loss, waiver of policy deadlines or a payment decision. I will
              preserve evidence, continue reasonable mitigation and comply with
              all policy notice requirements. See the{" "}
              <Link
                href="/legal/privacy"
                className="text-navy underline decoration-line underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {state === "error" && (
            <div
              role="alert"
              className="mt-6 border border-[#B5623A]/40 bg-[#B5623A]/[0.05] px-5 py-4 text-[13.5px] text-[#8F4529]"
            >
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[12px] leading-relaxed text-slate-faint">
              Do not submit seed phrases, private keys, passwords, signing
              requests or privileged credentials. Use only a separately
              authenticated channel identified in issued documentation for
              sensitive evidence.
            </p>
            <Button
              type="submit"
              variant="gold"
              disabled={state === "submitting"}
              className="group shrink-0"
            >
              {state === "submitting" ? "Submitting…" : "Notify an incident"}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

const inputCls =
  "w-full border border-line bg-ivory-50 px-4 py-3 text-[14.5px] text-charcoal outline-none transition-colors placeholder:text-slate-faint focus:border-navy focus:bg-white";

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line pb-10 pt-2 first:pt-0 [&+section]:pt-10">
      <div className="mb-7 flex items-baseline gap-4">
        <span className="font-serif text-sm text-gold">{number}</span>
        <h2 className="font-serif text-2xl font-light text-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  required = false,
  hint,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex flex-wrap items-baseline justify-between gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-slate-muted">
        <span>
          {label} {required && <span className="text-gold">*</span>}
        </span>
        {hint && (
          <span className="normal-case tracking-normal text-slate-faint">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
