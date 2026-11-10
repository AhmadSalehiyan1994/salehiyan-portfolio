import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/section";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { profileLinks, siteContent } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact | Ahmad Salehiyan",
  description: "Contact Ahmad Salehiyan about postdoc, faculty, and industry research positions, or research collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  const { person, contact, about } = siteContent;
  return (
    <>
      <SeoJsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <PageHeader title={contact.heading} lead={contact.text} />
      <div className="px-4 py-14 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <section aria-labelledby="direct-heading">
            <h2 id="direct-heading" className="text-2xl font-semibold tracking-tight text-foreground">
              Email and profiles
            </h2>
            <a
              href={`mailto:${person.email}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-lg font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {person.email}
            </a>
            <p className="mt-3 max-w-xl text-base leading-8 text-muted-foreground">{about.availability}</p>
            <ul className="mt-5 flex flex-wrap gap-3">
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
          </section>
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="text-2xl font-semibold tracking-tight text-foreground">
              Send a message
            </h2>
            <div className="mt-4">
              <ContactForm idPrefix="contact-page" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
