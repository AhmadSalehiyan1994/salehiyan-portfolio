import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PublicationArticle } from "@/lib/publications";

type PublicationArticleLayoutProps = {
  article: PublicationArticle;
};

export function PublicationArticleLayout({ article }: PublicationArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Link href="/insights" className="hover-glow-effect hover-elevate inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Insights
      </Link>

      <header className="mt-6 grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <Badge variant="outline">{article.domain}</Badge>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{article.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{article.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Published {article.publishedAt}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {article.readTime}</span>
            <span>Updated {article.updatedAt}</span>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
            <Image
              src={article.heroImage}
              alt={article.heroImageAlt}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              sizes="(min-width: 768px) 35vw, 100vw"
              priority
            />
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-12">
        <aside className="md:col-span-4 md:sticky md:top-24 md:self-start">
          <Card className="bg-card/40">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">In This Article</p>
              <ul className="mt-4 space-y-2 text-sm">
                {article.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-muted-foreground transition hover:text-foreground">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-4 bg-card/40">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Key Takeaways</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway} className="rounded-md border border-border/70 bg-background/40 px-3 py-2">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>

        <div className="md:col-span-8 space-y-8">
          {article.sections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-24 rounded-xl border border-border bg-card/30 p-5 md:p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="text-xl font-semibold text-foreground">Need this translated into your operation?</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              If you&apos;re planning reliability analytics, optimization workflows, or maintenance transformation, I can help you convert these frameworks into a decision-ready implementation plan.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/#contact" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                Start a Discussion
              </Link>
              <Link href="/insights" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium text-foreground transition hover:text-primary">
                Explore More Articles <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </article>
  );
}
