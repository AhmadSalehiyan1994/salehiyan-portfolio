"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { DownloadLink } from "@/components/download-link";
import { siteContent } from "@/lib/content";

const navItems = [
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Projects", href: "/projects" },
  { label: "Teaching", href: "/teaching" },
  { label: "Writing", href: "/insights" },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { documents, person } = siteContent;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setIsOpen(false);
    setCvOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!cvOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (cvRef.current && !cvRef.current.contains(event.target as Node)) setCvOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCvOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [cvOpen]);

  const linkClass = (active: boolean) =>
    "inline-flex min-h-11 items-center rounded-md px-2.5 text-sm transition-colors hover:text-foreground " +
    (active ? "font-medium text-foreground" : "text-muted-foreground");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="inline-flex min-h-11 min-w-0 items-center gap-2.5 text-foreground" aria-label={`${person.name}, home`}>
          <span className="relative hidden h-7 w-[84px] shrink-0 overflow-hidden sm:inline-block">
            <Image src="/brand/osu-system-logo.png" alt="" fill sizes="84px" className="object-contain" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[17px] font-semibold tracking-tight sm:text-[19px]">{person.name}</span>
            <span className="hidden max-w-[330px] text-[11px] font-medium leading-snug text-muted-foreground md:block lg:hidden xl:block">
              {person.headline}
            </span>
          </span>
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={linkClass(isActive(item.href))}>
              {item.label}
            </Link>
          ))}
          <div ref={cvRef} className="relative">
            <button
              type="button"
              aria-expanded={cvOpen}
              aria-controls="cv-menu"
              onClick={() => setCvOpen((current) => !current)}
              className={linkClass(isActive("/cv")) + " gap-1"}
            >
              CV <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {cvOpen ? (
              <div id="cv-menu" className="absolute right-0 top-full z-50 mt-1 w-64 rounded-md border border-border bg-card p-1.5 shadow-xl">
                <Link href="/cv" className="flex min-h-11 items-center rounded px-3 text-sm text-foreground hover:bg-muted">
                  CV and resume page
                </Link>
                <DownloadLink
                  href={documents.academicCv}
                  eventName="cv_download"
                  placement="nav"
                  onNavigate={() => setCvOpen(false)}
                  className="w-full justify-start rounded px-3 text-sm text-foreground hover:bg-muted"
                >
                  Academic CV (PDF)
                </DownloadLink>
                {documents.industryResume ? (
                  <DownloadLink
                    href={documents.industryResume}
                    eventName="resume_download"
                    placement="nav"
                    onNavigate={() => setCvOpen(false)}
                    className="w-full justify-start rounded px-3 text-sm text-foreground hover:bg-muted"
                  >
                    Industry Resume (PDF)
                  </DownloadLink>
                ) : null}
              </div>
            ) : null}
          </div>
          <Link href="/contact" aria-current={isActive("/contact") ? "page" : undefined} className={linkClass(isActive("/contact"))}>
            Contact
          </Link>
        </nav>
      </div>

      {isOpen ? (
        <div className="border-t border-border/80 bg-background lg:hidden">
          <nav id="mobile-navigation" aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={"flex min-h-11 items-center rounded-md px-3 text-base hover:bg-card " + (isActive(item.href) ? "bg-card font-medium" : "")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cv"
              aria-current={isActive("/cv") ? "page" : undefined}
              className={"flex min-h-11 items-center rounded-md px-3 text-base hover:bg-card " + (isActive("/cv") ? "bg-card font-medium" : "")}
            >
              CV
            </Link>
            <DownloadLink
              href={documents.academicCv}
              eventName="cv_download"
              placement="mobile-nav"
              className="justify-start rounded-md px-3 pl-6 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
            >
              Academic CV (PDF)
            </DownloadLink>
            {documents.industryResume ? (
              <DownloadLink
                href={documents.industryResume}
                eventName="resume_download"
                placement="mobile-nav"
                className="justify-start rounded-md px-3 pl-6 text-sm text-muted-foreground hover:bg-card hover:text-foreground"
              >
                Industry Resume (PDF)
              </DownloadLink>
            ) : null}
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className={"flex min-h-11 items-center rounded-md px-3 text-base hover:bg-card " + (isActive("/contact") ? "bg-card font-medium" : "")}
            >
              Contact
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
