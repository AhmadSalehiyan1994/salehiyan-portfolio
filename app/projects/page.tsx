import Link from "next/link";
import type { Route } from "next";
import { ProjectCard } from "@/components/project-card";
import { PageHeader, Section } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { earlierWork, projects } from "@/lib/projects";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects | Ahmad Salehiyan",
  description:
    "Research projects by Ahmad Salehiyan: fleet maintenance with safe MARL, warehouse picker routing, POMDP maintenance, MIMIC-IV, intrusion detection.",
  path: "/projects",
});

// This page is a server component. Every project title is in the HTML response.
export default function ProjectsPage() {
  return (
    <>
      <SeoJsonLd data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])} />
      <PageHeader title="Projects" lead="Each project page gives the result first, then the problem, the method, a diagram, the tools, and my role." />

      <Section id="research-projects" title="Research projects">
        <ul className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="earlier-work" title="Earlier work" className="border-b-0">
        <ul className="max-w-3xl space-y-5">
          {earlierWork.map((item) => (
            <li key={item.title}>
              <h3 className="text-base font-semibold text-foreground">
                {item.title} <span className="font-normal text-muted-foreground">({item.period})</span>
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                {item.description}{" "}
                {item.link ? (
                  <Link href={item.link.href as Route} className="prose-link">
                    {item.link.label}
                  </Link>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
