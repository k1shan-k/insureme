import { Button, ArrowRight } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroVisual } from "@/components/charts/HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory pt-32 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[560px] w-[46%] bg-[radial-gradient(ellipse_at_top_right,rgba(169,133,47,0.06),transparent_60%)]"
      />
      <div className="container-x relative">
        <div className="grid items-center gap-14 pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-28">
          <div className="reveal max-w-xl">
            <SectionLabel>Digital-asset insurance</SectionLabel>
            <h1 className="mt-7 font-serif text-hero font-light text-navy">
              Insurance for protocols, treasuries and on-chain infrastructure.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-muted">
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

            <p className="mt-8 max-w-lg text-[13px] leading-relaxed text-slate-faint">
              Submission does not constitute an application, quotation, offer or
              decision to provide insurance.
            </p>
          </div>

          <div className="reveal" data-reveal-delay="120">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
