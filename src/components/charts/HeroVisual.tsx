/**
 * Preliminary-review summary with a decorative network isolated from copy.
 */
export function HeroVisual() {
  const nodes = [
    { cx: 42, cy: 42 },
    { cx: 122, cy: 76 },
    { cx: 92, cy: 154 },
    { cx: 206, cy: 42 },
    { cx: 214, cy: 132 },
    { cx: 318, cy: 76 },
    { cx: 340, cy: 164 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 5],
    [4, 5],
    [4, 6],
    [5, 6],
  ];
  const reviewAreas = [
    "Architecture and deployed code",
    "Governance and privileges",
    "External dependencies",
    "Operational controls",
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden border border-line bg-navy-950">
        <div className="grid">
          <div className="relative z-10 flex min-h-[280px] flex-col bg-navy-950 px-8 py-9 sm:px-10 sm:py-10">
            <div className="flex flex-col items-start gap-3">
              <span className="text-[10px] font-medium uppercase tracking-label text-gold-light">
                Preliminary underwriting review
              </span>
              <span className="border border-line-dark px-2.5 py-1 text-[9px] uppercase tracking-label text-ivory/55">
                No automated score
              </span>
            </div>

            <div className="mt-auto border-l border-line-dark pl-5 sm:pl-6">
              <h2 className="font-serif text-3xl font-light leading-tight text-ivory">
                Evidence before conclusions
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/60">
                Eligibility, insurance coverage, and terms are not determined by
                the website.
              </p>
            </div>
          </div>

          <div
            className="relative min-h-[220px] overflow-hidden border-t border-line-dark bg-navy-900"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_46%,rgba(196,161,90,0.09),transparent_48%)]" />
            <svg
              viewBox="0 0 380 210"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="hero-edge" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C4A15A" stopOpacity="0.12" />
                  <stop offset="50%" stopColor="#C4A15A" stopOpacity="0.52" />
                  <stop offset="100%" stopColor="#C4A15A" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              {Array.from({ length: 9 }).map((_, index) => (
                <line
                  key={`vertical-${index}`}
                  x1={index * 48}
                  y1={0}
                  x2={index * 48}
                  y2={210}
                  stroke="#1C3654"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: 6 }).map((_, index) => (
                <line
                  key={`horizontal-${index}`}
                  x1={0}
                  y1={index * 42}
                  x2={380}
                  y2={index * 42}
                  stroke="#1C3654"
                  strokeWidth="0.5"
                />
              ))}

              {edges.map(([start, end], index) => (
                <line
                  key={`edge-${index}`}
                  x1={nodes[start].cx}
                  y1={nodes[start].cy}
                  x2={nodes[end].cx}
                  y2={nodes[end].cy}
                  stroke="url(#hero-edge)"
                  strokeWidth="1"
                />
              ))}

              {nodes.map((node, index) => (
                <g key={`node-${index}`}>
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="10"
                    fill="#0B213A"
                    stroke="#2A466B"
                    strokeWidth="0.9"
                  />
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="2.8"
                    fill={index % 3 === 0 ? "#C4A15A" : "#7FA0C4"}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-px ml-4 border border-line bg-ivory p-6 shadow-[0_24px_60px_-30px_rgba(10,31,54,0.45)] sm:ml-8 sm:p-7">
        <div className="mb-4 flex flex-col gap-2 border-b border-line pb-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[10px] font-medium uppercase tracking-label text-slate-muted">
            Review areas
          </span>
          <span className="text-[10px] uppercase tracking-label text-slate-faint">
            Information dependent
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {reviewAreas.map((area) => (
            <div
              key={area}
              className="border border-line bg-white px-4 py-3 text-[12.5px] text-charcoal"
            >
              {area}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
