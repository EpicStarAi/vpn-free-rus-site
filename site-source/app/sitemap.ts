import type { MetadataRoute } from "next";
import { guides, posts, siteConfig } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const routes = [
    "",
    "/sales",
    "/marketing",
    "/social-media",
    "/digitalization",
    "/natasha",
    "/ai-agents",
    "/epic-vpn",
    "/cases",
    "/pricing",
    "/blog",
    "/instructions",
    "/videos",
    "/about",
    "/contacts",
    "/privacy",
    "/terms",
    "/refunds",
    "/editorial-policy",
    "/disclaimer",
  ];

  return [
    ...routes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date("2026-07-30"),
      changeFrequency: route === "/blog" ? ("daily" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${base}/articles/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...guides.map((guide) => ({
      url: `${base}/instructions/${guide.slug}`,
      lastModified: new Date("2026-07-30"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
