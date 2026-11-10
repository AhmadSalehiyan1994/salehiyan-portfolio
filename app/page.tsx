import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { DownloadLink } from "@/components/download-link";
import { NewsList } from "@/components/news-list";
import { ProjectCard } from "@/components/project-card";
import { ProjectFigure } from "@/components/project-figure";
import { PublicationList } from "@/components/publication-list";
import { ArrowLink, Section } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { TalkList } from "@/components/talk-list";
import { profileLinks, siteContent, siteMetadata, sortedNews } from "@/lib/content";
import { featuredProjects } from "@/lib/projects";
import { jobMarketPaper, researchThemes, selectedPublications, sortedTalks } from "@/lib/research";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: siteMetadata.title },
  description: siteMetadata.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const { person, hero, about, documents, teaching, service, leadership, awards, experience, education, skillGroups, contact } = siteContent;
  const [role, focus] = person.headline.split(" | ");

  return (
    <>
      <SeoJsonLd data={[personJsonLd(), websiteJsonLd()]} />

      {/* 1. Hero */}
      <section id="welcome" aria-labelledby="hero-heading" className="border-b border-border/40 px-4 py-12 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <p className="inline-block rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-sm font-medium leading-6 text-foreground">
              {hero.jobMarketBanner}
            </p>
            <h1 id="hero-heading" className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              {person.name}
            </h1>
            <p className="mt-4 text-pretty text-lg font-medium leading-7 text-foreground md:text-xl md:leading-8">
              <span className="text-primary">{role}</span>
              <span className="sr-only">, </span>
              <span className="mt-1 block">{focus}</span>
            </p>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted-foreground md:text-lg md:leading-8">{hero.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DownloadLink
                href={documents.academicCv}
                eventName="cv_download"
                placement="hero"
                className={cn(buttonVariants({ size: "lg" }), "px-6")}
              >
                Academic CV
              </DownloadLink>
              {documents.industryResume ? (
                <DownloadLink
                  href={documents.industryResume}
                  eventName="resume_download"
                  placement="hero"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-6")}
                >
                  Industry Resume
                </DownloadLink>
              ) : null}
              <ArrowLink href="/publications" className="px-2 text-base">
                Publications
              </ArrowLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[280px] md:col-span-4 md:max-w-none">
            <Image
              src={person.image}
              alt={person.imageAlt}
              width={person.imageWidth}
              height={person.imageHeight}
              sizes="(min-width: 1152px) 368px, (min-width: 768px) 32vw, 280px"
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* About: short research summary (anchor kept from the earlier site) */}
      <Section id="about" title="About">
        <div className="max-w-3xl space-y-4 text-base leading-8 text-muted-foreground">
          <p>{about.researchSummary}</p>
          <p>
            I am a {person.title} in Industrial Engineering and Management at {person.affiliation}, advised by Dr. Akash Deep. {about.availability}
          </p>
        </div>
      </Section>

      {/* 2. Research themes */}
      <Section id="research" title="Research themes" action={{ label: "Research overview", href: "/research" }}>
        <ul className="grid gap-4 md:grid-cols-3">
          {researchThemes.map((theme) => (
            <li key={theme.id} className="flex flex-col rounded-lg border border-border bg-card/50 p-6">
              <h3 className="text-lg font-semibold leading-7 text-foreground">{theme.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{theme.short}</p>
              <Link
                href={`/research#${theme.id}` as Route}
                aria-label={`Read more about the theme: ${theme.title}`}
                className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Papers and projects
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Job market paper */}
      <Section id="job-market-paper" title="Job market paper">
        <div className="grid gap-8 rounded-lg border border-primary/40 bg-card/50 p-6 md:grid-cols-12 md:p-8">
          <div className="md:col-span-7">
            <h3 className="text-xl font-semibold leading-8 text-foreground">{jobMarketPaper.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong className="font-semibold text-foreground">A. Salehiyan</strong>, A. Deep
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{jobMarketPaper.status}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{jobMarketPaper.abstract.join(" ")}</p>
            <div className="mt-4 flex flex-wrap gap-x-6">
              {jobMarketPaper.links.map((link) => (
                <ArrowLink key={link.href} href={link.href}>
                  {link.label}
                </ArrowLink>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <ProjectFigure figure={jobMarketPaper.figure} alt={jobMarketPaper.figureAlt} id="jmp-figure" />
          </div>
        </div>
      </Section>

      {/* 4. Selected publications */}
      <Section id="publications" title="Selected publications" action={{ label: "All publications", href: "/publications" }}>
        <PublicationList items={selectedPublications()} />
      </Section>

      {/* 5. Featured projects */}
      <Section id="projects" title="Featured projects" action={{ label: "All projects", href: "/projects" }}>
        <ul className="grid gap-4 md:grid-cols-2">
          {featuredProjects().map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Teaching */}
      <Section id="teaching" title="Teaching" action={{ label: "Teaching page", href: "/teaching" }}>
        <ul className="grid gap-4 md:grid-cols-2">
          {teaching.courses.map((course) => (
            <li key={course.course} className="rounded-lg border border-border bg-card/50 p-6">
              <p className="text-sm font-medium text-primary">{course.terms}</p>
              <h3 className="mt-1 text-lg font-semibold leading-7 text-foreground">{course.course}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {course.role}
                {course.students ? `, ${course.students}` : ""}. {course.details}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Talks and news */}
      <Section id="talks-news" title="Talks and news">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent talks</h3>
            <div className="mt-4">
              <TalkList items={sortedTalks(3)} headingLevel="h4" />
            </div>
            <ArrowLink href="/publications#talks" className="mt-3">
              All talks
            </ArrowLink>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">News</h3>
            <div className="mt-4">
              <NewsList items={sortedNews(5)} />
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Awards, service, leadership */}
      <Section id="service" title="Awards, service, and leadership">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card/50 p-6">
            <h3 className="text-lg font-semibold text-foreground">Awards</h3>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
              {awards.map((award) => (
                <li key={award.title}>
                  <span className="font-medium text-foreground">{award.title}</span>, {award.organization}, {award.year}.
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card/50 p-6">
            <h3 className="text-lg font-semibold text-foreground">Service</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.reviewing}</p>
            {service.journals.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
                {service.journals.map((journal) => (
                  <li key={journal}>{journal}</li>
                ))}
              </ul>
            ) : null}
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Member: {service.memberships.join("; ")}.</p>
          </div>
          <div className="rounded-lg border border-border bg-card/50 p-6">
            <h3 className="text-lg font-semibold text-foreground">Leadership</h3>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
              {leadership.map((item) => (
                <li key={item.organization}>
                  <span className="font-medium text-foreground">{item.role}</span>, {item.organization}
                  {item.period ? `, ${item.period}` : ""}.
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 9. Experience and education */}
      <Section id="experience" title="Experience">
        <ul className="space-y-4">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.period}`} className="rounded-lg border border-border bg-card/50 p-6">
              <p className="text-sm font-medium text-primary">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {item.role}, <span className="font-medium">{item.organization}</span>
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.summary}</p>
              {item.highlights.length > 0 ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <li key={item.degree} className="rounded-lg border border-border bg-card/50 p-6">
              <p className="text-sm font-medium text-primary">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold leading-7 text-foreground">{item.degree}</h3>
              <p className="mt-1 text-sm font-medium text-foreground">{item.institution}</p>
              {item.focus ? <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.focus}</p> : null}
              {item.advisor ? <p className="mt-1 text-sm text-muted-foreground">Advisor: {item.advisor}</p> : null}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">{siteContent.additionalTraining}</p>
      </Section>

      {/* 10. Skills */}
      <Section id="skills" title="Skills">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <li key={group.title} className="rounded-lg border border-border bg-card/50 p-6">
              <h3 className="text-base font-semibold leading-6 text-foreground">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge variant="outline">{item}</Badge>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* 11. Contact */}
      <Section id="contact" title={contact.heading} className="border-b-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground">{contact.text}</p>
            <a
              href={`mailto:${person.email}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-lg font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {person.email}
            </a>
            <ul className="mt-4 flex flex-wrap gap-3">
              {profileLinks().map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm idPrefix="home-contact" />
        </div>
      </Section>
    </>
  );
}
