import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-ivory hover:bg-navy-950 border border-navy hover:border-navy-950",
  secondary:
    "bg-transparent text-navy border border-navy/25 hover:border-navy hover:bg-navy/[0.03]",
  gold: "bg-gold text-white hover:bg-[#96741f] border border-gold",
  ghost: "bg-transparent text-navy hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "text-[13px] px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-[15px] px-7 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className = "", children, ...props }, ref) {
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if ("href" in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    const { ...rest } = props as ButtonAsButton;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

export function ArrowRight({ className = "" }: { className?: string }) {
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
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
