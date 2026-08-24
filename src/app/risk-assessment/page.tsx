import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RiskAssessmentFlow } from "@/components/risk/RiskAssessmentFlow";
import { site } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Request an Assessment",
  description:
    "Submit comprehensive protocol and coverage information for manual underwriting review. A human underwriter will send the assessment and quotation within 24 hours of a complete submission, or provide a status update if more information is required. No automated score is produced.",
  path: "/risk-assessment",
});

export default function RiskAssessmentPage() {
  const hasAssessmentContact = Boolean(site.email || site.phone);

  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-14 pt-32 text-ivory lg:pb-20 lg:pt-40">
        <div className="container-x">
          <div className="max-w-3xl">
            <SectionLabel tone="light">Manual underwriting review</SectionLabel>
            <h1 className="mt-6 font-serif text-display font-light text-ivory">
              Request an assessment
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
              Provide comprehensive organization, architecture, control and
              coverage information for manual underwriting review. A human
              underwriter will review a complete submission and send the
              assessment and quotation within 24 hours. If more information is
              required, the submitter will receive a status update within that
              period. No automated score is produced, and any quotation remains
              subject to underwriting and authorized transaction documents.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <RiskAssessmentFlow />

            <div
              id="contact"
              className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-3"
            >
              <div>
                <h2 className="font-serif text-lg text-navy">
                  Assessment information
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-muted">
                  Review the underwriting methodology or use a configured
                  contact route for an assessment enquiry.
                </p>
                <Link
                  href="/legal/underwriting-methodology"
                  className="mt-4 inline-flex text-[13px] font-medium text-navy underline decoration-line underline-offset-4 hover:text-gold"
                >
                  Review underwriting methodology
                </Link>
              </div>
              {site.email && (
                <div>
                  <div className="text-[11px] uppercase tracking-label text-slate-faint">
                    Email
                  </div>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block text-[15px] text-navy transition-colors hover:text-gold"
                  >
                    {site.email}
                  </a>
                </div>
              )}
              {site.phone && (
                <div>
                  <div className="text-[11px] uppercase tracking-label text-slate-faint">
                    Telephone
                  </div>
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-2 block text-[15px] text-navy transition-colors hover:text-gold"
                  >
                    {site.phone}
                  </a>
                </div>
              )}
              {!hasAssessmentContact && (
                <p className="text-[14px] leading-relaxed text-slate-muted sm:col-span-2">
                  No separate public assessment contact is configured. Use the
                  form above to submit information when online intake is
                  available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
