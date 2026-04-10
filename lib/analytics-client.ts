"use client";

type PlausibleFn = (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;

export function trackEvent(eventName: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: PlausibleFn }).plausible;
  if (!plausible) return;
  plausible(eventName, props ? { props } : undefined);
}
