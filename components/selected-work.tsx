import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteContent } from "@/lib/content";

export function SelectedWork() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Selected Work</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Projects with clear operational impact</h2>
        </div>
        <Link href="/projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          All projects
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {siteContent.projects.map((project) => (
          <Card
            key={project.slug}
            className="group h-full border-border/70 bg-card/50 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/70 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/40"
          >
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="outline" className="w-fit">{project.domain}</Badge>
                <span className="text-xs text-muted-foreground">{project.timeline}</span>
              </div>
              <CardTitle className="mt-3 text-lg">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-primary">{project.impactLabel}</p>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((item) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </div>

              <Link
                href={`/projects/${project.slug}` as Route}
                className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View case details <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
