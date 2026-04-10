import { siteContent } from "@/lib/content";
import { StartHerePicker } from "@/components/start-here-picker";

const startHere = [
  {
    title: "Operations & Reliability",
    description: "Start here if you need maintenance KPI architecture, CMMS reporting structure, or reliability diagnostics.",
    href: "/insights/maintenance-management",
    audience: "Industry" as const,
  },
  {
    title: "Optimization & Planning",
    description: "Explore integer programming and decomposition methods for planning, routing, and scheduling.",
    href: "/insights/integer-programming",
    audience: "Research" as const,
  },
  {
    title: "AI & Predictive Analytics",
    description: "See practical machine learning pathways for prediction, anomaly detection, and decision support.",
    href: "/insights/machine-learning",
    audience: "Recruiter" as const,
  },
];

const services = [
  "Maintenance Analytics Architecture",
  "Optimization Model Design (MIP, Benders, D-W)",
  "Predictive Maintenance Pilot Development",
  "Decision-Support Dashboarding",
];

const outcomes = siteContent.metrics;

const institutions = [
  "Oklahoma State University",
  "K.N. Toosi University of Technology",
  "Industrial Operations Projects",
  "Reliability & Analytics Research",
];

const artifacts = [
  {
    title: "Maintenance reporting legacy archive",
    detail: "Reporting/KPI structure reference materials",
    href: "/maintenance/ManagementReporting/",
  },
  {
    title: "Integer programming legacy archive",
    detail: "Worked examples and formulations",
    href: "/Integer%20Programming/",
  },
  {
    title: "Machine learning legacy archive",
    detail: "Learning path and practical notes",
    href: "/Machin%20learning/",
  },
  {
    title: "CV and credentials",
    detail: "Education + certifications overview",
    href: "/cv",
  },
];

const publicationsAndTalks = [
  "Reliability modeling and data-driven maintenance planning (ongoing PhD research)",
  "Applied decomposition methods in integer optimization workflows",
  "Practical ML for industrial maintenance and decision support",
];

export function GrowthSections() {
  return (
    <>
      <section id="start-here" className="border-t border-border/40 bg-background px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Start Here</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Pick your fastest path</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Choose a track to reorder the recommendations for your intent.
          </p>
          <StartHerePicker items={startHere} />
        </div>
      </section>

      <section className="border-t border-border/40 bg-card/30 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">What I Help With</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Service packages</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {services.map((service) => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Measured Outcomes</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Impact snapshot</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-background/70 p-4 transition-all hover:border-primary/30 hover:bg-background/80 hover:shadow-md">
                  <p className="text-xl font-semibold text-primary">{item.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-xs text-muted-foreground/80">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-background px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Research & Collaboration Context</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {institutions.map((item) => (
              <div key={item} className="rounded-md border border-border/70 bg-card/40 px-4 py-3 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-card/60 hover:shadow-md">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-card/20 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Verifiable Artifacts</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Proof you can click</h2>
            <div className="mt-4 space-y-3">
              {artifacts.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="block rounded-lg border border-border bg-background/70 p-4 transition-all hover:border-primary/40 hover:bg-background/80 hover:shadow-md"
                >
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Publications & Talks</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Knowledge assets</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {publicationsAndTalks.map((item) => (
                <li key={item} className="rounded-lg border border-border bg-background/70 px-4 py-3 transition-all hover:border-primary/30 hover:bg-background/80 hover:shadow-md">
                  {item}
                </li>
              ))}
            </ul>
            <a href="/files/one-page-profile.md" download className="mt-4 inline-block text-sm text-primary hover:underline">
              Download one-page profile →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
