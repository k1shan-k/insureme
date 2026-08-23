import { Button, ArrowRight } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroVisual } from "@/components/charts/HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory pt-32 lg:pt-40">
      {/* faint editorial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[560px] w-[46%] bg-[radial-gradient(ellipse_at_top_right,rgba(169,133,47,0.06),transparent_60%)]"
      />
      <div className="container-x relative">
        <div className="grid items-center gap-14 pb-20 lg:grid-cols-2 lg:gap-16 lg:pb-28">
          <div className="reveal max-w-xl">
            <SectionLabel>Insurance infrastructure for Web3</SectionLabel>
            <h1 className="mt-7 font-serif text-hero font-light text-navy">
              Insurance for the decentralized economy.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-slate-muted">
              Protecting protocols, digital assets, and Web3 infrastructure
              against defined on-chain risks through institutional-grade
              underwriting.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/risk-assessment"
                size="lg"
                variant="primary"
                className="group"
              >
                Get a Risk Assessment
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="/#coverage" size="lg" variant="secondary">
                Explore Coverage
              </Button>
            </div>

            <p className="mt-8 text-[13px] tracking-wide text-slate-faint">
              Built for protocols
              <span className="mx-2.5 text-gold">•</span>
              Designed for institutional risk management
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
