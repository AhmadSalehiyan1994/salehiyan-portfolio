import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BriefcaseBusiness, Code2, ExternalLink, GraduationCap, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CvDownloadLink } from "@/components/cv-download-link";
import { siteContent, siteMetadata } from "@/lib/content";
import { cn } from "@/lib/utils";
import { publications as publicationContent, type PublicationArticle } from "@/lib/publications";
import { PublicationsSection } from "@/components/publications-section";

export const metadata: Metadata = {
  title: { absolute: siteMetadata.title },
  description: siteMetadata.description,
};

const certifications = [
  "ISO 9001:2015 — Quality Management Systems",
  "ISO 22000 — Food Safety Management Systems",
  "Advanced Microsoft Excel (48-hour)",
  "Microsoft Project 2016 (24-hour)",
  "Production Planning & Inventory Control (24-hour)",
  "ICDL (98-hour)",
];

const professionalTimeline = siteContent.experience;

const isPublication = (item: PublicationArticle | undefined): item is PublicationArticle => Boolean(item);

const publications = [
  publicationContent.find((item) => item.slug === "machine-learning"),
  publicationContent.find((item) => item.slug === "integer-programming"),
  publicationContent.find((item) => item.slug === "maintenance-management"),
].filter(isPublication);

const publicationHrefBySlug: Record<PublicationArticle["slug"], string> = {
  "machine-learning": "/insights/machine-learning",
  "integer-programming": "/insights/integer-programming",
  "maintenance-management": "/insights/maintenance-management",
};

export default function HomePage() {
  return (
    <>
      <section id="welcome" className="border-b border-border/50 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Welcome to my world</p>
            <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Hi, I&apos;m Ahmad
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-lg">
              {siteContent.hero.valueProposition}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="outline">Ph.D. Researcher — Oklahoma State University</Badge>
              <Badge variant="outline">Deep Reinforcement Learning</Badge>
              <Badge variant="outline">Machine Learning</Badge>
              <Badge variant="outline">Stochastic Optimization</Badge>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#about"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-orange-600 text-white hover:bg-[#FF5A00]"
                )}
              >
                Explore My Approach <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#publications"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-zinc-800 bg-transparent text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                )}
              >
                View Publications
              </a>
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-zinc-800 bg-transparent text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                )}
              >
                Contact Me
              </a>
              <CvDownloadLink />
            </div>
            <div className="mt-8 rounded-lg border border-border bg-card/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Best Skill On</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline">Python</Badge>
                <Badge variant="outline">GAMS</Badge>
                <Badge variant="outline">Power BI</Badge>
                <Badge variant="outline">Excel</Badge>
              </div>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={siteContent.person.image}
                alt={siteContent.person.imageAlt}
                width={720}
                height={900}
                sizes="(min-width: 768px) 30vw, 100vw"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-border/40 px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">About</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Data-Driven Engineering Profile</h2>
          </div>
          <div className="md:col-span-8 space-y-4 text-base leading-8 text-muted-foreground">
            <p>{siteContent.person.shortBio}</p>
            <p><strong className="text-foreground">Research interests:</strong> {siteContent.person.researchInterests}</p>
          </div>
        </div>
      </section>

      <section id="experience" className="border-b border-border/40 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Experience</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Professional Timeline</h2>

          <div className="mt-8 space-y-6">
            {professionalTimeline.map((item) => (
              <article key={`${item.organization}-${item.period}`} className="relative rounded-xl border border-border bg-card/50 p-5 md:p-6">
                <div className="md:flex md:items-start md:justify-between md:gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{item.period}</p>
                    <h3 className="mt-1 text-xl font-semibold text-foreground">{item.role}</h3>
                    <p className="mt-1 text-sm font-medium text-foreground/90">{item.organization}</p>
                  </div>
                  <BriefcaseBusiness className="mt-4 h-5 w-5 text-primary md:mt-0" />
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-md border border-border/80 bg-background/50 px-3 py-2 text-sm text-muted-foreground">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="border-b border-border/40 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Education Quality</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Academic Foundation</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {siteContent.education.map((item) => (
              <Card key={item.degree} className="h-full bg-card/50 transition-all hover:border-primary/40 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> {item.degree}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground">{item.institution}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.period}</p>
                  {item.focus ? <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.focus}</p> : null}
                  {item.advisor ? <p className="mt-2 text-xs text-muted-foreground">Advisor: {item.advisor}</p> : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="border-b border-border/40 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Professional Skills</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Software, Programming, and Methods</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {siteContent.skillGroups.map((group) => (
              <Card key={group.title} className="bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Code2 className="h-5 w-5 text-primary" /> {group.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="border-b border-border/40 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Professional Certifications</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Formal Training and Certification Track</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item) => (
              <Card key={item} className="bg-card/50 transition-all hover:border-primary/40 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-2"><Award className="mt-0.5 h-4 w-4 text-primary" /> {item}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PublicationsSection />

      <section id="insights" className="border-b border-border/40 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Insights</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Technical Articles</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {publications.map((paper) => (
              <Card key={paper.slug} className="h-full bg-card/50 transition-all hover:border-primary/40 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg leading-7">{paper.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{paper.summary}</p>
                  <a
                    href={publicationHrefBySlug[paper.slug]}
                    className="hover-glow-effect hover-elevate mt-5 inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium text-foreground transition hover:text-primary focus-visible:outline-none"
                  >
                    Read Article <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-primary/25 bg-primary/5 p-5">
            <p className="text-sm text-foreground">
              Looking for applied research collaboration in reliability engineering or operational analytics?
              {" "}
              <a href="#contact" className="font-semibold text-primary hover:underline">Let&apos;s discuss your use case.</a>
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Start a Conversation</h2>
          <p className="mt-4 text-muted-foreground">
            Share your reliability, maintenance, or analytics challenge and I will respond with a practical next-step framework.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="mailto:ahmad@salehiyan.com" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:border-[#EA4335]/60 hover:bg-[#EA4335]/10 hover:text-[#EA4335]">
              <Mail className="mr-2 h-4 w-4" /> Email
            </Link>
            <Link href="https://www.linkedin.com/in/ahmad-salehiyan" target="_blank" rel="noreferrer" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]">
              LinkedIn
            </Link>
            <a href={siteContent.person.github} target="_blank" rel="noreferrer" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:border-primary/60 hover:text-primary">GitHub</a>
            <a href={siteContent.person.scholar} target="_blank" rel="noreferrer" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:border-primary/60 hover:text-primary">Google Scholar</a>
            <Link href="https://t.me/AhmadSalehiyan" target="_blank" rel="noreferrer" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:border-[#229ED9]/60 hover:bg-[#229ED9]/10 hover:text-[#229ED9]">
              Telegram
            </Link>
            <Link href="https://wa.me/14052693549" target="_blank" rel="noreferrer" className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 text-sm text-foreground transition hover:border-[#25D366]/60 hover:bg-[#25D366]/10 hover:text-[#25D366]">
              WhatsApp
            </Link>
          </div>

          <form
            action="https://formspree.io/f/xbdparee"
            method="POST"
            className="mt-8 space-y-4 rounded-lg border border-border bg-card p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-name">
                Name
                <input
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  autoComplete="name"
                  className="hover-glow-effect hover-elevate w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/70"
                  placeholder="Your full name"
                />
              </label>

              <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-email">
                Email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="hover-glow-effect hover-elevate w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/70"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-subject">
              Subject
              <input
                id="contact-subject"
                name="subject"
                required
                minLength={4}
                className="hover-glow-effect hover-elevate w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/70"
                placeholder="e.g., Maintenance analytics consulting"
              />
            </label>

            <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-message">
              Message
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={20}
                rows={6}
                className="hover-glow-effect hover-elevate w-full rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/70"
                placeholder="Briefly describe your current constraints, goals, and timeline."
              />
            </label>

            <input type="hidden" name="_subject" value="Portfolio Contact Inquiry" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg">Send Message</Button>
              <a
                href="mailto:ahmad@salehiyan.com?subject=Portfolio%20Inquiry"
                className="hover-glow-effect hover-elevate inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium text-foreground transition hover:border-[#EA4335]/60 hover:bg-[#EA4335]/10 hover:text-[#EA4335]"
              >
                Mailto Fallback
              </a>
            </div>
          </form>
        </div>
      </section>

      <section id="latest-technical-insights" className="border-t border-zinc-800 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">Insights Preview</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Latest Technical Insights</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <a
              href="/insights/integer-programming"
              className="block rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-orange-600"
            >
              <h3 className="text-lg font-semibold text-orange-500">Integer Programming</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Formulating mixed-integer programs to optimize warehouse order-picking efficiency and reduce routing overhead.
              </p>
            </a>
            <a
              href="/insights/machine-learning"
              className="block rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-orange-600"
            >
              <h3 className="text-lg font-semibold text-orange-500">Machine Learning</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Applying machine learning and deep reinforcement learning to decision-making under uncertainty in engineering systems.
              </p>
            </a>
            <a
              href="/insights/maintenance-management"
              className="block rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-orange-600"
            >
              <h3 className="text-lg font-semibold text-orange-500">Maintenance Management</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Bridging stochastic POMDP models with physical system constraints to optimize real-world maintenance scheduling.
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
