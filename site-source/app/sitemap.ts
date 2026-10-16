import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/privacy", "/terms", "/refunds"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-09-28"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.5,
  }));
}
