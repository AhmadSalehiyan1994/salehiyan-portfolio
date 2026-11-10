import Link from "next/link";
import type { Route } from "next";
import { buttonVariants } from "@/components/ui/button";
import { DownloadLink } from "@/components/download-link";
import { PageHeader, Section } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "CV and Resume | Ahmad Salehiyan",
  description:
    "Download the academic CV of Ahmad Salehiyan. Summary for recruiters: target roles, core methods, availability from June 2027, relocation.",
  path: "/cv",
});

export default function CvPage() {
  const { documents, recruiterSummary, industryBullets } = siteContent;
  return (
    <>
      <SeoJsonLd data={breadcrumbJsonLd([{ name: "CV", path: "/cv" }])} />
      <PageHeader title="CV and resume" lead={recruiterSummary}>
        <div className="mt-8 flex flex-wrap gap-3">
          <DownloadLink href={documents.academicCv} eventName="cv_download" placement="cv-page" className={cn(buttonVariants({ size: "lg" }), "px-6")}>
            Academic CV (PDF)
          </DownloadLink>
          {documents.industryResume ? (
            <DownloadLink
              href={documents.industryResume}
              eventName="resume_download"
              placement="cv-page"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-6")}
            >
              Industry Resume (PDF)
            </DownloadLink>
          ) : null}
        </div>
      </PageHeader>

      <Section id="industry" title="What I bring to an industry team">
        <ul className="max-w-3xl space-y-5">
          {industryBullets.map((bullet) => (
            <li key={bullet.href} className="border-l-2 border-primary/60 pl-4 text-base leading-8 text-muted-foreground">
              {bullet.text}{" "}
              <Link href={bullet.href as Route} className="prose-link">
                {bullet.linkLabel}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="more" title="More detail" className="border-b-0">
        <ul className="flex flex-wrap gap-3">
          {[
            { label: "Research", href: "/research" },
            { label: "Publications and talks", href: "/publications" },
            { label: "Projects", href: "/projects" },
            { label: "Skills", href: "/#skills" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href as Route}
                className="inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
