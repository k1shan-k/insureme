import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: "/" | `/${string}`;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: path,
    },
  };
}
