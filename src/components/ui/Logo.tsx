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
  // The descriptor is 8.5px, so it needs a variant-specific colour to hold a
  // WCAG AA contrast ratio on both the ivory and navy-950 surfaces.
  const descriptor =
    variant === "light" ? "text-ivory/70" : "text-slate-muted";
  const accent = variant === "light" ? "#C4A15A" : "#A9852F";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <span aria-hidden="true" className="shrink-0">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          {/* Protective shield enclosing a geometric P. */}
          <path
            d="M13 1.8L23 5.4v7.8c0 5.5-4.3 9.4-10 11-5.7-1.6-10-5.5-10-11V5.4L13 1.8z"
            stroke={mark}
            strokeWidth="1.15"
            strokeLinejoin="miter"
            fill="none"
          />
          <path
            d="M9.6 18V8.4h3.4a2.8 2.8 0 010 5.6H9.6"
            stroke={mark}
            strokeWidth="1.35"
            strokeLinejoin="miter"
            fill="none"
          />
          <path d="M9.6 20.6h6.2" stroke={accent} strokeWidth="1.35" />
        </svg>
      </span>
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="font-serif text-[19px] font-semibold tracking-tight">
          Prime
          <span className={variant === "light" ? "text-gold-light" : "text-gold"}>
            {" "}
            Insurances
          </span>
        </span>
        <span
          className={`mt-1 text-[8.5px] font-medium uppercase tracking-[0.24em] ${descriptor}`}
        >
          Underwriting Group
        </span>
      </span>
    </Link>
  );
}
