import Link from "next/link";
import type { Route } from "next";
import type { NewsItem } from "@/lib/content";

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={`${item.sortDate}-${item.text.slice(0, 24)}`} className="grid gap-1 border-l-2 border-primary/60 pl-4 sm:grid-cols-[110px_1fr] sm:gap-4">
          <p className="text-sm font-medium text-primary">{item.displayDate}</p>
          <p className="text-sm leading-7 text-muted-foreground">
            {item.text}{" "}
            {item.href ? (
              <Link href={item.href as Route} className="font-medium text-foreground underline underline-offset-4 hover:text-primary" aria-label={`Details: ${item.text}`}>
                Details
              </Link>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  );
}
