import Image from "next/image";
import type { Talk } from "@/lib/research";

type TalkListProps = {
  items: Talk[];
  headingLevel?: "h3" | "h4";
  /** Show the optional event photo of each talk. The home page keeps the list compact and turns this off. */
  showImages?: boolean;
};

export function TalkList({ items, headingLevel = "h3", showImages = true }: TalkListProps) {
  const Heading = headingLevel;
  return (
    <ul className="space-y-4">
      {items.map((talk) => (
        <li key={talk.id} className="rounded-lg border border-border bg-card/50 p-5">
          <div className={showImages && talk.image ? "grid gap-5 sm:grid-cols-[1fr_240px] sm:items-start" : undefined}>
            <div>
              <p className="text-sm font-medium text-primary">
                {talk.displayDate} <span className="text-muted-foreground">| {talk.type}</span>
              </p>
              <Heading className="mt-1 text-base font-semibold leading-7 text-foreground">{talk.title}</Heading>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                {talk.meeting}
                {talk.city ? `, ${talk.city}` : ""}
                {talk.note ? `. ${talk.note}` : ""}.
              </p>
              {talk.slides ? (
                <a href={talk.slides} aria-label={`Slides: ${talk.title}`} className="pub-button mt-3">
                  Slides
                </a>
              ) : null}
            </div>
            {showImages && talk.image ? (
              <Image
                src={talk.image.src}
                alt={talk.image.alt}
                width={talk.image.width}
                height={talk.image.height}
                sizes="(min-width: 640px) 240px, 100vw"
                className="h-auto w-full rounded-md border border-border object-cover"
              />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
