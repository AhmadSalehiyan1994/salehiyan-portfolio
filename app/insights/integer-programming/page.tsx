import type { Metadata } from "next";
import { PublicationArticleLayout } from "@/components/publication-article-layout";
import { publicationBySlug } from "@/lib/publications";

const article = publicationBySlug["integer-programming"];
const canonicalPath = "/insights/integer-programming";

export const metadata: Metadata = {
	title: article.title,
	description: article.summary,
	alternates: {
		canonical: canonicalPath,
	},
	openGraph: {
		title: article.title,
		description: article.summary,
		type: "article",
		url: canonicalPath,
		images: [
			{
				url: article.heroImage,
				width: 1200,
				height: 630,
				alt: article.heroImageAlt,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: article.title,
		description: article.summary,
		images: [article.heroImage],
	},
};

export default function IntegerProgrammingInsightPage() {
	return <PublicationArticleLayout article={article} />;
}
