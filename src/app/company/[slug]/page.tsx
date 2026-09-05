import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalPage } from "@/components/layout/InstitutionalPage";
import { companyPages, getCompanyPage } from "@/lib/institutional";
import { createPageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return companyPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getCompanyPage(params.slug);
  return page
    ? createPageMetadata({
        title: page.eyebrow,
        description: page.intro,
        path: `/company/${page.slug}`,
        // Eyebrows that already carry the brand name are used verbatim so the
        // metadata template does not append it twice.
        absoluteTitle: page.eyebrow.includes(site.name),
      })
    : { title: "Page not found" };
}

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const page = getCompanyPage(params.slug);
  if (!page) notFound();

  const careersEmail = process.env.NEXT_PUBLIC_CAREERS_EMAIL;
  const displayPage =
    page.slug === "careers" && careersEmail
      ? {
          ...page,
          cta: {
            label: "Email Careers",
            href: `mailto:${careersEmail}?subject=Careers%20enquiry`,
          },
        }
      : page;

  return <InstitutionalPage page={displayPage} />;
}
