"use client";

import { useMemo, useState } from "react";

type SubmitStatus = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "message";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim();
  const useInternalApi = process.env.NEXT_PUBLIC_CONTACT_USE_INTERNAL_API === "true";
  const submissionTarget = formspreeEndpoint || (useInternalApi ? "/api/contact" : "");
  const isConfigured = Boolean(submissionTarget);

  const formStartedAt = useMemo(() => Date.now(), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFieldErrors({});

    if (!isConfigured) {
      setStatus("error");
      setMessage("The contact form is not configured yet. Please email or message me directly.");
      return;
    }

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      const nextErrors: Partial<Record<FieldName, string>> = {};

      const nameEl = form.elements.namedItem("name") as HTMLInputElement | null;
      if (nameEl && !nameEl.validity.valid) {
        nextErrors.name = nameEl.validationMessage || "Please enter your name.";
      }

      const emailEl = form.elements.namedItem("email") as HTMLInputElement | null;
      if (emailEl && !emailEl.validity.valid) {
        nextErrors.email = emailEl.validationMessage || "Please enter a valid email address.";
      }

      const messageEl = form.elements.namedItem("message") as HTMLTextAreaElement | null;
      if (messageEl && !messageEl.validity.valid) {
        nextErrors.message = messageEl.validationMessage || "Please enter your message.";
      }

      setFieldErrors(nextErrors);
      setStatus("error");
      setMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("sending");
    setMessage("");
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
      formStartedAt: Number(formData.get("formStartedAt") || formStartedAt),
    };

    try {
      const response = await fetch(
        submissionTarget,
        formspreeEndpoint
          ? {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              body: (() => {
                const outboundFormData = new FormData();
                outboundFormData.set("name", payload.name);
                outboundFormData.set("email", payload.email);
                outboundFormData.set("subject", payload.subject);
                outboundFormData.set("message", payload.message);
                outboundFormData.set("source", "portfolio-contact-form");
                return outboundFormData;
              })(),
            }
          : {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            },
      );

      const result = await response.json().catch(() => ({} as Record<string, unknown>));

      const succeeded = response.ok && (formspreeEndpoint ? true : Boolean(result.success));

      if (!succeeded) {
        setStatus("error");
        setMessage(String(result.message || "Unable to submit the form right now. Please email me directly."));
        return;
      }

      form.reset();
      setStatus("success");
      setMessage(String(result.message || "Thanks. Your message has been sent successfully."));
      window.plausible?.("Contact Form Submitted", {
        props: {
          target: formspreeEndpoint ? "formspree" : "internal-api",
        },
      });
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or use the direct contact links below.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-name">
          Name
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            minLength={2}
            maxLength={120}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none transition duration-300 ease-in-out focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/60"
            placeholder="Your full name"
            onInput={() => {
              if (!fieldErrors.name) return;
              setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
        </label>
        <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-email">
          Email
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none transition duration-300 ease-in-out focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/60"
            placeholder="you@example.com"
            onInput={() => {
              if (!fieldErrors.email) return;
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
        </label>
      </div>

      {fieldErrors.name ? (
        <p id="contact-name-error" className="text-xs text-destructive">
          {fieldErrors.name}
        </p>
      ) : null}

      {fieldErrors.email ? (
        <p id="contact-email-error" className="text-xs text-destructive">
          {fieldErrors.email}
        </p>
      ) : null}

      <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-subject">
        Subject
        <input
          id="contact-subject"
          name="subject"
          autoComplete="off"
          maxLength={140}
          className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none transition duration-300 ease-in-out focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/60"
          placeholder="Project type or challenge"
        />
      </label>

      <label className="space-y-2 text-sm text-muted-foreground" htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={4000}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none transition duration-300 ease-in-out focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/60"
          placeholder="Share your current challenge, constraints, and expected outcomes."
          onInput={() => {
            if (!fieldErrors.message) return;
            setFieldErrors((prev) => ({ ...prev, message: undefined }));
          }}
        />
      </label>

      {fieldErrors.message ? (
        <p id="contact-message-error" className="text-xs text-destructive">
          {fieldErrors.message}
        </p>
      ) : null}

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <input type="hidden" name="formStartedAt" value={formStartedAt} />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || !isConfigured}
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending..." : isConfigured ? "Send Message" : "Use Direct Contact"}
      </button>

      {message ? (
        <p
          aria-live="polite"
          className={`text-sm ${status === "success" ? "text-foreground" : "text-destructive"}`}
        >
          {message}
        </p>
      ) : null}

      {!isConfigured ? (
        <p className="text-xs text-amber-400">
          Set <code>NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> for static hosting or enable
          {" "}
          <code>NEXT_PUBLIC_CONTACT_USE_INTERNAL_API=true</code> on a server deployment.
        </p>
      ) : null}
    </form>
  );
}
