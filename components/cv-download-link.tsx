"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VercelAnalytics = (command: "event", eventName: string) => void;

export function CvDownloadLink() {
  return (
    <a
      href="/files/Ahmad-Salehiyan-CV.pdf"
      download
      onClick={() => {
        const va = (window as Window & { va?: VercelAnalytics }).va;
        va?.("event", "CV_Download");
      }}
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "border-2 border-orange-600 text-orange-500 transition-all hover:bg-orange-600 hover:text-white"
      )}
    >
      Download CV
    </a>
  );
}
