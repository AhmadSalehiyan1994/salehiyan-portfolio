import type { MetadataRoute } from "next";
import { siteContent } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteContent.person.website.replace(/\/$/, "");

  return {
    // Search access is independent of model-training policies. Every search
    // crawler gets the same exclusions for disabled and non-content routes.
    rules: [
      { userAgent: "*", disallow: ["/api/", "/admin/", "/polls"] },
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot", "Claude-SearchBot"], disallow: ["/api/", "/admin/", "/polls"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: new URL(baseUrl).host,
  };
}
