import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RiskAssessmentFlow } from "@/components/risk/RiskAssessmentFlow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Risk Assessment",
  description:
    "Begin a preliminary protocol risk assessment. Submit your architecture, review an indicative risk profile and explore coverage designed around your protocol.",
};

export default function RiskAssessmentPage() {
  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-14 pt-32 text-ivory lg:pb-20 lg:pt-40">
        <div className="container-x">
          <div className="max-w-3xl">
            <SectionLabel tone="light">Protocol risk assessment</SectionLabel>
            <h1 className="mt-6 font-serif text-display font-light text-ivory">
              Begin with a risk assessment.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
              Provide your protocol information to receive an indicative risk
              profile and explore coverage designed around your architecture.
              The process below is a preliminary review and is not an
              application for, or binding offer of, insurance.
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
                  Contact Underwriting
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-muted">
                  Prefer to speak directly? Our underwriting team is available
                  for institutional enquiries.
                </p>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-label text-slate-faint">
                  Email
                </div>
                {site.email ? (
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 block text-[15px] text-navy transition-colors hover:text-gold"
                  >
                    {site.email}
                  </a>
                ) : (
                  <p className="mt-2 text-[14px] text-slate-muted">
                    Available during onboarding
                  </p>
                )}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-label text-slate-faint">
                  Telephone
                </div>
                {site.phone ? (
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-2 block text-[15px] text-navy transition-colors hover:text-gold"
                  >
                    {site.phone}
                  </a>
                ) : (
                  <p className="mt-2 text-[14px] text-slate-muted">
                    Available to policyholders
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
