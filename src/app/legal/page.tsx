import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { legalDocs } from "@/lib/legal";
import { insurancePrograms } from "@/lib/programs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Legal and Disclosure Information",
  description:
    "General website terms, privacy, coverage documentation, claims guidance, risk disclosures, and transaction-verification information.",
  path: "/legal",
});

export default function LegalIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-14 pt-32 text-ivory lg:pt-40">
        <div className="container-x">
          <SectionLabel tone="light">Legal and disclosures</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-serif text-display font-light text-ivory">
            General information and disclosures
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
            Review website terms, privacy information, risk disclosures, and
            non-binding coverage documentation. Transaction documents control
            insurance coverage.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid border-l border-r border-t border-line sm:grid-cols-2">
            {legalDocs.map((document) => (
              <Link
                key={document.slug}
                href={`/legal/${document.slug}`}
                className="group flex flex-col border-b border-line p-8 transition-colors hover:bg-ivory-50 sm:odd:border-r lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <h2 className="font-serif text-xl font-medium text-navy">
                    {document.title}
                  </h2>
                  <IconArrowUpRight className="mt-1 text-slate-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-muted">
                  {document.intro}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-20 border-t border-line pt-12">
            <SectionLabel>Program overviews</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-light text-navy">
              Coverage considerations by risk area
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-muted">
              These non-binding summaries describe underwriting considerations
              and examples. They do not create coverage, exclusions, duties, or
              rights.
            </p>
            <div className="mt-10 grid border-l border-r border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {insurancePrograms.map((program) => (
                <Link
                  key={program.slug}
                  href={`/insurance/${program.slug}#program-overview`}
                  className="group flex flex-col border-b border-line p-7 transition-colors hover:bg-ivory-50"
                >
                  <span className="font-serif text-sm text-gold">
                    {program.index}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-medium text-navy">
                    {program.title}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-navy group-hover:text-gold">
                    Review program overview <IconArrowUpRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
