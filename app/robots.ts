import type { MetadataRoute } from "next";
import { siteContent } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteContent.person.website.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: new URL(baseUrl).host,
  };
}
