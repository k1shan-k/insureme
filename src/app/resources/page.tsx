import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { resourcePages } from "@/lib/institutional";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Resources",
  description:
    "General information about risk topics, research inputs, reporting, program overviews, claims guidance, and disclosures for digital-asset protocols and infrastructure.",
  path: "/resources",
});

const documentation = [
  {
    title: "Insurance programs",
    href: "/insurance",
    description: "Non-binding program and coverage-consideration summaries.",
  },
  {
    title: "Legal and disclosures",
    href: "/legal",
    description:
      "Website terms, privacy information, coverage documentation, and risk disclosures.",
  },
  {
    title: "Claims procedure",
    href: "/legal/claims-procedure",
    description:
      "General notice and evidence guidance; issued documentation controls.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="border-b border-line bg-navy-900 pb-16 pt-32 text-ivory lg:pb-24 lg:pt-40">
        <div className="container-x">
          <SectionLabel tone="light">Resources</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-serif text-display font-light text-ivory">
            Reference information for risk review
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/65">
            General information about assessment inputs, protocol risk, and
            documentation. These resources are not underwriting decisions or
            transaction terms.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-x">
          <div className="grid border-l border-r border-t border-line lg:grid-cols-3">
            {resourcePages.map((page) => (
              <ResourceCard
                key={page.slug}
                title={page.eyebrow}
                description={page.intro}
                href={`/resources/${page.slug}`}
              />
            ))}
          </div>

          <div className="mt-20">
            <SectionLabel>Documentation</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl font-light text-navy">
              Program and disclosure reference
            </h2>
            <div className="mt-10 grid border-l border-r border-t border-line lg:grid-cols-3">
              {documentation.map((item) => (
                <ResourceCard key={item.href} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[240px] flex-col border-b border-line p-8 transition-colors hover:bg-ivory-50 lg:p-10"
    >
      <div className="flex items-start justify-between gap-6">
        <h2 className="font-serif text-2xl font-medium text-navy">{title}</h2>
        <IconArrowUpRight className="shrink-0 text-slate-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
      </div>
      <p className="mt-4 text-[14.5px] leading-relaxed text-slate-muted">
        {description}
      </p>
      <span className="mt-auto pt-8 text-[13px] font-medium text-navy group-hover:text-gold">
        Open resource →
      </span>
    </Link>
  );
}
