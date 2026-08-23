import { SectionLabel } from "@/components/ui/SectionLabel";
import { CoverageCard } from "@/components/ui/Cards";
import { renderIcon } from "@/components/ui/iconMap";
import { insurancePrograms } from "@/lib/programs";

export function Coverage() {
  return (
    <section
      id="coverage"
      className="scroll-mt-24 border-t border-line bg-ivory-50 py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel>Our coverage</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-serif text-display font-light text-navy">
              Coverage built around the risks that matter.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-slate-muted lg:col-span-4">
            Each line is underwritten independently against defined risk
            parameters, with limits and conditions structured to the insured
            environment.
          </p>
        </div>

        <div className="reveal mt-14 grid border-l border-r border-line sm:grid-cols-2 lg:grid-cols-3">
          {insurancePrograms.map((program) => (
            <CoverageCard
              key={program.slug}
              index={program.index}
              title={program.title}
              description={program.description}
              icon={renderIcon(program.icon, "h-7 w-7")}
              href={`/insurance/${program.slug}`}
            />
          ))}
        </div>

        <p className="reveal mt-8 max-w-3xl text-[13px] leading-relaxed text-slate-faint">
          Coverage is subject to underwriting, applicable policy terms, limits,
          deductibles, exclusions and conditions.
        </p>
      </div>
    </section>
  );
}
