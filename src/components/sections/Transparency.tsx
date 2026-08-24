import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { transparencyItems } from "@/lib/content";

export function Transparency() {
  return (
    <section id="trust" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-4">
            <SectionLabel>Information and disclosures</SectionLabel>
            <h2 className="mt-7 font-serif text-display font-light text-navy">
              Review the documents relevant to a coverage decision.
            </h2>
            <p className="mt-7 max-w-sm text-[16px] leading-relaxed text-slate-muted">
              These pages explain general underwriting considerations, policy
              structure, claims handling and material limitations. Executed
              transaction documents control in every case.
            </p>
          </div>

          <div className="reveal lg:col-span-8" data-reveal-delay="120">
            <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
              {transparencyItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between border-b border-line px-1 py-5 transition-colors hover:text-gold sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                >
                  <span className="text-[15px] text-charcoal transition-colors group-hover:text-gold">
                    {item.label}
                  </span>
                  <IconArrowUpRight className="text-slate-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
