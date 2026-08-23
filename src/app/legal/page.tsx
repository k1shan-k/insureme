import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { legalDocs } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal & Policy Documentation",
  description:
    "Privacy Policy, Terms of Use, Insurance Policy Terms, Coverage Disclosures, Claims Procedure, Risk Disclosures and Regulatory Information.",
};

export default function LegalIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-14 pt-32 text-ivory lg:pt-40">
        <div className="container-x">
          <SectionLabel tone="light">Legal &amp; policy</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-serif text-display font-light text-ivory">
            Documentation and disclosures.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
            The frameworks that govern our website, coverage and claims — published in the interest
            of clarity and transparency.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid border-l border-r border-t border-line sm:grid-cols-2">
            {legalDocs.map((d) => (
              <Link
                key={d.slug}
                href={`/legal/${d.slug}`}
                className="group flex flex-col border-b border-line p-8 transition-colors hover:bg-ivory-50 sm:odd:border-r lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <h2 className="font-serif text-xl font-medium text-navy">{d.title}</h2>
                  <IconArrowUpRight className="mt-1 text-slate-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate-muted">{d.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
