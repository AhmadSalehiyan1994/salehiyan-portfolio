"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/lib/content";

export function ProjectList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState<"default" | "title-asc">("default");

  const domains = useMemo(
    () => ["All", ...new Set(siteContent.projects.map((project) => project.domain))],
    [],
  );

  const tags = useMemo(
    () => ["All", ...new Set(siteContent.projects.flatMap((project) => project.stack))],
    [],
  );

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const d = searchParams.get("domain") || "All";
    const t = searchParams.get("tag") || "All";
    const s = (searchParams.get("sort") || "default") as "default" | "title-asc";

    setQuery(q);
    setDomain(domains.includes(d) ? d : "All");
    setTag(tags.includes(t) ? t : "All");
    setSort(s === "title-asc" ? "title-asc" : "default");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (domain !== "All") params.set("domain", domain);
    if (tag !== "All") params.set("tag", tag);
    if (sort !== "default") params.set("sort", sort);

    const next = params.toString();
    const current = searchParams.toString();

    if (next === current) {
      return;
    }

    const url = (next ? `${pathname}?${next}` : pathname) as unknown as string;
    router.replace(url as never, { scroll: false });
  }, [domain, pathname, query, router, searchParams, sort, tag]);

  const filteredProjects = useMemo(
    () => {
      const filtered = siteContent.projects.filter((project) => {
        const matchesQuery =
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.stack.join(" ").toLowerCase().includes(query.toLowerCase());

        const matchesDomain = domain === "All" || project.domain === domain;
        const matchesTag = tag === "All" || project.stack.includes(tag);

        return matchesQuery && matchesDomain && matchesTag;
      });

      if (sort === "title-asc") {
        return filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
      }

      return filtered;
    },
    [domain, query, sort, tag],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search projects..."
          className="md:col-span-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Search projects"
        />
        <select
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Filter projects by domain"
        >
          {domains.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={tag}
          onChange={(event) => setTag(event.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Filter projects by tool or method (technical)"
        >
          {tags.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All tools/methods (technical)" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Showing {filteredProjects.length} projects</p>
        <select
          value={sort}
          onChange={(event) => setSort((event.target.value as "default" | "title-asc") || "default")}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Sort projects"
        >
          <option value="default">Default order</option>
          <option value="title-asc">Title (A–Z)</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.slug} className="h-full border-border/70 bg-card/50 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/70 hover:shadow-lg">
            <CardHeader>
              <Badge variant="outline" className="w-fit">{project.domain}</Badge>
              <CardTitle className="mt-2">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">{project.impactLabel}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Method:</span>{" "}
                  <span className="line-clamp-2">{project.role}</span>
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Result:</span>{" "}
                  <span className="line-clamp-2">{project.outcome}</span>
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((item) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </div>

              <Link href={`/projects/${project.slug}` as Route} className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
                Read case overview <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
