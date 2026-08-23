import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, ArrowRight } from "@/components/ui/Button";
import { IconCheck, IconArrowUpRight } from "@/components/ui/Icons";
import { getInsuranceProgram, insurancePrograms } from "@/lib/programs";

export function generateStaticParams() {
  return insurancePrograms.map((program) => ({ slug: program.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const program = getInsuranceProgram(params.slug);
  if (!program) return { title: "Insurance program not found" };
  return {
    title: `${program.title} — Program & Indicative Terms`,
    description: `${program.description} Review indicative coverage triggers, exclusions, insured duties and claims conditions.`,
  };
}

export default function InsuranceProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = getInsuranceProgram(params.slug);
  if (!program) notFound();

  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-16 pt-32 text-ivory lg:pb-24 lg:pt-40">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel tone="light">
                Insurance program {program.index}
              </SectionLabel>
              <h1 className="mt-6 max-w-4xl font-serif text-display font-light text-ivory">
                {program.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
                {program.strapline}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
              <Button
                href="/risk-assessment"
                variant="gold"
                size="lg"
                className="group"
              >
                Request Assessment
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href="#indicative-terms"
                variant="secondary"
                size="lg"
                className="border-ivory/30 text-ivory hover:border-ivory hover:bg-white/[0.04]"
              >
                Review Terms
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-[11px] font-medium uppercase tracking-label text-slate-faint">
                  Insurance programs
                </h2>
                <nav className="mt-5 flex flex-col gap-1">
                  {insurancePrograms.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/insurance/${item.slug}`}
                      className={`border-l-2 py-2 pl-4 text-[14px] transition-colors ${
                        item.slug === program.slug
                          ? "border-gold text-navy"
                          : "border-line text-slate-muted hover:border-navy/40 hover:text-navy"
                      }`}
                    >
                      {item.shortTitle}
                    </Link>
                  ))}
                </nav>
                <Link
                  href="/insurance"
                  className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-navy hover:text-gold"
                >
                  Compare all programs <IconArrowUpRight />
                </Link>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="border-l-2 border-gold bg-ivory-50 px-6 py-5">
                <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-gold">
                  Important — indicative wording only
                </p>
                <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-slate-muted">
                  This page is not a quotation, binder, policy or promise of
                  coverage. No insurance attaches unless Meridian Risk completes
                  underwriting, receives premium and issues authorized policy
                  documentation. The issued wording controls in every case.
                </p>
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <OverviewList
                  title="Designed for"
                  items={program.designedFor}
                />
                <OverviewList
                  title="Required for underwriting"
                  items={program.requiredInformation}
                />
                <OverviewList
                  title="Indicative coverage triggers"
                  items={program.indicativeTriggers}
                />
                <OverviewList
                  title="Key program exclusions"
                  items={program.programExclusions}
                  warning
                />
              </div>

              <div
                id="indicative-terms"
                className="mt-20 scroll-mt-28 border-t border-line pt-10"
              >
                <SectionLabel>Program terms</SectionLabel>
                <h2 className="mt-5 font-serif text-4xl font-light text-navy">
                  Indicative conditions, limitations and insurer protections.
                </h2>
                <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-slate-muted">
                  The provisions below illustrate the protections Meridian Risk
                  ordinarily requires. Underwriting may add, remove or amend
                  terms, exclusions, warranties, retentions, sub-limits and
                  termination rights before any policy is offered.
                </p>

                <div className="mt-12 space-y-12">
                  {program.terms.map((section, index) => (
                    <section
                      key={section.heading}
                      className="max-w-3xl border-t border-line pt-8"
                    >
                      <div className="flex items-start gap-5">
                        <span className="mt-1 font-serif text-sm text-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-serif text-xl font-medium text-navy">
                            {section.heading}
                          </h3>
                          {section.paragraphs.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="mt-4 text-[15px] leading-relaxed text-slate-muted"
                            >
                              {paragraph}
                            </p>
                          ))}
                          {section.list && (
                            <ul className="mt-5 space-y-3">
                              {section.list.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-3 text-[14.5px] leading-relaxed text-charcoal/85"
                                >
                                  <IconCheck className="mt-1 shrink-0 text-gold" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-16 border border-line bg-navy-900 p-8 text-ivory sm:p-10">
                  <h2 className="font-serif text-3xl font-light">
                    Discuss the risk with underwriting.
                  </h2>
                  <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ivory/60">
                    Start with protocol information. Submission does not bind
                    Meridian Risk or create coverage, but it gives our team the
                    basis for a structured underwriting review.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href="/risk-assessment"
                      variant="gold"
                      className="group"
                    >
                      Begin Assessment{" "}
                      <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      href="/legal/policy-terms"
                      variant="secondary"
                      className="border-ivory/30 text-ivory hover:border-ivory hover:bg-white/[0.04]"
                    >
                      General Policy Framework
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OverviewList({
  title,
  items,
  warning = false,
}: {
  title: string;
  items: string[];
  warning?: boolean;
}) {
  return (
    <section className="border-t border-line pt-6">
      <h2 className="text-[11px] font-medium uppercase tracking-label text-slate-faint">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[14.5px] leading-relaxed text-charcoal/85"
          >
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 ${warning ? "bg-[#B5623A]" : "bg-gold"}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
