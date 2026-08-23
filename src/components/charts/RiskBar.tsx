export function RiskBar({
  label,
  value,
  tone = "auto",
}: {
  label: string;
  value: number;
  tone?: "auto" | "navy" | "gold";
}) {
  const color =
    tone === "navy"
      ? "#0E2A47"
      : tone === "gold"
        ? "#A9852F"
        : value >= 80
          ? "#3A6B4C"
          : value >= 70
            ? "#A9852F"
            : "#B5623A";

  return (
    <div className="group">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-charcoal/80">{label}</span>
        <span className="font-serif text-[15px] tabular-nums text-navy">
          {value}
        </span>
      </div>
      <div className="mt-2 h-[3px] w-full bg-line/80">
        <div
          className="h-full origin-left"
          style={{
            width: `${value}%`,
            backgroundColor: color,
            transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}
