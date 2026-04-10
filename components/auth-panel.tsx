"use client";

import { useState } from "react";

type Mode = "login" | "register";

function getCookieValue(name: string) {
  return (
    document.cookie
      .split("; ")
      .find((item) => item.startsWith(`${name}=`))
      ?.split("=")[1] || ""
  );
}

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("login");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || "").trim(),
      email: String(form.get("email") || "").trim(),
      password: String(form.get("password") || ""),
    };

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({} as Record<string, unknown>));

      if (!response.ok || !(result as { ok?: boolean }).ok) {
        const errorMessage =
          (result as { error?: { message?: string } }).error?.message ||
          "Authentication failed.";
        setMessage(errorMessage);
        setBusy(false);
        return;
      }

      setMessage("Success. Refreshing...");
      window.location.reload();
    } catch {
      setMessage("Network error. Please try again.");
      setBusy(false);
    }
  }

  async function logout() {
    const csrf = getCookieValue("csrf_token");
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "x-csrf-token": csrf },
    });
    window.location.reload();
  }

  return (
    <div className="rounded-lg border border-border bg-card/50 p-6">
      <div className="mb-4 flex items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`min-h-11 rounded-md px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`min-h-11 rounded-md px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${mode === "register" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
        >
          Register
        </button>
        <button
          type="button"
          onClick={logout}
          className="ml-auto min-h-11 px-2 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "register" ? (
          <input
            name="fullName"
            required
            autoComplete="name"
            minLength={2}
            maxLength={120}
            className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            placeholder="Full name"
          />
        ) : null}

        <input
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete={mode === "login" ? "email" : "email"}
          maxLength={254}
          className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          required
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          minLength={8}
          maxLength={128}
          className="w-full min-h-11 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
        </button>

        {message ? (
          <p aria-live="polite" className="text-xs text-muted-foreground">
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
