import type { Metadata } from "next";
import { lastUpdated, siteContent, siteMetadata } from "@/lib/content";
import { publications, isPublished, type Publication } from "@/lib/research";
import type { Article } from "@/lib/articles";
import type { Project } from "@/lib/projects";

const baseUrl = siteContent.person.website.replace(/\/$/, "");

export const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
};

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
  image?: { url: string; alt: string; width?: number; height?: number };
  publishedTime?: string;
  modifiedTime?: string;
};

/** One helper for every page: unique title and description, self-referencing canonical, default OG card. */
export function pageMetadata({ title, description, path, type = "website", noindex = false, image, publishedTime, modifiedTime }: PageMetadataInput): Metadata {
  const preview = image || { url: siteMetadata.ogImage, width: 1200, height: 630, alt: siteMetadata.ogImageAlt };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false, googleBot: { index: false, follow: false } } : indexableRobots,
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteContent.person.name,
      locale: "en_US",
      type,
      images: [preview],
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [siteContent.person.website] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [preview.url],
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
    givenName: "Ahmad",
    familyName: "Salehiyan",
    description: siteMetadata.description,
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

/** The homepage is the author's profile, with one stable identity shared by his work. */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#profile`,
    url: `${baseUrl}/`,
    name: siteMetadata.title,
    description: siteMetadata.description,
    dateModified: lastUpdated,
    inLanguage: "en-US",
    isPartOf: { "@id": `${baseUrl}/#website` },
    mainEntity: personJsonLd(),
  };
}

export function articleJsonLd(article: Article) {
  const url = absoluteUrl(`/insights/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "en-US",
    articleSection: article.domain,
    author: { "@type": "Person", "@id": `${baseUrl}/#person`, name: siteContent.person.name, url: `${baseUrl}/` },
    publisher: { "@type": "Person", "@id": `${baseUrl}/#person`, name: siteContent.person.name, url: `${baseUrl}/` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(article.heroImage),
    citation: article.references.map((reference) => reference.href),
  };
}

export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.title,
    description: project.description,
    abstract: project.problem,
    inLanguage: "en-US",
    about: project.domain,
    keywords: project.stack,
    creativeWorkStatus: project.status,
    author: { "@type": "Person", "@id": `${baseUrl}/#person`, name: siteContent.person.name, url: `${baseUrl}/` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    citation: publications.filter((publication) => publication.project === project.slug).map((publication) => ({
      "@id": `${baseUrl}/publications#${publication.id}`,
    })),
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
    return author.me ? { "@type": "Person", name, "@id": `${baseUrl}/#person`, url: `${baseUrl}/` } : { "@type": "Person", name };
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
      inLanguage: "en-US",
      isPartOf: {
        "@type": publication.group === "journal" ? "Periodical" : "PublicationIssue",
        name: publication.venue,
      },
      url: doiUrl || publication.url || `${baseUrl}/publications#${publication.id}`,
    };
    if (publication.pages) data.pagination = publication.pages;
    if (publication.volume) data.isPartOf = {
      "@type": "PublicationIssue",
      ...(publication.issue ? { issueNumber: publication.issue } : {}),
      isPartOf: {
        "@type": "PublicationVolume",
        volumeNumber: publication.volume,
        isPartOf: { "@type": "Periodical", name: publication.venue },
      },
    };
    if (publication.pdf) data.encoding = { "@type": "MediaObject", contentUrl: publication.pdf, encodingFormat: "application/pdf" };
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
