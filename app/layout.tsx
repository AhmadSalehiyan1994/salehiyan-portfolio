import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteContent } from "@/lib/content";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { StickyContactCta } from "@/components/sticky-contact-cta";
import { getCurrentLanguage } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const siteTitle = "Ahmad Salehiyan | Industrial Engineer and Data-Driven Problem Solver";

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.person.website),
  title: {
    default: siteTitle,
    template: `%s | ${siteContent.person.name}`,
  },
  description: siteContent.hero.valueProposition,
  applicationName: `${siteContent.person.name} Portfolio`,
  openGraph: {
    title: siteTitle,
    description: siteContent.hero.valueProposition,
    url: siteContent.person.website,
    siteName: siteContent.person.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteContent.person.image,
        width: 1200,
        height: 630,
        alt: `${siteContent.person.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteContent.hero.valueProposition,
    images: [siteContent.person.image],
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-64.png", type: "image/png", sizes: "64x64" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getCurrentLanguage();
  return (
    <html lang={lang} dir="ltr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <StickyContactCta />
        <AnalyticsScripts />
        <Analytics />
      </body>
    </html>
  );
}
