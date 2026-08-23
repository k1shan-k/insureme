import type { MetadataRoute } from "next";
import { legalDocs } from "@/lib/legal";

const BASE = "https://meridianrisk.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/risk-assessment", "/legal"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const legalRoutes = legalDocs.map((d) => ({
    url: `${BASE}/legal/${d.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...legalRoutes];
}
