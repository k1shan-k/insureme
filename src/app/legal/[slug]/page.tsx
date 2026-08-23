import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { legalDocs, getLegalDoc } from "@/lib/legal";
import { IconCheck } from "@/components/ui/Icons";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doc = getLegalDoc(params.slug);
  if (!doc) return { title: "Not found" };
  return {
    title: doc.title,
    description: doc.intro,
  };
}

export default function LegalDocPage({ params }: { params: { slug: string } }) {
  const doc = getLegalDoc(params.slug);
  if (!doc) notFound();

  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-14 pt-32 text-ivory lg:pt-40">
        <div className="container-x">
          <SectionLabel tone="light">Legal &amp; policy</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-serif text-display font-light text-ivory">
            {doc.title}
          </h1>
          <p className="mt-5 text-[13px] uppercase tracking-label text-ivory/45">
            Last updated {doc.updated}
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-[11px] font-medium uppercase tracking-label text-slate-faint">
                  Legal Documents
                </h2>
                <nav className="mt-5 flex flex-col gap-1">
                  {legalDocs.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/legal/${d.slug}`}
                      className={`border-l-2 py-2 pl-4 text-[14px] transition-colors ${
                        d.slug === doc.slug
                          ? "border-gold text-navy"
                          : "border-line text-slate-muted hover:border-navy/40 hover:text-navy"
                      }`}
                    >
                      {d.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <article className="lg:col-span-9">
              <p className="max-w-3xl border-l-2 border-gold pl-6 text-[16px] leading-relaxed text-charcoal">
                {doc.intro}
              </p>

              <div className="mt-12 space-y-12">
                {doc.sections.map((s) => (
                  <div key={s.heading} className="max-w-3xl border-t border-line pt-8">
                    <h3 className="font-serif text-xl font-medium text-navy">{s.heading}</h3>
                    {s.paragraphs.map((p, i) => (
                      <p key={i} className="mt-4 text-[15.5px] leading-relaxed text-slate-muted">
                        {p}
                      </p>
                    ))}
                    {s.list && (
                      <ul className="mt-5 space-y-2.5">
                        {s.list.map((li) => (
                          <li key={li} className="flex items-start gap-3 text-[15px] text-charcoal/85">
                            <IconCheck className="mt-1 shrink-0 text-gold" />
                            {li}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-16 border-t border-line pt-8">
                <p className="max-w-3xl text-[13px] leading-relaxed text-slate-faint">
                  This page is provided for general information and does not constitute legal advice
                  or a contract. Insurance products and coverage are subject to applicable policy
                  terms, conditions, limitations and exclusions. In the event of any inconsistency,
                  the issued policy documentation prevails.
                </p>
                <Link
                  href="/risk-assessment"
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-navy transition-colors hover:text-gold"
                >
                  Begin a risk assessment →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
