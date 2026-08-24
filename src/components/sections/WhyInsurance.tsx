import { SectionLabel } from "@/components/ui/SectionLabel";

export function WhyInsurance() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-6">
            <SectionLabel>Risk transfer</SectionLabel>
            <h2 className="mt-7 max-w-lg font-serif text-display font-light text-navy">
              Selected on-chain risks can be defined, assessed and transferred.
            </h2>
          </div>

          <div className="reveal lg:col-span-6" data-reveal-delay="100">
            <div className="max-w-xl space-y-6 text-[16px] leading-relaxed text-slate-muted">
              <p>
                Digital-asset protocols depend on deployed code, governance,
                liquidity, oracles, bridges, custody and operating procedures. A
                failure in one component can affect multiple systems and assets.
              </p>
              <p className="text-charcoal">
                Insurance can address specified loss pathways when the insured
                environment, covered trigger, valuation method and policy
                obligations are documented clearly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
