import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { renderIcon } from "@/components/ui/iconMap";
import { Button, ArrowRight } from "@/components/ui/Button";
import { insurancePrograms } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Insurance Programs",
  description:
    "Explore Meridian Risk insurance programs for smart contracts, protocol exploits, cross-chain infrastructure, stablecoins, treasuries and custom architectures.",
};

export default function InsuranceIndexPage() {
  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-16 pt-32 text-ivory lg:pb-24 lg:pt-40">
        <div className="container-x">
          <SectionLabel tone="light">Insurance programs</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-serif text-display font-light text-ivory">
            Defined coverage for the architecture of on-chain risk.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
            Each program is independently underwritten and documented around
            scheduled assets, systems, triggers and controls. Availability and
            final terms depend on the insured risk.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid border-l border-r border-line sm:grid-cols-2 lg:grid-cols-3">
            {insurancePrograms.map((program) => (
              <Link
                key={program.slug}
                href={`/insurance/${program.slug}`}
                className="group relative flex min-h-[330px] flex-col border-b border-t border-line p-8 transition-colors hover:bg-ivory-50 lg:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-sm text-slate-faint">
                    {program.index}
                  </span>
                  <span className="text-navy transition-colors group-hover:text-gold">
                    {renderIcon(program.icon, "h-7 w-7")}
                  </span>
                </div>
                <h2 className="mt-8 font-serif text-2xl font-medium text-navy">
                  {program.title}
                </h2>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-muted">
                  {program.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-navy group-hover:text-gold">
                  Review program and indicative terms
                  <IconArrowUpRight />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-line pt-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="font-serif text-3xl font-light text-navy">
                Not sure which program fits?
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-muted">
                Begin with a protocol assessment. Our underwriting team will map
                your architecture and requested protection to the most
                appropriate available structure.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Button
                href="/risk-assessment"
                variant="primary"
                size="lg"
                className="group"
              >
                Get a Risk Assessment
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
