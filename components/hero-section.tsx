"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics-client";

function firstSentence(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const idx = normalized.indexOf(".");
  if (idx === -1) return normalized;
  return normalized.slice(0, idx + 1);
}

export function HeroSection() {
  const { person, hero } = siteContent;

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1">
            <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
            <a href="https://ceat.okstate.edu/iem" target="_blank" rel="noreferrer" className="text-xs font-medium text-primary hover:underline">
              PhD Candidate in Industrial Engineering & Management
            </a>
          </div>
          
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            {person.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{hero.valueProposition}</p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{hero.audienceLine}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {hero.specialties.map((specialty) => (
              <Badge key={specialty} variant="outline">{specialty}</Badge>
            ))}
          </div>
          
          <p className="mt-6 max-w-2xl text-pretty text-sm leading-7 text-muted-foreground md:text-base">
            {firstSentence(siteContent.person.shortBio)} {firstSentence(siteContent.proofSignals[2].detail)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/files/Ahmad-Salehiyan-CV.pdf"
              download
              onClick={() => trackEvent("cta_download_cv", { location: "hero_primary" })}
              className={cn(buttonVariants({ size: "lg", variant: "default" }))}
            >
              Download CV <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Link
              href="/contact"
              onClick={() => trackEvent("cta_start_conversation", { location: "hero" })}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Start a conversation
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline">OSU · PhD (IEM)</Badge>
            <Badge variant="outline">Reliability + Optimization</Badge>
            <Badge variant="outline">{person.location}</Badge>
          </div>
        </div>
        <div className="md:col-span-4">
          <Image
            src={person.image}
            alt={person.imageAlt}
            width={520}
            height={650}
            sizes="(min-width: 768px) 33vw, 100vw"
            quality={95}
            className="h-auto w-full object-cover object-[50%_18%]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
