import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { formatDate, publishedArticles, readTimeMinutes } from "@/lib/articles";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Writing | Ahmad Salehiyan",
  description: "Articles by Ahmad Salehiyan on machine learning for reliability, integer programming, and maintenance management.",
  path: "/insights",
});

export default function WritingPage() {
  const articles = publishedArticles();
  return (
    <>
      <SeoJsonLd data={breadcrumbJsonLd([{ name: "Writing", path: "/insights" }])} />
      <PageHeader title="Writing" lead="Longer notes on methods I use in research: machine learning, optimization, and maintenance planning." />
      <div className="px-4 py-14 sm:px-6 md:py-16">
        <ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug} className="flex flex-col rounded-lg border border-border bg-card/50 p-6">
              <Badge variant="outline" className="w-fit">
                {article.domain}
              </Badge>
              <h2 className="mt-3 text-lg font-semibold leading-7 text-foreground">
                <Link href={`/insights/${article.slug}` as Route} className="underline-offset-4 hover:underline">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-2 text-xs text-muted-foreground">
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>. {readTimeMinutes(article)} min read.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.summary}</p>
              <Link
                href={`/insights/${article.slug}` as Route}
                aria-label={`Read article: ${article.title}`}
                className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
