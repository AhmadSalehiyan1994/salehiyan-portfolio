import type { MetadataRoute } from "next";
import { lastUpdated, siteContent } from "@/lib/content";
import { publishedArticles } from "@/lib/articles";
import { projects } from "@/lib/projects";

const baseUrl = siteContent.person.website.replace(/\/$/, "");

// Public pages only. Drafts, redirects, and removed pages are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/research",
    "/publications",
    "/projects",
    ...projects.map((project) => `/projects/${project.slug}`),
    "/teaching",
    "/insights",
    ...publishedArticles().map((article) => `/insights/${article.slug}`),
    "/cv",
    "/contact",
    "/legal/privacy",
  ];

  return routes.map((route) => ({
    url: route === "/" ? `${baseUrl}/` : `${baseUrl}${route}`,
    lastModified: new Date(`${publishedArticles().find((article) => route === `/insights/${article.slug}`)?.updatedAt || lastUpdated}T00:00:00Z`),
    changeFrequency: route.startsWith("/insights/") || route === "/legal/privacy" ? "yearly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
