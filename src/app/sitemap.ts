import type { MetadataRoute } from "next";
import { legalDocs } from "@/lib/legal";
import { insurancePrograms } from "@/lib/programs";
import { companyPages, resourcePages } from "@/lib/institutional";

const BASE = "https://meridianrisk.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/risk-assessment",
    "/claims/notify",
    "/insurance",
    "/resources",
    "/legal",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const programRoutes = insurancePrograms.map((program) => ({
    url: `${BASE}/insurance/${program.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const companyRoutes = companyPages.map((page) => ({
    url: `${BASE}/company/${page.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const resourceRoutes = resourcePages.map((page) => ({
    url: `${BASE}/resources/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalRoutes = legalDocs.map((doc) => ({
    url: `${BASE}/legal/${doc.slug}`,
    lastModified: now,
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
