import { PageHeader } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { lastUpdated, siteContent } from "@/lib/content";
import { formatDate } from "@/lib/articles";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Notice | Ahmad Salehiyan",
  description: "How salehiyan.com handles data: Vercel Web Analytics for anonymous page statistics and Formspree for the contact form.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  const { person } = siteContent;
  const h2 = "mt-10 text-xl font-semibold tracking-tight text-foreground";
  const p = "mt-3 text-base leading-8 text-muted-foreground";
  return (
    <>
      <SeoJsonLd data={breadcrumbJsonLd([{ name: "Privacy", path: "/legal/privacy" }])} />
      <PageHeader title="Privacy notice">
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>
      </PageHeader>
      <div className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className={p}>This is my personal academic website. It has no user accounts, no advertising, and no newsletter.</p>

          <h2 className={h2}>Analytics</h2>
          <p className={p}>
            The site uses Vercel Web Analytics to count page views. According to Vercel&apos;s documentation, Web Analytics does not use
            third-party cookies. It identifies visitors by a hash created from the incoming request, and it discards the visitor session after
            24 hours. Each data point may include the time, the page URL, the referrer, an approximate location (country, region, city), the
            device type, the operating system, and the browser. Vercel states that this data is used for aggregated statistics only.
          </p>
          <p className={p}>
            I also record a count of CV downloads as an anonymous event. Source:{" "}
            <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="prose-link">
              Vercel Web Analytics, Privacy and Compliance
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>

          <h2 className={h2}>Contact form</h2>
          <p className={p}>
            The contact form sends the name, email address, subject, and message that you enter to Formspree, a form-handling service. Formspree
            delivers the message to me by email. I use this information only to reply to you. If you prefer not to use the form, you can email
            me directly at{" "}
            <a href={`mailto:${person.email}`} className="prose-link">
              {person.email}
            </a>
            .
          </p>

          <h2 className={h2}>Hosting</h2>
          <p className={p}>The site is hosted on Vercel. Like any web host, Vercel processes technical request data, such as IP addresses, to deliver pages.</p>

          <h2 className={h2}>External links</h2>
          <p className={p}>
            Links to Google Scholar, LinkedIn, publishers, and other sites open those services. Their own privacy policies apply there.
          </p>

          <h2 className={h2}>Questions and removal requests</h2>
          <p className={p}>
            To ask a question or to request removal of a message you sent, email{" "}
            <a href={`mailto:${person.email}`} className="prose-link">
              {person.email}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
