import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Ahmad Salehiyan" },
  description: "This page does not exist. Use the links to find research, publications, and contact details for Ahmad Salehiyan.",
  robots: { index: false, follow: true },
};

const links = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/publications" },
  { label: "Contact", href: "/contact" },
] as const;

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Page not found</h1>
      <p className="mt-3 text-muted-foreground">This page does not exist or has moved. These links may help.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-md border border-input px-5 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
