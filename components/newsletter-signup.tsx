"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics-client";

type ApiResponse = {
  success: boolean;
  message: string;
};

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6">
      <h2 className="text-lg font-semibold text-foreground">Subscribe for updates</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Monthly notes on reliability, optimization, and applied analytics. Double opt-in (confirmation email required).
      </p>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setStatus(null);
          trackEvent("newsletter_subscribe_submit", { location: "insights" });

          try {
            const res = await fetch("/api/newsletter/subscribe", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ email }),
            });

            const json = (await res.json()) as ApiResponse;
            setStatus(json);
          } catch {
            setStatus({ success: false, message: "Unable to subscribe right now." });
          } finally {
            setLoading(false);
          }
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@domain.com"
          maxLength={254}
          className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label="Email address"
        />
        <Button type="submit" disabled={loading} className="sm:w-[180px]">
          {loading ? "Submitting…" : "Subscribe"}
        </Button>
      </form>

      <div className="mt-3" aria-live="polite">
        {status ? (
          <p className={status.success ? "text-sm text-foreground" : "text-sm text-destructive"}>
            {status.message}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
        )}
      </div>
    </div>
  );
}
