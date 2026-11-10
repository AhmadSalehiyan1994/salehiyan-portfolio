import type { Metadata } from "next";
import { siteContent, siteMetadata } from "@/lib/content";
import { publications, isPublished, type Publication } from "@/lib/research";

const baseUrl = siteContent.person.website.replace(/\/$/, "");

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path === "/" ? "" : path}` || baseUrl;
}

type PageMetadataInput = {
  /** Full page title, under 60 characters, with "Ahmad Salehiyan" in it. */
  title: string;
  /** Under 155 characters. */
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
};

/** One helper for every page: unique title and description, self-referencing canonical, default OG card. */
export function pageMetadata({ title, description, path, type = "website", noindex = false }: PageMetadataInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteContent.person.name,
      locale: "en_US",
      type,
      images: [{ url: siteMetadata.ogImage, width: 1200, height: 630, alt: siteMetadata.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteMetadata.ogImage],
    },
  };
}

export function sameAsLinks() {
  const { person } = siteContent;
  return [person.scholar, person.linkedin, person.orcid, person.github].filter(Boolean);
}

export function personJsonLd() {
  const { person } = siteContent;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: person.name,
    jobTitle: person.headline,
    email: `mailto:${person.email}`,
    url: baseUrl,
    image: absoluteUrl(person.image),
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Oklahoma State University",
      url: "https://go.okstate.edu/",
    },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "K. N. Toosi University of Technology" },
      { "@type": "CollegeOrUniversity", name: "Azad University, Qazvin" },
    ],
    knowsAbout: [
      "Reinforcement learning",
      "Multi-agent reinforcement learning",
      "Partially observable Markov decision processes",
      "Stochastic optimization",
      "Condition-based maintenance",
      "Warehouse picker routing",
      "Machine learning for electronic health records",
      "Intrusion detection",
    ],
    sameAs: sameAsLinks(),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: siteContent.person.name,
    description: siteMetadata.description,
    inLanguage: "en-US",
    publisher: { "@id": `${baseUrl}/#person` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function authorJsonLd(publication: Publication) {
  return publication.authors.map((author) => {
    const name = author.given && author.family ? `${author.given} ${author.family}` : author.short;
    return author.me ? { "@type": "Person", name, "@id": `${baseUrl}/#person` } : { "@type": "Person", name };
  });
}

export function scholarlyArticlesJsonLd() {
  return publications.filter(isPublished).map((publication) => {
    const doiUrl = publication.doi ? `https://doi.org/${publication.doi}` : undefined;
    const data: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "@id": `${baseUrl}/publications#${publication.id}`,
      headline: publication.title,
      name: publication.title,
      author: authorJsonLd(publication),
      datePublished: publication.datePublished || publication.year,
      isPartOf: {
        "@type": publication.group === "journal" ? "Periodical" : "PublicationIssue",
        name: publication.venue,
      },
      url: doiUrl || publication.url || `${baseUrl}/publications#${publication.id}`,
    };
    if (publication.pages) data.pagination = publication.pages;
    if (publication.doi) {
      data.identifier = {
        "@type": "PropertyValue",
        propertyID: "DOI",
        value: publication.doi,
      };
      data.sameAs = doiUrl;
    }
    return data;
  });
}
