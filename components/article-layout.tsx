import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, readTimeMinutes, type Article } from "@/lib/articles";
import { getProjectBySlug } from "@/lib/projects";
import { getPublication } from "@/lib/research";
import { siteContent } from "@/lib/content";

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <Link href="/insights" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All writing
      </Link>

      <header className="mt-4 grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <Badge variant="outline">{article.domain}</Badge>
          {article.draft ? <Badge className="ml-2">Draft, not published</Badge> : null}
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{article.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{article.summary}</p>
          <p className="mt-5 text-sm text-muted-foreground">
            By <Link href="/#about" rel="author" className="prose-link">{siteContent.person.name}</Link>.{" "}
            Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>. Updated{" "}
            <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>. {readTimeMinutes(article)} min read.
          </p>
        </div>
        <div className="md:col-span-4">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            width={600}
            height={400}
            className="aspect-[3/2] h-auto w-full rounded-2xl border border-border object-cover"
            sizes="(min-width: 1152px) 368px, (min-width: 768px) 32vw, 100vw"
            priority
          />
        </div>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <aside className="md:col-span-4 md:sticky md:top-24 md:self-start">
          <nav aria-label="In this article" className="rounded-lg border border-border bg-card/40 p-5">
            <h2 className="text-sm font-semibold text-foreground">In this article</h2>
            <ul className="mt-2 text-sm">
              {article.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="inline-flex min-h-11 items-center text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 rounded-lg border border-border bg-card/40 p-5">
            <h2 className="text-sm font-semibold text-foreground">Key points</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {article.takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-10 md:col-span-8">
          {article.sections.map((section) => (
            <section id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
              <h2 id={`${section.id}-heading`} className="text-2xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section aria-labelledby="related-research-heading" className="rounded-lg border border-primary/40 bg-primary/5 p-6">
            <h2 id="related-research-heading" className="text-xl font-semibold text-foreground">
              Related research
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.related.text}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              {article.related.publicationIds.map((id) => {
                const publication = getPublication(id);
                if (!publication) return null;
                return (
                  <li key={id}>
                    Paper:{" "}
                    <Link href={`/publications#${id}` as Route} className="prose-link">
                      {publication.title}
                    </Link>
                  </li>
                );
              })}
              {article.related.projectSlugs.map((slug) => {
                const project = getProjectBySlug(slug);
                if (!project) return null;
                return (
                  <li key={slug}>
                    Project:{" "}
                    <Link href={`/projects/${slug}` as Route} className="prose-link">
                      {project.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="references-heading">
            <h2 id="references-heading" className="text-xl font-semibold text-foreground">
              References
            </h2>
            <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
              {article.references.map((reference) => (
                <li key={reference.href}>
                  {reference.text}{" "}
                  <a href={reference.href} target="_blank" rel="noopener noreferrer" className="prose-link break-all">
                    {reference.href.replace(/^https?:\/\//, "")}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </article>
  );
}
