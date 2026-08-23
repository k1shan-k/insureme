import Link from "next/link";
import { IconArrowUpRight } from "./Icons";

export function CoverageCard({
  index,
  title,
  description,
  icon,
  href = "/risk-assessment",
}: {
  index: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col border-t border-line bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-50 lg:p-9"
    >
      <div className="flex items-start justify-between">
        <span className="font-serif text-sm text-slate-faint">{index}</span>
        <span className="text-navy/80 transition-colors duration-500 group-hover:text-gold">
          {icon}
        </span>
      </div>
      <h3 className="mt-8 font-serif text-[22px] font-medium leading-snug text-navy">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-muted">
        {description}
      </p>
      <span className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy transition-colors group-hover:text-gold">
        Learn more
        <IconArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

export function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative border-t border-line-dark pt-8">
      <span className="font-serif text-4xl font-light text-gold-light/90">{step}</span>
      <h3 className="mt-5 font-serif text-xl font-medium text-ivory">{title}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-ivory/60">{description}</p>
    </div>
  );
}

export function PillarCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group border-t border-line pt-8">
      <span className="text-navy transition-colors duration-500 group-hover:text-gold">
        {icon}
      </span>
      <h3 className="mt-6 font-serif text-xl font-medium text-navy">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-slate-muted">{description}</p>
    </div>
  );
}
