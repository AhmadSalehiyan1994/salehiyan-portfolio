import { Fragment } from "react";
import { siteContent } from "@/lib/content";
import { researchPublications, presentations } from "@/lib/research";

function Citation({ text }: { text: string }) {
  return <>{text.split("A. Salehiyan").map((part, index) => (
    <Fragment key={index}>{index > 0 && <strong className="font-semibold text-foreground">A. Salehiyan</strong>}{part}</Fragment>
  ))}</>;
}

export function PublicationsSection() {
  return (
    <section id="publications" className="border-b border-border/40 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Publications</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Research Publications</h2>
        <div className="mt-8 space-y-8">
          {researchPublications.map((group) => (
            <div key={group.title}>
              <h3 className="text-xl font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-4 space-y-4">
                {group.entries.map((entry) => <li key={entry} className="rounded-xl border border-border bg-card/50 p-5 text-sm leading-7 text-muted-foreground"><Citation text={entry} /></li>)}
              </ul>
            </div>
          ))}
        </div>
        <a href={siteContent.person.scholar} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">Full list and citations on Google Scholar</a>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-foreground">Presentations</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            {presentations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
