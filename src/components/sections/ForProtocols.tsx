import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, ArrowRight } from "@/components/ui/Button";
import { audiences } from "@/lib/content";

export function ForProtocols() {
  return (
    <section
      id="for-protocols"
      className="scroll-mt-24 bg-ivory py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionLabel>Who we serve</SectionLabel>
            <h2 className="mt-7 font-serif text-display font-light text-navy">
              Coverage for organizations managing on-chain operational and
              financial risk.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-slate-muted">
              Underwriting begins with the organization, systems, assets,
              dependencies and controls presented for review. Eligibility and
              available structures vary by risk and jurisdiction.
            </p>
            <div className="mt-9">
              <Button
                href="/risk-assessment"
                size="lg"
                variant="primary"
                className="group"
              >
                Request a preliminary assessment
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="reveal lg:col-span-7" data-reveal-delay="120">
            <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
              {audiences.map((audience, index) => (
                <div
                  key={audience}
                  className={`group flex items-center justify-between border-b border-line px-2 py-5 transition-colors hover:px-4 ${
                    index % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6"
                  }`}
                >
                  <span className="font-serif text-lg text-navy">
                    {audience}
                  </span>
                  <span className="font-serif text-sm text-slate-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
