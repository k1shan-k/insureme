import { RiskBar } from "./RiskBar";

/**
 * Refined, abstract institutional risk visualization.
 * A restrained network diagram layered behind a compact risk-profile card.
 * No literal crypto imagery — thin lines, muted tones, editorial data.
 */
export function HeroVisual() {
  const nodes = [
    { cx: 40, cy: 60 },
    { cx: 120, cy: 30 },
    { cx: 118, cy: 130 },
    { cx: 200, cy: 78 },
    { cx: 285, cy: 40 },
    { cx: 290, cy: 150 },
    { cx: 360, cy: 100 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
    [1, 4],
  ];

  return (
    <div className="relative">
      {/* Network layer */}
      <div className="relative overflow-hidden border border-line bg-navy-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.9]">
          <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C4A15A" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#C4A15A" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#C4A15A" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {/* faint grid */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 50}
                y1={0}
                x2={i * 50}
                y2={200}
                stroke="#1C3654"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 50}
                x2={400}
                y2={i * 50}
                stroke="#1C3654"
                strokeWidth="0.5"
              />
            ))}
            {edges.map(([a, b], i) => (
              <line
                key={i}
                x1={nodes[a].cx}
                y1={nodes[a].cy}
                x2={nodes[b].cx}
                y2={nodes[b].cy}
                stroke="url(#edge)"
                strokeWidth="1"
              />
            ))}
            {nodes.map((n, i) => (
              <g key={i}>
                <circle cx={n.cx} cy={n.cy} r="9" fill="none" stroke="#2A466B" strokeWidth="0.75" />
                <circle cx={n.cx} cy={n.cy} r="2.4" fill={i % 3 === 0 ? "#C4A15A" : "#7FA0C4"} />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative px-8 pb-8 pt-10 sm:px-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-label text-gold-light">
              Protocol Risk Profile
            </span>
            <span className="text-[10px] uppercase tracking-label text-ivory/40">Live</span>
          </div>
          <div className="mt-6 flex items-end gap-6">
            <div>
              <div className="font-serif text-6xl font-light leading-none text-ivory">72</div>
              <div className="mt-1 text-[11px] uppercase tracking-label text-ivory/45">
                Overall / 100
              </div>
            </div>
            <div className="mb-1 border-l border-line-dark pl-6">
              <div className="text-[11px] uppercase tracking-label text-gold-light">Moderate</div>
              <div className="mt-1 text-xs text-ivory/55">Composite index</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data card layer — offset for depth */}
      <div className="relative z-10 -mt-6 ml-6 mr-0 border border-line bg-ivory/98 p-6 shadow-[0_24px_60px_-30px_rgba(10,31,54,0.45)] sm:ml-10 sm:p-7 backdrop-blur">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
          <span className="text-[10px] font-medium uppercase tracking-label text-slate-muted">
            Risk Factors
          </span>
          <span className="text-[10px] uppercase tracking-label text-slate-faint">
            Weighted
          </span>
        </div>
        <div className="grid gap-4">
          <RiskBar label="Smart Contract" value={78} />
          <RiskBar label="Governance" value={69} />
          <RiskBar label="Liquidity" value={81} />
          <RiskBar label="Operational Controls" value={76} />
        </div>
      </div>
    </div>
  );
}
