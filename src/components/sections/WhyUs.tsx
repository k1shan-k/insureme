import { SectionLabel } from "@/components/ui/SectionLabel";
import { PillarCard } from "@/components/ui/Cards";
import { renderIcon } from "@/components/ui/iconMap";
import { pillars } from "@/lib/content";

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="scroll-mt-24 border-t border-line bg-ivory-50 py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <SectionLabel>Operating principles</SectionLabel>
          <h2 className="mt-7 font-serif text-display font-light text-navy">
            Clear evidence, policy boundaries and decision records.
          </h2>
        </div>

        <div className="reveal mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <PillarCard
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              icon={renderIcon(pillar.icon, "h-7 w-7")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
