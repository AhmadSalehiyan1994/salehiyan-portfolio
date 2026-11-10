import type { Publication } from "@/lib/research";

const latexMap: Record<string, string> = {
  "á": "{\\'a}",
  "Á": "{\\'A}",
  "é": "{\\'e}",
  "í": "{\\'i}",
  "ó": "{\\'o}",
  "ú": "{\\'u}",
  "–": "--",
  "&": "\\&",
  _: "\\_",
};

function escapeLatex(value: string) {
  return value.replace(/[áÁéíóú–&_]/g, (char) => latexMap[char] || char);
}

/** BibTeX for a published item. Built only from the fields in lib/research.ts. */
export function toBibtex(publication: Publication) {
  const first = publication.authors[0];
  const key = `${(first.family || first.short).replace(/[^A-Za-z]/g, "").toLowerCase()}${publication.year || ""}${publication.id
    .split("-")[0]
    .replace(/[^a-z]/g, "")}`;
  const authors = publication.authors
    .map((author) => (author.given && author.family ? `${author.family}, ${author.given}` : author.short))
    .map(escapeLatex)
    .join(" and ");
  const isJournal = publication.group === "journal";
  const fields: [string, string | undefined][] = [
    ["author", authors],
    ["title", `{${escapeLatex(publication.title)}}`],
    [isJournal ? "journal" : "booktitle", publication.venue ? escapeLatex(publication.venue) : undefined],
    ["volume", publication.volume],
    ["number", publication.issue],
    ["pages", publication.pages ? publication.pages.replace("-", "--") : undefined],
    ["year", publication.year],
    ["doi", publication.doi],
  ];
  const lines = fields
    .filter((field): field is [string, string] => Boolean(field[1]))
    .map(([name, value]) => `  ${name} = {${value}}`);
  return `@${isJournal ? "article" : "inproceedings"}{${key},\n${lines.join(",\n")}\n}`;
}
