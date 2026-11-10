import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card/50 p-6 transition-colors hover:border-primary/50">
      <Badge variant="outline" className="w-fit">
        {project.domain}
      </Badge>
      <Heading className="mt-3 text-lg font-semibold leading-7 text-foreground">
        <Link href={`/projects/${project.slug}` as Route} className="underline-offset-4 hover:underline">
          {project.title}
        </Link>
      </Heading>
      <p className="mt-3 text-sm font-medium leading-6 text-foreground">{project.result}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.problem}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
      <Link
        href={`/projects/${project.slug}` as Route}
        aria-label={`Read the project page: ${project.title}`}
        className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Project page <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
