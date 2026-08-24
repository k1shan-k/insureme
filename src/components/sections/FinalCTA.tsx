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
            Request a manual underwriting review.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-muted">
            Provide organization, architecture, controls and requested coverage
            for manual underwriting review. A human underwriter will review a
            complete submission and send the assessment and quotation within 24
            hours. If more information is required, the submitter will receive a
            status update within that period. No automated score is produced.
            Any quotation remains subject to underwriting and authorized
            transaction documents and does not bind coverage.
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
