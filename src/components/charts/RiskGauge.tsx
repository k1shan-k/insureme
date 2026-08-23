export function RiskGauge({
  score = 72,
  max = 100,
  label = "Moderate",
}: {
  score?: number;
  max?: number;
  label?: string;
}) {
  const radius = 78;
  const circumference = Math.PI * radius; // semicircle
  const pct = Math.min(score / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex flex-col items-center">
      <svg width="200" height="118" viewBox="0 0 200 118" aria-hidden="true">
        <path
          d="M 15 108 A 85 85 0 0 1 185 108"
          fill="none"
          stroke="#E4DDCE"
          strokeWidth="7"
        />
        <path
          d="M 15 108 A 85 85 0 0 1 185 108"
          fill="none"
          stroke="#A9852F"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
        {/* tick marks */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const angle = Math.PI * (1 - t);
          const x1 = 100 + Math.cos(angle) * 68;
          const y1 = 108 - Math.sin(angle) * 68;
          const x2 = 100 + Math.cos(angle) * 74;
          const y2 = 108 - Math.sin(angle) * 74;
          return (
            <line
              key={t}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#B7AE9C"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="font-serif text-5xl font-light leading-none text-navy">
          {score}
          <span className="text-xl text-slate-faint"> / {max}</span>
        </span>
        <span className="mt-2 text-[11px] font-medium uppercase tracking-label text-gold">
          {label}
        </span>
      </div>
    </div>
  );
}
