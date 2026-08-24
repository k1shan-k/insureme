import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionalPage } from "@/components/layout/InstitutionalPage";
import { getResourcePage, resourcePages } from "@/lib/institutional";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return resourcePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getResourcePage(params.slug);
  return page
    ? createPageMetadata({
        title: page.eyebrow,
        description: page.intro,
        path: `/resources/${page.slug}`,
      })
    : { title: "Page not found" };
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const page = getResourcePage(params.slug);
  if (!page) notFound();
  return <InstitutionalPage page={page} />;
}
