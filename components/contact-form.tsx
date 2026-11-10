"use client";

import { useState } from "react";
import { siteContent } from "@/lib/content";

type SubmitStatus = "idle" | "sending" | "success" | "error";

// Formspree endpoint. The environment variable wins, so the form can be pointed elsewhere without a code change.
const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() || "https://formspree.io/f/xbdparee";

const inputClass =
  "mt-2 w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground/80 focus-visible:border-primary";

export function ContactForm({ idPrefix = "contact" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never see or fill this field. Pretend success and send nothing.
    if (String(formData.get("_gotcha") || "").trim() !== "") {
      form.reset();
      setStatus("success");
      setMessage("Thank you. Your message was sent.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        setStatus("error");
        setMessage(`The message could not be sent. Please email me at ${siteContent.person.email}.`);
        return;
      }

      form.reset();
      setStatus("success");
      setMessage("Thank you. Your message was sent. I will reply by email.");
    } catch {
      setStatus("error");
      setMessage(`Network error. Please try again, or email me at ${siteContent.person.email}.`);
    }
  }

  return (
    <form onSubmit={handleSubmit} action={endpoint} method="POST" className="rounded-lg border border-border bg-card p-6" aria-label="Contact form">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="text-sm font-medium text-foreground">
            Name
          </label>
          <input id={`${idPrefix}-name`} name="name" required autoComplete="name" minLength={2} maxLength={120} className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="text-sm font-medium text-foreground">
            Email
          </label>
          <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" maxLength={254} className={inputClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${idPrefix}-subject`} className="text-sm font-medium text-foreground">
          Subject
        </label>
        <input id={`${idPrefix}-subject`} name="subject" autoComplete="off" maxLength={140} className={inputClass} />
      </div>

      <div className="mt-4">
        <label htmlFor={`${idPrefix}-message`} className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea id={`${idPrefix}-message`} name="message" required rows={5} minLength={10} maxLength={4000} className={inputClass} />
      </div>

      {/* Honeypot field against spam. Hidden from sighted users and from assistive technology. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-gotcha`}>Leave this field empty</label>
        <input id={`${idPrefix}-gotcha`} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-primary-strong px-5 text-sm font-medium text-white hover:bg-primary-strong/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      <p
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={
          "mt-4 min-h-6 text-sm font-medium " + (status === "error" ? "text-destructive" : status === "success" ? "text-green-400" : "text-muted-foreground")
        }
      >
        {message}
      </p>
    </form>
  );
}
