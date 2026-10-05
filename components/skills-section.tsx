import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/lib/content";

export function SkillsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Skills & Expertise</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Technical toolkit and methodologies</h2>
      
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {siteContent.skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
