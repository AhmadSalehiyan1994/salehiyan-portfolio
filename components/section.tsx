import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
  /** Optional "see all" link shown next to the title. */
  action?: { label: string; href: string };
  className?: string;
};

export function Section({ id, title, children, action, className }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-20 border-b border-border/40 px-4 py-14 sm:px-6 md:py-16", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          {action ? <ArrowLink href={action.href}>{action.label}</ArrowLink> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href as Route}
      className={cn("inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline", className)}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="border-b border-border/40 px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{lead}</p> : null}
        {children}
      </div>
    </div>
  );
}
