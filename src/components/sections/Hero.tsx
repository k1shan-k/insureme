import { Button, ArrowRight } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory pt-32 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[560px] w-[46%] bg-[radial-gradient(ellipse_at_top_right,rgba(169,133,47,0.06),transparent_60%)]"
      />
      <div className="container-x relative">
        <div className="pb-20 lg:pb-28">
          <div className="reveal max-w-4xl">
            <SectionLabel>Digital-asset insurance</SectionLabel>
            <h1 className="mt-7 max-w-4xl font-serif text-hero font-light text-navy">
              Insurance for protocols, treasuries and on-chain infrastructure.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-muted">
              Underwriting for defined smart-contract, protocol, cross-chain,
              stablecoin, custody and operational risks. Coverage is structured
              around scheduled systems, documented triggers and measurable loss.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/risk-assessment"
                size="lg"
                variant="primary"
                className="group"
              >
                Request a preliminary assessment
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="/insurance" size="lg" variant="secondary">
                View coverage areas
              </Button>
            </div>

            <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-slate-faint">
              A human underwriter will review a complete submission and send the
              assessment and quotation within 24 hours. If more information is
              required, the submitter will receive a status update within that
              period. No automated score is produced. Any quotation is subject
              to underwriting and authorized transaction documents and does not
              bind coverage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
