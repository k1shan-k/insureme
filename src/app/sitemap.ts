import type { MetadataRoute } from "next";
import { legalDocs } from "@/lib/legal";
import { insurancePrograms } from "@/lib/programs";
import { companyPages, resourcePages } from "@/lib/institutional";
import { siteUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/risk-assessment",
    "/claims/notify",
    "/insurance",
    "/resources",
    "/legal",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const programRoutes = insurancePrograms.map((program) => ({
    url: `${siteUrl}/insurance/${program.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const companyRoutes = companyPages.map((page) => ({
    url: `${siteUrl}/company/${page.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const resourceRoutes = resourcePages.map((page) => ({
    url: `${siteUrl}/resources/${page.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalRoutes = legalDocs.map((doc) => ({
    url: `${siteUrl}/legal/${doc.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...programRoutes,
    ...companyRoutes,
    ...resourceRoutes,
    ...legalRoutes,
  ];
}
