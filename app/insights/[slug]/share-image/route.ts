import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ArticleShareCard } from "@/components/article-share-card";
import { getArticle, publishedArticles } from "@/lib/articles";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedArticles().map((article) => ({ slug: article.slug }));
}

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article || article.draft) return new Response("Not found", { status: 404 });

  const image = await readFile(join(process.cwd(), "public", article.heroImage.slice(1)));
  const mime = article.heroImage.endsWith(".png") ? "image/png" : "image/jpeg";
  const imageData = `data:${mime};base64,${image.toString("base64")}`;

  return new ImageResponse(ArticleShareCard({ article, imageData }), {
    width: 1200,
    height: 630,
    headers: { "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=3600" },
  });
}
