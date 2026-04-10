import type { Metadata } from "next";
import { InsightsCatalog } from "@/components/insights-catalog";
import { ReliabilityCurveDemo } from "@/components/reliability-curve-demo";
import { siteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Short notes on industrial engineering, optimization, and machine learning applications.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights & Articles | Ahmad Salehiyan",
    description: "Short notes on industrial engineering, optimization, and machine learning applications.",
    url: "/insights",
    images: [
      {
        url: "/images/AI.jpg",
        width: 1200,
        height: 630,
        alt: "Insights and articles",
      },
    ],
  },
};

const insights = siteContent.insights;
export default function InsightsPage() {

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Insights & Articles</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Practical notes from projects and research
      </h1>

      <div className="mt-10">
        <ReliabilityCurveDemo />
      </div>

      <InsightsCatalog insights={insights} />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card/50 p-6">
          <h2 className="text-lg font-semibold text-foreground">Posting Cadence</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            New article every month: one operations/reliability topic + one analytics/optimization deep dive.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-6">
          <h2 className="text-lg font-semibold text-foreground">Topic Clusters</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Structured pathways across three clusters: Maintenance, Optimization, and Machine Learning.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-card/50 p-6">
        <h2 className="text-lg font-semibold text-foreground">Publishing approach</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Published articles stay clickable. Draft topics remain visible only as a roadmap so visitors know what is coming next without hitting dead ends.
        </p>
      </div>
    </section>
  );
}
