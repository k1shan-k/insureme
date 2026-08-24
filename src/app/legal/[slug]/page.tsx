import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { legalDocs, getLegalDoc } from "@/lib/legal";
import { IconCheck } from "@/components/ui/Icons";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return legalDocs.map((document) => ({ slug: document.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const document = getLegalDoc(params.slug);
  if (!document) return { title: "Not found" };
  return createPageMetadata({
    title: document.title,
    description: document.intro,
    path: `/legal/${document.slug}`,
  });
}

export default function LegalDocPage({ params }: { params: { slug: string } }) {
  const document = getLegalDoc(params.slug);
  if (!document) notFound();

  const coreDocs = legalDocs.filter((item) => item.category !== "transparency");
  const transparencyDocs = legalDocs.filter(
    (item) => item.category === "transparency",
  );

  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-14 pt-32 text-ivory lg:pt-40">
        <div className="container-x">
          <SectionLabel tone="light">Legal and disclosures</SectionLabel>
          <h1 className="mt-6 max-w-3xl font-serif text-display font-light text-ivory">
            {document.title}
          </h1>
          <p className="mt-5 text-[13px] uppercase tracking-label text-ivory/45">
            Last updated {document.updated}
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <LegalNavGroup
                  title="Core documents"
                  docs={coreDocs}
                  activeSlug={document.slug}
                />
                <LegalNavGroup
                  title="Transparency information"
                  docs={transparencyDocs}
                  activeSlug={document.slug}
                  className="mt-8"
                />
              </div>
            </aside>

            <article className="lg:col-span-9">
              <p className="max-w-3xl border-l-2 border-gold pl-6 text-[16px] leading-relaxed text-charcoal">
                {document.intro}
              </p>

              <div className="mt-12 space-y-12">
                {document.sections.map((section) => (
                  <div
                    key={section.heading}
                    className="max-w-3xl border-t border-line pt-8"
                  >
                    <h2 className="font-serif text-xl font-medium text-navy">
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
                    {section.list && (
                      <ul className="mt-5 space-y-2.5">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[15px] text-charcoal/85"
                          >
                            <IconCheck className="mt-1 shrink-0 text-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-16 border-t border-line pt-8">
                <p className="max-w-3xl text-[13px] leading-relaxed text-slate-faint">
                  This page is general information and does not create a
                  contract, coverage, exclusion, duty, right, or professional
                  advice. Transaction documents control insurance coverage.
                </p>
                <Link
                  href="/risk-assessment"
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-navy transition-colors hover:text-gold"
                >
                  Request an assessment →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function LegalNavGroup({
  title,
  docs,
  activeSlug,
  className = "",
}: {
  title: string;
  docs: typeof legalDocs;
  activeSlug: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-[11px] font-medium uppercase tracking-label text-slate-faint">
        {title}
      </h2>
      <nav className="mt-5 flex flex-col gap-1">
        {docs.map((item) => (
          <Link
            key={item.slug}
            href={`/legal/${item.slug}`}
            className={`border-l-2 py-2 pl-4 text-[14px] transition-colors ${
              item.slug === activeSlug
                ? "border-gold text-navy"
                : "border-line text-slate-muted hover:border-navy/40 hover:text-navy"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
