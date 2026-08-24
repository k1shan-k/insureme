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

        <div
          className="reveal mt-16 border border-line bg-navy-950 p-8 sm:p-12"
          data-reveal-delay="120"
        >
          <RiskWeb />
        </div>
      </div>
    </section>
  );
}

function RiskWeb() {
  const layers = [
    { label: "Smart contracts", x: 8 },
    { label: "Governance", x: 26 },
    { label: "Oracles", x: 44 },
    { label: "Liquidity", x: 62 },
    { label: "Bridges", x: 80 },
  ];
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-label text-gold-light">
          Example dependency map
        </span>
        <span className="text-[10px] uppercase tracking-label text-ivory/40">
          Not a risk assessment
        </span>
      </div>
      <svg
        viewBox="0 0 100 34"
        className="w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        {layers.map((a, i) =>
          layers
            .slice(i + 1)
            .map((b, j) => (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={i % 2 === 0 ? 8 : 24}
                x2={b.x}
                y2={(i + j + 1) % 2 === 0 ? 8 : 24}
                stroke="#C4A15A"
                strokeWidth="0.15"
                strokeOpacity={0.35}
              />
            )),
        )}
        {layers.map((layer, i) => (
          <circle
            key={layer.label}
            cx={layer.x}
            cy={i % 2 === 0 ? 8 : 24}
            r="1.1"
            fill={i % 2 === 0 ? "#C4A15A" : "#7FA0C4"}
          />
        ))}
      </svg>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {layers.map((layer) => (
          <span
            key={layer.label}
            className="text-center text-[11px] uppercase tracking-wide text-ivory/50"
          >
            {layer.label}
          </span>
        ))}
      </div>
    </div>
  );
}
