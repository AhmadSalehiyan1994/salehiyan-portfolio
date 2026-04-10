"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyContactCta() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40" data-print="hide">
      <Link
        href="/#contact"
        className="inline-flex items-center rounded-full border border-primary/25 bg-background/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground shadow-lg transition hover:border-primary/50 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:px-4 md:text-sm"
      >
        Contact
      </Link>
    </div>
  );
}
