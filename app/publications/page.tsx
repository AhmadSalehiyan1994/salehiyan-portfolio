import { PublicationList } from "@/components/publication-list";
import { PageHeader, Section } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { TalkList } from "@/components/talk-list";
import { siteContent } from "@/lib/content";
import { publicationGroups, publications, sortedTalks } from "@/lib/research";
import { breadcrumbJsonLd, pageMetadata, scholarlyArticlesJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Publications and Talks | Ahmad Salehiyan",
  description:
    "Journal articles, conference proceedings, papers under review, preprints, and talks by Ahmad Salehiyan, with DOI links and BibTeX.",
  path: "/publications",
});

export default function PublicationsPage() {
  const { person } = siteContent;
  const profileButtons = [
    { label: "Google Scholar", href: person.scholar },
    { label: "ORCID", href: person.orcid },
  ].filter((link) => Boolean(link.href));

  return (
    <>
      <SeoJsonLd data={[breadcrumbJsonLd([{ name: "Publications", path: "/publications" }]), ...scholarlyArticlesJsonLd()]} />
      <PageHeader
        title="Publications and talks"
        lead="Published work comes first. Papers under review, preprints, and work in preparation are listed in their own groups."
      >
        <ul className="mt-6 flex flex-wrap gap-3">
          {profileButtons.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
              >
                {link.label} profile
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      {publicationGroups.map(({ group, title }) => {
        const items = publications.filter((publication) => publication.group === group);
        if (items.length === 0) return null;
        return (
          <Section key={group} id={group} title={title}>
            <PublicationList items={items} />
          </Section>
        );
      })}

      <Section id="talks" title="Talks" className="border-b-0">
        <TalkList items={sortedTalks()} />
      </Section>
    </>
  );
}
