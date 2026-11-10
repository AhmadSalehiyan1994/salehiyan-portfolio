"use client";

import { useState } from "react";

type CopyBibtexProps = {
  bibtex: string;
  /** Publication title, used in the accessible name of the button. */
  title: string;
  id: string;
};

/** "Cite" button: shows the BibTeX entry and copies it to the clipboard. */
export function CopyBibtex({ bibtex, title, id }: CopyBibtexProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setStatus("BibTeX copied.");
    } catch {
      setStatus("Copy failed. Select the text and copy it by hand.");
    }
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-bibtex`}
        aria-label={`Cite: show BibTeX for ${title}`}
        onClick={() => setOpen((current) => !current)}
        className="pub-button"
      >
        Cite
      </button>
      {open ? (
        <div id={`${id}-bibtex`} className="mt-3 basis-full rounded-md border border-border bg-background p-3">
          <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs leading-5 text-muted-foreground" tabIndex={0}>
            {bibtex}
          </pre>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button type="button" onClick={copy} aria-label={`Copy BibTeX for ${title}`} className="pub-button">
              Copy BibTeX
            </button>
            <p role="status" aria-live="polite" className="text-xs text-muted-foreground">
              {status}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
