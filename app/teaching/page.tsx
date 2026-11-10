import { PageHeader, Section } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Teaching | Ahmad Salehiyan",
  description:
    "Teaching by Ahmad Salehiyan at Oklahoma State University in 2026: ENGR 1412 engineering programming and Engineering Economics help sessions.",
  path: "/teaching",
});

export default function TeachingPage() {
  const { teaching } = siteContent;
  return (
    <>
      <SeoJsonLd data={breadcrumbJsonLd([{ name: "Teaching", path: "/teaching" }])} />
      <PageHeader title="Teaching" lead={teaching.intro} />

      <Section id="courses" title="Courses in 2026" className={teaching.approach.length > 0 ? undefined : "border-b-0"}>
        <ul className="grid gap-4 md:grid-cols-2">
          {teaching.courses.map((course) => (
            <li key={course.course} className="rounded-lg border border-border bg-card/50 p-6">
              <p className="text-sm font-medium text-primary">{course.terms}</p>
              <h3 className="mt-1 text-lg font-semibold leading-7 text-foreground">{course.course}</h3>
              <dl className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                <div>
                  <dt className="inline font-medium text-foreground">Role: </dt>
                  <dd className="inline">{course.role}</dd>
                </div>
                {course.students ? (
                  <div>
                    <dt className="inline font-medium text-foreground">Students: </dt>
                    <dd className="inline">{course.students}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="inline font-medium text-foreground">Teaching responsibilities: </dt>
                  <dd className="inline">{course.details}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </Section>

      {teaching.approach.length > 0 ? (
        <Section id="approach" title="How I teach" className="border-b-0">
          <ul className="max-w-3xl list-disc space-y-2 pl-5 text-base leading-8 text-muted-foreground">
            {teaching.approach.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
