import { Button, ArrowRight } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ivory py-28 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(169,133,47,0.07),transparent_62%)]"
      />
      <div className="container-x relative">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-display font-light text-navy">
            Request a preliminary underwriting review.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-muted">
            Provide initial information about the organization, architecture,
            controls and coverage to be considered. Submission does not create
            coverage or an obligation to offer terms.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href="/risk-assessment"
              size="lg"
              variant="primary"
              className="group"
            >
              Request an assessment
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="/insurance" size="lg" variant="secondary">
              View coverage areas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
