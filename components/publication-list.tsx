import Link from "next/link";
import type { Route } from "next";
import { CopyBibtex } from "@/components/copy-bibtex";
import { toBibtex } from "@/lib/bibtex";
import { isPublished, type Publication } from "@/lib/research";
import { getProjectBySlug } from "@/lib/projects";

function Authors({ publication }: { publication: Publication }) {
  return (
    <>
      {publication.authors.map((author, index) => (
        <span key={`${author.short}-${index}`}>
          {author.me ? <strong className="font-semibold text-foreground">{author.short}</strong> : author.short}
          {index < publication.authors.length - 1 ? ", " : ". "}
        </span>
      ))}
    </>
  );
}

function venueLine(publication: Publication) {
  if (!isPublished(publication)) return publication.status || "";
  const parts: string[] = [];
  if (publication.volume) {
    parts.push(`${publication.volume}${publication.issue ? `(${publication.issue})` : ""}`);
  }
  if (publication.pages) parts.push(publication.group === "conference" ? `pp. ${publication.pages}` : publication.pages);
  if (publication.year) parts.push(publication.year);
  return parts.join(", ") + ".";
}

function ExternalButton({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${title} (opens in a new tab)`} className="pub-button">
      {label}
    </a>
  );
}

export function PublicationItem({ publication, headingLevel = "h3" }: { publication: Publication; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  const published = isPublished(publication);
  const project = publication.project ? getProjectBySlug(publication.project) : undefined;

  return (
    <li id={publication.id} className="scroll-mt-24 rounded-lg border border-border bg-card/50 p-5">
      <Heading className="text-base font-semibold leading-7 text-foreground">{publication.title}</Heading>
      <p className="mt-1 text-sm leading-7 text-muted-foreground">
        <Authors publication={publication} />
        {published && publication.venue ? <em>{publication.venue}</em> : null}
        {published && publication.venue ? ", " : null}
        {venueLine(publication)}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {publication.doi ? <ExternalButton href={`https://doi.org/${publication.doi}`} label="DOI" title={publication.title} /> : null}
        {publication.pdf ? <ExternalButton href={publication.pdf} label="PDF" title={publication.title} /> : null}
        {publication.preprint ? <ExternalButton href={publication.preprint} label="Preprint" title={publication.title} /> : null}
        {publication.code ? <ExternalButton href={publication.code} label="Code" title={publication.title} /> : null}
        {publication.slides ? <ExternalButton href={publication.slides} label="Slides" title={publication.title} /> : null}
        {project ? (
          <Link href={`/projects/${project.slug}` as Route} aria-label={`Project page: ${project.shortTitle}`} className="pub-button">
            Project
          </Link>
        ) : null}
        {published ? <CopyBibtex bibtex={toBibtex(publication)} title={publication.title} id={publication.id} /> : null}
      </div>
    </li>
  );
}

export function PublicationList({ items, headingLevel }: { items: Publication[]; headingLevel?: "h3" | "h4" }) {
  return (
    <ul className="space-y-4">
      {items.map((publication) => (
        <PublicationItem key={publication.id} publication={publication} headingLevel={headingLevel} />
      ))}
    </ul>
  );
}
