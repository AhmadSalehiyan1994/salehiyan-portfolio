import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, siteContent } from "@/lib/content";

type ProjectDetailPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return siteContent.projects.map((project) => ({ slug: project.slug }));
}

function publicFileExists(relativePath: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", relativePath));
  } catch {
    return false;
  }
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  const canonicalPath = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${project.title} | Project Case`,
      description: project.description,
      url: canonicalPath,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Project Case`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const casePdfFsPath = path.join("projects", project.slug, "case.pdf");
  const casePdfHref = publicFileExists(casePdfFsPath) ? `/projects/${project.slug}/case.pdf` : null;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Projects
        </Link>
        {casePdfHref ? (
          <a href={casePdfHref} className="text-sm text-primary hover:underline">
            Download PDF
          </a>
        ) : null}
      </div>
      <div className="mt-6">
        <Badge variant="outline">{project.domain}</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{project.title}</h1>
        <p className="mt-4 text-muted-foreground">{project.description}</p>
      </div>
      <div className="relative mt-8 h-64 overflow-hidden rounded-2xl border border-border bg-muted md:h-80">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 896px, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Timeline</p>
          <p className="mt-2 text-sm font-medium text-foreground">{project.timeline}</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Impact Focus</p>
          <p className="mt-2 text-sm font-medium text-foreground">{project.impactLabel}</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Core Tools</p>
          <p className="mt-2 text-sm font-medium text-foreground">{project.stack.join(", ")}</p>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Problem</h2>
          <p className="mt-2 text-muted-foreground">{project.problem}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">What I did</h2>
          <p className="mt-2 text-muted-foreground">{project.role}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Result</h2>
          <p className="mt-2 text-muted-foreground">{project.outcome}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">What changed</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {project.proofPoints.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Deliverables</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {project.deliverables.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
        {project.links && project.links.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Links</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-primary hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
