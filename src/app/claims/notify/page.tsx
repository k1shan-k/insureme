import type { Metadata } from "next";
import Link from "next/link";
import { ClaimNotificationForm } from "@/components/claims/ClaimNotificationForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconCheck } from "@/components/ui/Icons";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Initial Incident Notification",
  description:
    "Submit initial incident information through the configured intake route. Receipt does not determine insurance coverage, satisfy every notice requirement, or waive a deadline.",
  path: "/claims/notify",
});

const noticeParameters = [
  "Policy or proposal reference",
  "Discovery date and incident status",
  "Affected contracts, wallets, chains and assets",
  "Public transaction evidence",
  "Initial estimated loss and denomination",
  "Mitigation and recovery actions",
];

export default function ClaimNotificationPage() {
  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-16 pt-32 text-ivory lg:pb-24 lg:pt-40">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel tone="light">Claims notification</SectionLabel>
              <h1 className="mt-6 max-w-4xl font-serif text-display font-light text-ivory">
                Submit initial incident information
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
                Provide initial information as soon as practicable, but do not
                delay safety, containment, evidence preservation, or any notice
                required by issued documentation. This form is an intake route
                only.
              </p>
            </div>
            <div className="border-l border-line-dark pl-6 lg:col-span-4">
              <p className="text-[11px] font-medium uppercase tracking-label text-gold-light">
                Urgent incident guidance
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ivory/60">
                Prioritize safety and reasonable loss mitigation. Preserve logs,
                transaction data, communications and system state. Do not submit
                private keys, seed phrases or passwords.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <div className="space-y-8 lg:sticky lg:top-28">
                <div className="border-t border-line pt-6">
                  <h2 className="text-[11px] font-medium uppercase tracking-label text-slate-faint">
                    Notification parameters
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {noticeParameters.map((parameter) => (
                      <li
                        key={parameter}
                        className="flex items-start gap-3 text-[13.5px] leading-relaxed text-charcoal/80"
                      >
                        <IconCheck className="mt-0.5 shrink-0 text-gold" />
                        {parameter}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-6">
                  <h2 className="font-serif text-lg text-navy">
                    Before submitting
                  </h2>
                  <p className="mt-3 text-[13px] leading-relaxed text-slate-muted">
                    Review issued notice requirements. This web form does not
                    extend or replace contractual deadlines, proof-of-loss
                    obligations, administrator channels, or emergency contacts.
                  </p>
                  <Link
                    href="/legal/claims-procedure"
                    className="mt-5 inline-flex text-[13px] font-medium text-navy underline decoration-line underline-offset-4 hover:text-gold"
                  >
                    Review claims procedure
                  </Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <ClaimNotificationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
