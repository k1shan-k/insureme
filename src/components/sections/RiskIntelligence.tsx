import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconCheck } from "@/components/ui/Icons";
import { assessmentAreas, riskInputs } from "@/lib/content";

export function RiskIntelligence() {
  return (
    <section
      id="risk-intelligence"
      className="scroll-mt-24 border-t border-line bg-ivory py-24 lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionLabel>Underwriting approach</SectionLabel>
            <h2 className="mt-7 font-serif text-display font-light text-navy">
              Risk decisions require evidence and documented judgment.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-slate-muted">
              Underwriting considers technical, economic, governance and
              operational information in the context of the requested coverage.
              No online score determines eligibility or policy terms.
            </p>

            <ul className="mt-9 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {riskInputs.map((input) => (
                <li
                  key={input}
                  className="flex items-start gap-2.5 text-[14px] text-charcoal/80"
                >
                  <IconCheck className="mt-0.5 shrink-0 text-gold" />
                  {input}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal lg:col-span-7" data-reveal-delay="120">
            <div className="border border-line bg-white shadow-[0_30px_80px_-40px_rgba(10,31,54,0.35)]">
              <div className="flex items-center justify-between border-b border-line bg-ivory-50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-[11px] font-medium uppercase tracking-label text-navy">
                    Assessment framework
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-label text-slate-faint">
                  Human review required
                </span>
              </div>

              <div className="divide-y divide-line">
                {assessmentAreas.map((area, index) => (
                  <div
                    key={area.label}
                    className="grid gap-3 px-7 py-5 sm:grid-cols-[2.5rem_1fr] sm:px-9"
                  >
                    <span className="font-serif text-sm text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-navy">
                        {area.label}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-muted">
                        {area.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 divide-x divide-line border-t border-line text-center">
                {[
                  "Evidence reviewed",
                  "Scope defined",
                  "Decision documented",
                ].map((label) => (
                  <div key={label} className="px-4 py-5">
                    <div className="text-[10px] uppercase tracking-[0.1em] text-slate-faint">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-slate-faint">
              The relevance and weighting of each factor depend on the risk,
              available evidence and requested policy structure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
