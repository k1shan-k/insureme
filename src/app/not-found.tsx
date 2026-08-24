import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory pt-24">
      <div className="container-x">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-serif text-7xl font-light text-gold">404</span>
          <h1 className="mt-6 font-serif text-3xl font-light text-navy">
            Page not found
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-muted">
            The requested page is unavailable. Use the links below to return to
            general information or request a preliminary underwriting review.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" variant="primary">
              Return home
            </Button>
            <Button href="/risk-assessment" variant="secondary">
              Request an assessment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
