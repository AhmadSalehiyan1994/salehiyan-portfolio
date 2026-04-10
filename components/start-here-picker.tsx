"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";

type StartHereItem = {
  title: string;
  description: string;
  href: string;
  audience: "Industry" | "Research" | "Recruiter";
};

type StartHerePickerProps = {
  items: StartHereItem[];
};

const audiences = ["Industry", "Research", "Recruiter"] as const;

export function StartHerePicker({ items }: StartHerePickerProps) {
  const [audience, setAudience] = useState<(typeof audiences)[number]>("Industry");

  const ordered = useMemo(() => {
    const prioritized = items
      .slice()
      .sort((a, b) => Number(b.audience === audience) - Number(a.audience === audience));
    return prioritized;
  }, [audience, items]);

  return (
    <>
      <div className="mt-4 inline-flex flex-wrap gap-2">
        {audiences.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setAudience(item)}
            className={
              item === audience
                ? "rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground"
                : "rounded-full border border-border bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            }
            aria-pressed={item === audience}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {ordered.map((item) => (
          <Link
            key={item.title}
            href={item.href as Route}
            className="rounded-lg border border-border bg-card/50 p-5 transition-colors hover:border-primary/40 hover:bg-card"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <span className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {item.audience}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            <p className="mt-4 text-xs font-medium text-primary">Explore →</p>
          </Link>
        ))}
      </div>
    </>
  );
}
