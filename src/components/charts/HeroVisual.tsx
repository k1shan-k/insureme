/**
 * Abstract network visualization with factual preliminary-review status.
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
  const reviewAreas = [
    "Architecture and deployed code",
    "Governance and privileges",
    "External dependencies",
    "Operational controls",
  ];

  return (
    <div className="relative">
      <div className="relative overflow-hidden border border-line bg-navy-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.9]">
          <svg
            viewBox="0 0 400 200"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C4A15A" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#C4A15A" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#C4A15A" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {Array.from({ length: 9 }).map((_, index) => (
              <line
                key={`v${index}`}
                x1={index * 50}
                y1={0}
                x2={index * 50}
                y2={200}
                stroke="#1C3654"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 5 }).map((_, index) => (
              <line
                key={`h${index}`}
                x1={0}
                y1={index * 50}
                x2={400}
                y2={index * 50}
                stroke="#1C3654"
                strokeWidth="0.5"
              />
            ))}
            {edges.map(([start, end], index) => (
              <line
                key={index}
                x1={nodes[start].cx}
                y1={nodes[start].cy}
                x2={nodes[end].cx}
                y2={nodes[end].cy}
                stroke="url(#edge)"
                strokeWidth="1"
              />
            ))}
            {nodes.map((node, index) => (
              <g key={index}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="9"
                  fill="none"
                  stroke="#2A466B"
                  strokeWidth="0.75"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="2.4"
                  fill={index % 3 === 0 ? "#C4A15A" : "#7FA0C4"}
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative px-8 pb-10 pt-10 sm:px-10">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-medium uppercase tracking-label text-gold-light">
              Preliminary underwriting review
            </span>
            <span className="text-[10px] uppercase tracking-label text-ivory/40">
              No automated score
            </span>
          </div>
          <div className="mt-16 max-w-sm border-l border-line-dark pl-6">
            <div className="font-serif text-3xl font-light text-ivory">
              Evidence before conclusions
            </div>
            <div className="mt-3 text-sm leading-relaxed text-ivory/55">
              Eligibility, insurance coverage, and terms are not determined by
              the website.
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-6 ml-6 mr-0 border border-line bg-ivory/98 p-6 shadow-[0_24px_60px_-30px_rgba(10,31,54,0.45)] backdrop-blur sm:ml-10 sm:p-7">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
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
