import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, ArrowRight } from "@/components/ui/Button";

const stages = [
  {
    n: "01",
    t: "Notification",
    d: "Notice submitted using the method and deadline stated in the policy.",
  },
  {
    n: "02",
    t: "Evidence preservation",
    d: "Relevant on-chain and off-chain records preserved for review.",
  },
  {
    n: "03",
    t: "Investigation",
    d: "Technical facts, causation and policy requirements assessed.",
  },
  {
    n: "04",
    t: "Determination",
    d: "Coverage and loss evaluated under the issued policy wording.",
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
              Prompt notice and complete evidence support an effective review.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-ivory/65">
              Claim handling follows the notice, cooperation, evidence,
              valuation and other requirements in the applicable policy. Online
              notification records initial intake only.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                href="/claims/notify"
                size="lg"
                variant="gold"
                className="group"
              >
                Notify an incident
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                href="/legal/claims-procedure"
                size="lg"
                variant="secondary"
                className="group !border-ivory/25 !text-ivory hover:!border-ivory/60 hover:!bg-white/5"
              >
                Read the claims procedure
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="reveal lg:col-span-7 lg:pt-4" data-reveal-delay="120">
            <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {stages.map((stage) => (
                <li key={stage.n} className="border-t border-line-dark pt-6">
                  <span className="font-serif text-3xl font-light text-gold-light/90">
                    {stage.n}
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-ivory">
                    {stage.t}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ivory/55">
                    {stage.d}
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
