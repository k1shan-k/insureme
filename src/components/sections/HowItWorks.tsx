import { SectionLabel } from "@/components/ui/SectionLabel";
import { StepCard } from "@/components/ui/Cards";
import { Button, ArrowRight } from "@/components/ui/Button";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="bg-navy-900 py-24 text-ivory lg:py-32">
      <div className="container-x">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel tone="light">Underwriting process</SectionLabel>
            <h2 className="mt-7 max-w-2xl font-serif text-display font-light text-ivory">
              From initial information to an underwriting decision.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button href="/risk-assessment" variant="gold" className="group">
              Request a preliminary assessment
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="reveal mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
