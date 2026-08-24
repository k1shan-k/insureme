import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconAlert } from "@/components/ui/Icons";
import { materialChangeExamples } from "@/lib/content";

export function Monitoring() {
  return (
    <section className="border-t border-line bg-ivory-50 py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionLabel>Issued documentation</SectionLabel>
            <h2 className="mt-7 font-serif text-display font-light text-navy">
              Changes to compare with issued documentation
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-slate-muted">
              Architecture, governance, liquidity and dependencies can change
              during a policy period. A change may require notice, approval, or
              other action only where the applicable transaction documents say
              so.
            </p>
          </div>

          <div className="reveal lg:col-span-7" data-reveal-delay="120">
            <div className="border border-line bg-navy-950">
              <div className="flex items-center justify-between border-b border-line-dark px-6 py-4">
                <span className="text-[11px] font-medium uppercase tracking-label text-gold-light">
                  Examples to compare
                </span>
                <span className="text-[10px] uppercase tracking-label text-ivory/40">
                  Transaction documents control
                </span>
              </div>

              <ul className="divide-y divide-line-dark">
                {materialChangeExamples.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center justify-between gap-4 px-6 py-5"
                  >
                    <div className="flex items-center gap-4">
                      <IconAlert className="shrink-0 text-gold-light" />
                      <div>
                        <p className="text-[14.5px] text-ivory/90">
                          {item.text}
                        </p>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-ivory/40">
                          {item.tag}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 border border-gold/30 bg-gold/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-gold">
                      Review
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-slate-faint">
              These examples are general. Applicable transaction documents
              determine whether a change requires notice, approval, consent, or
              other action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
