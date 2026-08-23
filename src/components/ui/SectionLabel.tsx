export function SectionLabel({
  children,
  className = "",
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "light";
}) {
  const color = tone === "light" ? "text-gold-light" : "text-gold";
  const line = tone === "light" ? "bg-gold-light/50" : "bg-gold/60";
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-label ${color} ${className}`}
    >
      <span aria-hidden="true" className={`inline-block h-px w-8 ${line}`} />
      {children}
    </span>
  );
}
