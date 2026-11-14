import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectFigure } from "@/components/project-figure";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { siteContent, lastUpdated } from "@/lib/content";
import { getProjectBySlug, projects } from "@/lib/projects";
import { breadcrumbJsonLd, pageMetadata, projectJsonLd } from "@/lib/seo";

type ProjectDetailPageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Page not found | Ahmad Salehiyan" };
  return pageMetadata({
    title: `${project.shortTitle} | Ahmad Salehiyan`,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

function isExternal(href: string) {
  return href.startsWith("http");
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const h2 = "text-xl font-semibold tracking-tight text-foreground";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <SeoJsonLd
        data={[breadcrumbJsonLd([
          { name: "Projects", path: "/projects" },
          { name: project.shortTitle, path: `/projects/${project.slug}` },
        ]), projectJsonLd(project)]}
      />
      <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
      </Link>

      <header className="mt-4">
        <Badge variant="outline">{project.domain}</Badge>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{project.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{project.status}</p>
        <p className="mt-3 text-sm text-muted-foreground">By <Link href="/" className="prose-link">{siteContent.person.name}</Link> · {siteContent.person.affiliation} · Updated <time dateTime={lastUpdated}>{lastUpdated}</time></p>
      </header>

      <section aria-labelledby="result-heading" className="mt-8 rounded-lg border border-primary/50 bg-primary/5 p-6">
        <h2 id="result-heading" className="text-sm font-semibold uppercase tracking-wide text-primary">
          Result
        </h2>
        <p className="mt-2 text-lg font-medium leading-8 text-foreground">{project.result}</p>
      </section>

      <section aria-labelledby="problem-heading" className="mt-10">
        <h2 id="problem-heading" className={h2}>
          Problem
        </h2>
        <p className="mt-3 text-base leading-8 text-muted-foreground">{project.problem}</p>
      </section>

      <section aria-labelledby="method-heading" className="mt-10">
        <h2 id="method-heading" className={h2}>
          Method
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-8 text-muted-foreground">
          {project.method.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      {project.explanation ? (
        <section aria-labelledby="explanation-heading" className="mt-10">
          <h2 id="explanation-heading" className={h2}>How the approach works</h2>
          <div className="mt-3 space-y-4 text-base leading-8 text-muted-foreground">
            {project.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="figure-heading" className="mt-10">
        <h2 id="figure-heading" className={h2}>
          Diagram
        </h2>
        <div className="mt-4 rounded-lg border border-border bg-background p-4 sm:p-6">
          <ProjectFigure figure={project.figure} alt={project.figureAlt} caption={project.figureCaption} id={`${project.slug}-figure`} />
        </div>
      </section>

      <section aria-labelledby="stack-heading" className="mt-10">
        <h2 id="stack-heading" className={h2}>
          Tech stack
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="role-heading" className="mt-10">
        <h2 id="role-heading" className={h2}>
          My role
        </h2>
        <p className="mt-3 text-base leading-8 text-muted-foreground">{project.role}</p>
      </section>

      {project.limitations ? (
        <section aria-labelledby="limitations-heading" className="mt-10">
          <h2 id="limitations-heading" className={h2}>Scope and limitations</h2>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">
            {project.limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      ) : null}
      {project.questions ? (
        <section aria-labelledby="questions-heading" className="mt-10">
          <h2 id="questions-heading" className={h2}>Research questions, explained</h2>
          <dl className="mt-4 space-y-6">
            {project.questions.map((item) => <div key={item.question}>
              <dt className="font-semibold text-foreground">{item.question}</dt>
              <dd className="mt-2 text-base leading-8 text-muted-foreground">{item.answer}</dd>
            </div>)}
          </dl>
        </section>
      ) : null}
      {project.related ? (
        <section aria-labelledby="related-heading" className="mt-10">
          <h2 id="related-heading" className={h2}>Related research</h2>
          <ul className="mt-3 space-y-3">
            {project.related.map((slug) => { const related = getProjectBySlug(slug); return related ? <li key={slug}>
              <Link className="prose-link inline-flex min-h-11 items-center" href={`/projects/${slug}` as Route}>{related.title}</Link>
            </li> : null; })}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="links-heading" className="mt-10">
        <h2 id="links-heading" className={h2}>
          Links
        </h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <li key={link.href}>
              {isExternal(link.href) ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={link.href as Route}
                  className="inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {project.note ? <p className="mt-5 rounded-md border border-border bg-card/50 p-4 text-sm leading-7 text-muted-foreground">{project.note}</p> : null}
      </section>
    </article>
  );
}
