import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button, ArrowRight } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import type { InstitutionalPage as InstitutionalPageData } from "@/lib/institutional";

export function InstitutionalPage({ page }: { page: InstitutionalPageData }) {
  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-16 pt-32 text-ivory lg:pb-24 lg:pt-40">
        <div className="container-x">
          <SectionLabel tone="light">{page.eyebrow}</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-serif text-display font-light text-ivory">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
            {page.intro}
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <div className="border-t border-line pt-6 lg:sticky lg:top-28">
                <p className="text-[11px] font-medium uppercase tracking-label text-slate-faint">
                  Institutional information
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-slate-muted">
                  General information only. Issued policy wording and applicable
                  law control where relevant.
                </p>
              </div>
            </aside>
            <article className="lg:col-span-9">
              <div className="max-w-3xl space-y-12">
                {page.sections.map((section, index) => (
                  <section
                    key={section.heading}
                    className="border-t border-line pt-8"
                  >
                    <div className="flex gap-5">
                      <span className="mt-1 font-serif text-sm text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="font-serif text-2xl font-medium text-navy">
                          {section.heading}
                        </h2>
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="mt-4 text-[15.5px] leading-relaxed text-slate-muted"
                          >
                            {paragraph}
                          </p>
                        ))}
                        {section.items && (
                          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {section.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-[14.5px] text-charcoal/85"
                              >
                                <IconCheck className="mt-0.5 shrink-0 text-gold" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-16 border-t border-line pt-8">
                <Button
                  href={page.cta.href}
                  variant="primary"
                  className="group"
                >
                  {page.cta.label}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
