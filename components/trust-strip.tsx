import { siteContent } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 py-10 md:grid-cols-3">
          {siteContent.trustStrip.map((item, idx) => (
            <div key={idx} className="space-y-2 border-l border-border pl-4 md:border-l md:pl-4">
              <p className="text-sm font-medium text-foreground">{item.split(" - ")[0]}</p>
              {item.includes(" - ") && (
                <p className="text-xs text-muted-foreground">{item.split(" - ")[1]}</p>
              )}
            </div>
          ))}
        </div>
        <div className="grid gap-4 border-t border-border py-8 md:grid-cols-3">
          {siteContent.proofSignals.map((signal) => (
            <div key={signal.title} className="rounded-lg border border-border bg-card/40 p-4 transition-all hover:border-primary/30 hover:bg-card/60 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{signal.title}</p>
              <p className="mt-2 text-sm text-foreground">{signal.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
