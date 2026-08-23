import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconAlert } from "@/components/ui/Icons";
import { monitoringAlerts } from "@/lib/content";

const severityTone: Record<string, string> = {
  Material: "text-[#B5623A] border-[#B5623A]/30 bg-[#B5623A]/[0.06]",
  Elevated: "text-gold border-gold/30 bg-gold/[0.06]",
  Moderate: "text-slate-muted border-line bg-ivory-50",
};

export function Monitoring() {
  return (
    <section className="border-t border-line bg-ivory-50 py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionLabel>Continuous monitoring</SectionLabel>
            <h2 className="mt-7 font-serif text-display font-light text-navy">
              Risk evolves. Underwriting should too.
            </h2>
            <p className="mt-7 max-w-md text-[16px] leading-relaxed text-slate-muted">
              Protocol architecture, governance, liquidity and dependencies can change after a
              policy is issued. Our risk intelligence framework is designed to help identify
              material changes across the insured environment.
            </p>
          </div>

          <div className="reveal lg:col-span-7" data-reveal-delay="120">
            <div className="border border-line bg-navy-950">
              <div className="flex items-center justify-between border-b border-line-dark px-6 py-4">
                <span className="text-[11px] font-medium uppercase tracking-label text-gold-light">
                  Risk Change Monitor
                </span>
                <span className="font-mono text-[11px] text-ivory/40">Last sync · 00:03 UTC</span>
              </div>

              <ul className="divide-y divide-line-dark">
                {monitoringAlerts.map((a) => (
                  <li
                    key={a.text}
                    className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4">
                      <IconAlert className="shrink-0 text-gold-light" />
                      <div>
                        <p className="text-[14.5px] text-ivory/90">{a.text}</p>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-ivory/40">
                          {a.tag}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] ${severityTone[a.severity]}`}
                    >
                      {a.severity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-[12px] text-slate-faint">
              Monitoring signals are informational and do not constitute a determination of
              coverage, breach or claim outcome.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
