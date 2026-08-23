type IconProps = { className?: string };

const common = {
  width: 28,
  height: 28,
  viewBox: "0 0 28 28",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2 as const,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
};

export function IconSmartContract({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="5" y="3" width="15" height="22" />
      <path d="M8 8h9M8 12h9M8 16h6" />
      <path d="M17 20l2 2 4-4" strokeWidth={1.3} />
    </svg>
  );
}

export function IconExploit({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M14 3l9 4v6c0 6-4 10-9 12-5-2-9-6-9-12V7l9-4z" />
      <path d="M14 10v5M14 18v0.5" />
    </svg>
  );
}

export function IconBridge({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M3 18v-3a11 11 0 0122 0v3" />
      <path d="M3 18h22M8 18v-4M14 18v-6M20 18v-4" />
      <path d="M3 22h22" />
    </svg>
  );
}

export function IconDepeg({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4 19l5-6 4 3 5-8 6 6" />
      <path d="M4 23h20" />
      <path d="M4 5v6" strokeWidth={1} opacity={0.5} />
    </svg>
  );
}

export function IconTreasury({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M14 3l10 5v2H4V8l10-5z" />
      <path d="M7 12v8M12 12v8M16 12v8M21 12v8" />
      <path d="M4 22h20" />
    </svg>
  );
}

export function IconCustom({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="14" cy="14" r="4" />
      <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6 6l2 2M20 20l2 2M22 6l-2 2M6 22l2-2" />
    </svg>
  );
}

/* Why-us / pillar icons */
export function IconUnderwriting({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M14 3v22M8 8l6-5 6 5M6 12h16M6 12l-2 6a4 4 0 008 0l-2-6M22 12l-2 6a4 4 0 008 0l-2-6" />
    </svg>
  );
}

export function IconExpertise({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="14" cy="10" r="5" />
      <path d="M6 24c0-4 3.6-6 8-6s8 2 8 6" />
      <path d="M11 10l2 2 4-4" strokeWidth={1.3} />
    </svg>
  );
}

export function IconData({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="4" y="4" width="20" height="20" />
      <path d="M9 19v-5M14 19v-9M19 19v-3" />
    </svg>
  );
}

export function IconPolicy({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M7 3h10l4 4v18H7z" />
      <path d="M17 3v4h4" />
      <path d="M10 13h8M10 17h8M10 21h5" />
    </svg>
  );
}

/* small utility icons */
export function IconArrowUpRight({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10L10 4M5 4h5v5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function IconAlert({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 2l6 11H2L8 2z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7v3M8 11.5v.3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8.5L6.5 12 13 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  );
}
