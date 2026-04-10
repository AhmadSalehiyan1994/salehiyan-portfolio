"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navItems = [
    { label: "Welcome", href: "/#welcome" },
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Education", href: "/#education" },
    { label: "Skills", href: "/#skills" },
    { label: "Certifications", href: "/#certifications" },
    { label: "Publications", href: "/#publications" },
    { label: "Contact", href: "/#contact" },
    { label: "CV", href: "/files/Ahmad-Salehiyan-CV.pdf" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="inline-flex items-center gap-2.5 text-foreground">
          <span className="relative inline-flex h-10 items-center justify-center rounded-md bg-card/40 px-2">
            <span className="relative h-7 w-[110px] overflow-hidden">
              <Image
                src="/brand/osu-system-logo.png"
                alt="Oklahoma State University"
                fill
                sizes="110px"
                className="object-contain"
                priority
              />
            </span>
          </span>
          <span className="leading-tight">
            <span className="block text-[19px] font-semibold tracking-tight">Ahmad Salehiyan</span>
            <span className="block text-[12px] font-medium text-muted-foreground">Industrial Engineer</span>
          </span>
        </Link>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={
                "transition-colors hover:text-foreground " +
                (isActive(item.href) ? "text-foreground" : "text-muted-foreground")
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {isOpen ? (
        <div className="border-t border-border/80 bg-background/95 md:hidden">
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={
                  "rounded-md px-3 py-3 text-sm transition hover:bg-card " +
                  (isActive(item.href) ? "bg-card text-foreground" : "text-foreground")
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
