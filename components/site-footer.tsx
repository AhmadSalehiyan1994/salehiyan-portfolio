import Link from "next/link";
import { lastUpdated, profileLinks, siteContent } from "@/lib/content";
import { formatDate } from "@/lib/articles";

const footerNav = [
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Projects", href: "/projects" },
  { label: "Teaching", href: "/teaching" },
  { label: "Writing", href: "/insights" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/legal/privacy" },
] as const;

export function SiteFooter() {
  const { person } = siteContent;
  const linkClass = "inline-flex min-h-11 items-center text-muted-foreground underline-offset-4 hover:text-foreground hover:underline";

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground">{person.name}</p>
            <p className="mt-1 text-muted-foreground">{person.title}, {person.affiliation}</p>
            <a href={`mailto:${person.email}`} className={linkClass}>
              {person.email}
            </a>
          </div>
          <nav aria-label="Profiles">
            <p className="font-semibold text-foreground">Profiles</p>
            <ul className="mt-1">
              {profileLinks().map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer">
            <p className="font-semibold text-foreground">Site</p>
            <ul className="mt-1 grid grid-cols-2 gap-x-6">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-1 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {person.name}</p>
          <p>
            Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
