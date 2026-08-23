import { SectionLabel } from "@/components/ui/SectionLabel";

export function WhyInsurance() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-6">
            <SectionLabel>Why Web3 needs insurance</SectionLabel>
            <h2 className="mt-7 max-w-lg font-serif text-display font-light text-navy">
              Digital infrastructure requires digital risk protection.
            </h2>
          </div>

          <div className="reveal lg:col-span-6" data-reveal-delay="100">
            <div className="max-w-xl space-y-6 text-[16px] leading-relaxed text-slate-muted">
              <p>
                DeFi protocols operate across smart contracts, governance
                systems, liquidity pools, oracles, bridges and interconnected
                infrastructure. A single failure can propagate rapidly across an
                ecosystem.
              </p>
              <p className="text-charcoal">
                Our underwriting framework is designed specifically for these
                risks.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
              {[
                { k: "Interconnected", v: "Systems" },
                { k: "Propagating", v: "Failure Modes" },
                { k: "Evolving", v: "Architectures" },
              ].map((s) => (
                <div key={s.k} className="px-4 py-6 first:pl-0">
                  <div className="font-serif text-lg text-navy">{s.k}</div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.12em] text-slate-faint">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial risk diagram */}
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
    { label: "Smart Contracts", x: 8 },
    { label: "Governance", x: 26 },
    { label: "Oracles", x: 44 },
    { label: "Liquidity Pools", x: 62 },
    { label: "Bridges", x: 80 },
  ];
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-label text-gold-light">
          Interdependency Map
        </span>
        <span className="text-[10px] uppercase tracking-label text-ivory/40">
          Illustrative
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
        {layers.map((l, i) => (
          <circle
            key={l.label}
            cx={l.x}
            cy={i % 2 === 0 ? 8 : 24}
            r="1.1"
            fill={i % 2 === 0 ? "#C4A15A" : "#7FA0C4"}
          />
        ))}
      </svg>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {layers.map((l) => (
          <span
            key={l.label}
            className="text-center text-[11px] uppercase tracking-wide text-ivory/50"
          >
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
