import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { policyFrameworkParameters } from "@/lib/programs";

export function PolicyParameters() {
  return (
    <section className="border-t border-line bg-ivory py-24 lg:py-32">
      <div className="container-x">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>Policy parameters</SectionLabel>
            <h2 className="mt-7 max-w-3xl font-serif text-display font-light text-navy">
              Coverage is defined by parameters, not assumptions.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-muted lg:col-span-5 lg:justify-self-end">
            Every policy is structured around explicit boundaries, triggers,
            retentions, limits, valuation rules and insured obligations. These
            parameters determine whether and how a policy may respond.
          </p>
        </div>

        <div className="reveal mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {policyFrameworkParameters.map((parameter) => (
            <article
              key={parameter.index}
              className="min-h-[290px] border-b border-r border-line p-7 lg:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="font-serif text-sm text-gold">
                  {parameter.index}
                </span>
                <span className="text-right text-[9px] font-medium uppercase tracking-[0.14em] text-slate-faint">
                  Defined in policy
                </span>
              </div>
              <h3 className="mt-7 font-serif text-xl font-medium text-navy">
                {parameter.name}
              </h3>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.11em] text-gold">
                {parameter.question}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-muted">
                {parameter.description}
              </p>
              <p className="mt-6 border-t border-line pt-4 text-[11.5px] leading-relaxed text-slate-faint">
                {parameter.schedule}
              </p>
            </article>
          ))}
        </div>

        <div className="reveal mt-8 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-slate-faint">
            No parameter shown here is a quotation or promise of coverage.
            Product-specific schedules, endorsements and issued wording
            exclusively control.
          </p>
          <div className="flex shrink-0 flex-wrap gap-5 text-[13px] font-medium">
            <Link
              href="/insurance"
              className="inline-flex items-center gap-2 text-navy transition-colors hover:text-gold"
            >
              Explore programs <IconArrowUpRight />
            </Link>
            <Link
              href="/legal/policy-terms"
              className="inline-flex items-center gap-2 text-navy transition-colors hover:text-gold"
            >
              Policy framework <IconArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
