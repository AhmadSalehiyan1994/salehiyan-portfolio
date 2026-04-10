"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type InsightItem = {
  slug: string;
  title: string;
  domain: string;
  description: string;
  status: "published" | "draft";
  featured: boolean;
  publishedAt?: string;
};

type InsightsCatalogProps = {
  insights: InsightItem[];
};

export function InsightsCatalog({ insights }: InsightsCatalogProps) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [isFiltering, setIsFiltering] = useState(false);

  const domains = useMemo(
    () => ["All", "Machine Learning", "Optimization", "Reliability & Operations"],
    [],
  );

  useEffect(() => {
    setIsFiltering(true);
    const timeout = window.setTimeout(() => setIsFiltering(false), 180);
    return () => window.clearTimeout(timeout);
  }, [domain, query]);

  const filtered = useMemo(
    () =>
      insights.filter((item) => {
        const matchesQuery =
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase());
        const matchesDomain = domain === "All" || item.domain === domain;
        return matchesQuery && matchesDomain;
      }),
    [domain, insights, query],
  );

  const published = filtered
    .filter((item) => item.status === "published")
    .slice()
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  const featuredInsights = published.filter((item) => item.featured);
  const otherPublishedInsights = published.filter((item) => !item.featured);
  const draftInsights = filtered.filter((item) => item.status === "draft");

  return (
    <>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
          placeholder="Search articles..."
          className="md:col-span-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Search insights"
        />
        <div className="flex items-center text-sm text-muted-foreground">Filter by category</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {domains.map((item) => {
          const active = domain === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setDomain(item)}
              className="rounded-md border px-3 py-2 text-sm transition-all duration-200"
              style={
                active
                  ? {
                      backgroundColor: "#AF423A",
                      borderColor: "#AF423A",
                      color: "#FFFFFF",
                    }
                  : undefined
              }
              aria-pressed={active}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-muted-foreground" role="status" aria-live="polite">
        Showing {filtered.length} item{filtered.length === 1 ? "" : "s"}
        {domain !== "All" ? ` in ${domain}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}.
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-md border border-border bg-card/50 p-4 text-sm text-muted-foreground">
          No articles match your current filters. Try another keyword or category.
        </div>
      ) : null}

      {/* Featured Articles */}
      <div className={`mt-12 transition-opacity duration-200 ${isFiltering ? "opacity-70" : "opacity-100"}`}>
        <h2 className="mb-6 text-lg font-semibold text-foreground">Featured Articles</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredInsights.map((insight) => (
            <Link key={insight.slug} href={`/insights/${insight.slug}` as Route} className="group">
                <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-md">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      {insight.domain}
                    </Badge>
                    <CardTitle className="mt-2 text-lg">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <CardDescription className="text-sm text-muted-foreground">{insight.description}</CardDescription>
                    <span className="inline-flex items-center gap-1 text-sm text-primary">
                      Read article <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
          ))}
        </div>
      </div>

      {otherPublishedInsights.length > 0 && (
        <div className={`mt-12 transition-opacity duration-200 ${isFiltering ? "opacity-70" : "opacity-100"}`}>
          <h2 className="mb-6 text-lg font-semibold text-foreground">More Articles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {otherPublishedInsights.map((insight) => (
              <Link key={insight.slug} href={`/insights/${insight.slug}` as Route} className="group">
                <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-md">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      {insight.domain}
                    </Badge>
                    <CardTitle className="mt-2 text-lg">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <CardDescription className="text-sm text-muted-foreground">{insight.description}</CardDescription>
                    <span className="inline-flex items-center gap-1 text-sm text-primary">
                      Read article <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {draftInsights.length > 0 && (
        <div className={`mt-12 transition-opacity duration-200 ${isFiltering ? "opacity-70" : "opacity-100"}`}>
          <h2 className="mb-6 text-lg font-semibold text-foreground">Coming Soon</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {draftInsights.map((topic) => (
              <div
                key={topic.slug}
                className="rounded-md border border-border bg-card/50 p-4 transition-colors hover:bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{topic.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{topic.domain}</p>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    Coming soon
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
