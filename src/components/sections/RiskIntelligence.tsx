import { SectionLabel } from "@/components/ui/SectionLabel";
import { RiskGauge } from "@/components/charts/RiskGauge";
import { RiskBar } from "@/components/charts/RiskBar";
import { IconCheck } from "@/components/ui/Icons";
import { riskFactors, riskInputs } from "@/lib/content";

export function RiskIntelligence() {
  return (
    <section
      id="risk-intelligence"
      className="scroll-mt-24 border-t border-line bg-ivory py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: narrative */}
          <div className="reveal lg:col-span-5">
            <SectionLabel>Risk intelligence</SectionLabel>
            <h2 className="mt-7 font-serif text-display font-light text-navy">
              Underwriting informed by on-chain intelligence.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-slate-muted">
              We evaluate protocol risk across the technical, economic, governance and operational
              factors that shape an insured environment — combining on-chain data with disciplined
              underwriting judgement.
            </p>

            <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {riskInputs.map((input) => (
                <li key={input} className="flex items-start gap-2.5 text-[14px] text-charcoal/80">
                  <IconCheck className="mt-0.5 shrink-0 text-gold" />
                  {input}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: dashboard mockup */}
          <div className="reveal lg:col-span-7" data-reveal-delay="120">
            <div className="border border-line bg-white shadow-[0_30px_80px_-40px_rgba(10,31,54,0.35)]">
              {/* terminal header */}
              <div className="flex items-center justify-between border-b border-line bg-ivory-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-[11px] font-medium uppercase tracking-label text-navy">
                    Protocol Risk Profile
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-faint">REF · MRX-4471</span>
              </div>

              <div className="grid gap-8 p-8 sm:grid-cols-2 sm:p-10">
                <div className="flex flex-col items-center justify-center border-b border-line pb-8 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
                  <span className="mb-4 text-[11px] uppercase tracking-label text-slate-faint">
                    Overall Risk
                  </span>
                  <RiskGauge score={72} label="Moderate" />
                </div>

                <div className="flex flex-col justify-center gap-5">
                  {riskFactors.map((f) => (
                    <RiskBar key={f.label} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-line border-t border-line text-center">
                {[
                  { k: "Audits", v: "3 reviewed" },
                  { k: "Governance", v: "Timelocked" },
                  { k: "Coverage", v: "Eligible" },
                ].map((s) => (
                  <div key={s.k} className="px-4 py-5">
                    <div className="text-[11px] uppercase tracking-[0.1em] text-slate-faint">
                      {s.k}
                    </div>
                    <div className="mt-1.5 font-serif text-[15px] text-navy">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[12px] text-slate-faint">
              Illustrative risk profile. Indicators, weightings and outcomes vary by protocol and
              are subject to underwriting review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
