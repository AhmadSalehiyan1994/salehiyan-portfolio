import Link from "next/link";
import type { Route } from "next";
import { ProjectFigure } from "@/components/project-figure";
import { ArrowLink, PageHeader, Section } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { getProjectBySlug } from "@/lib/projects";
import { dissertation, futureAgenda, getPublication, jobMarketPaper, researchStatement, researchThemes } from "@/lib/research";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research | Ahmad Salehiyan",
  description:
    "Research statement, themes, dissertation, and job market paper of Ahmad Salehiyan: sequential decision-making under uncertainty.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <SeoJsonLd data={breadcrumbJsonLd([{ name: "Research", path: "/research" }])} />
      <PageHeader title="Research" lead="Sequential decision-making under uncertainty in engineering systems." />

      <Section id="statement" title="Research statement">
        <div className="max-w-3xl space-y-4 text-base leading-8 text-muted-foreground">
          {researchStatement.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="themes" title="Research themes">
        <ol className="space-y-6">
          {researchThemes.map((theme, index) => (
            <li key={theme.id} id={theme.id} className="scroll-mt-24 rounded-lg border border-border bg-card/50 p-6 md:p-8">
              <h3 className="text-xl font-semibold leading-8 text-foreground">
                {index + 1}. {theme.title}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">{theme.description}</p>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Papers</h4>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                    {theme.publicationIds.map((id) => {
                      const publication = getPublication(id);
                      if (!publication) return null;
                      return (
                        <li key={id}>
                          <Link href={`/publications#${id}` as Route} className="prose-link">
                            {publication.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Projects</h4>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                    {theme.projectSlugs.map((slug) => {
                      const project = getProjectBySlug(slug);
                      if (!project) return null;
                      return (
                        <li key={slug}>
                          <Link href={`/projects/${slug}` as Route} className="prose-link">
                            {project.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="dissertation" title="Dissertation">
        <div className="max-w-3xl">
          <h3 className="text-xl font-semibold leading-8 text-foreground">{dissertation.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">Proposal title. Advisor: {dissertation.advisor}.</p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{dissertation.summary}</p>
          <p className="mt-3 text-base leading-8 text-muted-foreground">{dissertation.status}</p>
          <ArrowLink href={`/projects/${dissertation.projectSlug}`} className="mt-2">
            Project page: multi-agent fleet maintenance
          </ArrowLink>
        </div>
      </Section>

      <Section id="job-market-paper" title="Job market paper">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="text-xl font-semibold leading-8 text-foreground">{jobMarketPaper.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong className="font-semibold text-foreground">A. Salehiyan</strong>, A. Deep
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{jobMarketPaper.status}</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{jobMarketPaper.abstract.join(" ")}</p>
            <div className="mt-4 flex flex-wrap gap-x-6">
              {jobMarketPaper.links.map((link) => (
                <ArrowLink key={link.href} href={link.href}>
                  {link.label}
                </ArrowLink>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <ProjectFigure
              figure={jobMarketPaper.figure}
              alt={jobMarketPaper.figureAlt}
              caption="Two-phase hybrid Safe-MARL approach."
              id="research-jmp-figure"
            />
          </div>
        </div>
      </Section>

      <Section id="agenda" title="Future research agenda" className="border-b-0">
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">{futureAgenda}</p>
      </Section>
    </>
  );
}
