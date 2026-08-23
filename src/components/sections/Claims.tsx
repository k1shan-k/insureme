import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, ArrowRight } from "@/components/ui/Button";

const stages = [
  {
    n: "01",
    t: "Notification",
    d: "Structured incident notification and initial intake.",
  },
  {
    n: "02",
    t: "Preservation",
    d: "Guidance on preserving on-chain and off-chain evidence.",
  },
  {
    n: "03",
    t: "Investigation",
    d: "Technical and factual review against policy terms.",
  },
  {
    n: "04",
    t: "Resolution",
    d: "Loss assessment and determination under the policy.",
  },
];

export function Claims() {
  return (
    <section
      id="claims"
      className="scroll-mt-24 border-t border-line bg-navy-900 py-24 text-ivory lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionLabel tone="light">Claims</SectionLabel>
            <h2 className="mt-7 font-serif text-display font-light text-ivory">
              When incidents happen, clarity matters.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-ivory/65">
              Our claims framework is designed to provide a structured process
              for incident notification, evidence preservation, investigation,
              loss assessment and resolution.
            </p>
            <div className="mt-9">
              <Button
                href="/legal/claims-procedure"
                size="lg"
                variant="gold"
                className="group"
              >
                Understand the Claims Process
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="reveal lg:col-span-7 lg:pt-4" data-reveal-delay="120">
            <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {stages.map((s) => (
                <li key={s.n} className="border-t border-line-dark pt-6">
                  <span className="font-serif text-3xl font-light text-gold-light/90">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-ivory">{s.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ivory/55">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
