import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { articles, getArticle } from "@/lib/articles";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { siteContent } from "@/lib/content";

type ArticlePageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

// Short titles keep the page title under 60 characters.
const shortTitles: Record<string, string> = {
  "machine-learning": "Machine Learning for Reliability",
  "integer-programming": "Integer Programming for Planning",
  "maintenance-management": "Maintenance Management Systems",
  "transformer-gan-autoencoder-intrusion-detection": "Transformer, GAN, and Autoencoder IDS",
  "attack-detection-as-a-decision-problem": "Attack Detection as a Decision Problem",
};

const descriptions: Record<string, string> = {
  "machine-learning": "A practical guide to supervised, unsupervised, and reinforcement learning in reliability work, with references.",
  "integer-programming": "Integer programming formulations and classical methods for planning, allocation, and scheduling, with references.",
  "maintenance-management": "How to build maintenance systems around service level, work-order quality, and CMMS use, with references.",
  "transformer-gan-autoencoder-intrusion-detection": "Draft. What a Transformer, a GAN, and an autoencoder each do in a hybrid intrusion detection model for IIoT systems.",
  "attack-detection-as-a-decision-problem": "Draft. False data injection detection in smart water systems with a Transformer encoder and a reinforcement learning agent.",
};

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "Page not found | Ahmad Salehiyan" };
  return pageMetadata({
    title: `${shortTitles[article.slug] || article.title} | Ahmad Salehiyan`,
    description: descriptions[article.slug] || article.summary.slice(0, 150),
    path: `/insights/${article.slug}`,
    type: "article",
    noindex: Boolean(article.draft),
  });
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: siteContent.person.name, url: siteContent.person.website },
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
    image: absoluteUrl(article.heroImage),
  };

  return (
    <>
      <SeoJsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Writing", path: "/insights" },
            { name: shortTitles[article.slug] || article.title, path: `/insights/${article.slug}` },
          ]),
          articleJsonLd,
        ]}
      />
      <ArticleLayout article={article} />
    </>
  );
}
