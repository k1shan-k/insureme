import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const text = variant === "light" ? "text-ivory" : "text-navy";
  const mark = variant === "light" ? "#F7F4EE" : "#0E2A47";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <span aria-hidden="true" className="shrink-0">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect x="0.6" y="0.6" width="24.8" height="24.8" stroke={mark} strokeWidth="1.1" />
          <path
            d="M6 18V8l7 6 7-6v10"
            stroke={mark}
            strokeWidth="1.3"
            strokeLinejoin="miter"
            fill="none"
          />
          <path d="M13 14v4" stroke="#A9852F" strokeWidth="1.3" />
        </svg>
      </span>
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="font-serif text-[19px] font-semibold tracking-tight">
          Meridian
          <span className="text-gold"> Risk</span>
        </span>
        <span className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.24em] text-slate-muted">
          Underwriting Group
        </span>
      </span>
    </Link>
  );
}
