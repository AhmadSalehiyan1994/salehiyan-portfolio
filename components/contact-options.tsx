"use client";

import { useMemo, useState } from "react";
import { siteContent } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics-client";

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export function ContactOptions() {
  const [status, setStatus] = useState<string>("");

  const contactMethods = [
    { label: "Email", value: siteContent.person.email, href: `mailto:${siteContent.person.email}` },
    { label: "Phone", value: siteContent.person.phone, href: `tel:${siteContent.person.phone}` },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: siteContent.person.linkedin, external: true },
    { label: "GitHub", value: "GitHub Profile", href: siteContent.person.github, external: true },
    { label: "Telegram", value: "Message on Telegram", href: siteContent.person.telegram, external: true },
    { label: "WhatsApp", value: "Chat on WhatsApp", href: siteContent.person.whatsapp, external: true },
  ];

  const quickCopy = useMemo(
    () => [
      { label: "Copy email", value: siteContent.person.email },
      { label: "Copy phone", value: siteContent.person.phone },
    ],
    [],
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Get In Touch</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Multiple ways to connect</h2>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="rounded-full border border-border bg-card/40 px-3 py-1">
          {siteContent.person.typicalResponseTime}
        </span>
        <span className="rounded-full border border-border bg-card/40 px-3 py-1">
          Time zone: {siteContent.person.timeZone}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {quickCopy.map((item) => (
          <Button
            key={item.label}
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                await copyToClipboard(item.value);
                trackEvent(item.label === "Copy email" ? "contact_copy_email" : "contact_copy_phone", {
                  location: "contact_options",
                });
                setStatus(`${item.label} copied.`);
                window.setTimeout(() => setStatus(""), 1600);
              } catch {
                setStatus("Copy failed. Please copy manually.");
                window.setTimeout(() => setStatus(""), 2500);
              }
            }}
          >
            {item.label}
          </Button>
        ))}
        <span className="sr-only" aria-live="polite">
          {status}
        </span>
        {status ? <span className="text-xs text-muted-foreground">{status}</span> : null}
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {contactMethods.map((method) => (
          <a
            key={method.label}
            href={method.href}
            target={method.external ? "_blank" : undefined}
            rel={method.external ? "noreferrer" : undefined}
            className="rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-primary hover:bg-card"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{method.label}</p>
            <p className="mt-2 text-sm text-foreground">{method.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
