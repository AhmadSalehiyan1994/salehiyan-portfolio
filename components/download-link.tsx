"use client";

import { track } from "@vercel/analytics";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type DownloadLinkProps = {
  href: string;
  /** Vercel Analytics custom event name, for example "cv_download". */
  eventName: string;
  /** Where the click happened, for example "hero" or "nav". */
  placement: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  onNavigate?: () => void;
};

/** A PDF download link that records a Vercel Analytics custom event. */
export function DownloadLink({ href, eventName, placement, children, className, showIcon = true, onNavigate }: DownloadLinkProps) {
  return (
    <a
      href={href}
      download
      onClick={() => {
        track(eventName, { placement });
        onNavigate?.();
      }}
      className={cn("inline-flex min-h-11 items-center justify-center gap-2", className)}
    >
      {showIcon ? <Download className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span>{children}</span>
    </a>
  );
}
