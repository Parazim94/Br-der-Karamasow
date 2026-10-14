"use client";

import type { Book } from "@/books/types";
import { chapterNumber, describe, locate, unitAt, unitMark, unitName } from "@/lib/book";
import { useProgress } from "@/lib/progress";

export default function ChapterList({ book }: { book: Book }) {
  const [progress, setProgress] = useProgress(book);

  return (
    <div className="space-y-6">
      {book.sections.map((section, i) => {
        const showPart = section.part !== undefined && (i === 0 || book.sections[i - 1].part !== section.part);
        return (
          <section key={section.id}>
            {showPart && <h2 className="mb-3 mt-2 font-serif text-xl text-accent">{section.part}</h2>}
            <h3 className="mb-2 text-sm font-semibold">{section.label}</h3>
            <ul className="grid grid-cols-5 gap-2">
              {Array.from({ length: section.chapters }, (_, k) => {
                const n = chapterNumber(book, section.id, k + 1);
                const read = n <= progress;
                const isCurrent = n === progress;
                return (
                  <li key={n}>
                    <button
                      type="button"
                      // Tipp auf das aktuelle Kapitel macht es rückgängig.
                      onClick={() => setProgress(isCurrent ? n - 1 : n)}
                      aria-pressed={read}
                      aria-label={`${describe(book, n)}${read ? ", gelesen" : ""}`}
                      className={`flex aspect-square w-full items-center justify-center rounded-xl border text-sm font-medium ${
                        read ? "border-accent bg-accent text-accent-ink" : "border-line bg-card text-ink"
                      } ${isCurrent ? "ring-2 ring-accent ring-offset-2 ring-offset-paper" : ""}`}
                    >
                      {unitMark(section.units?.[k], k)}
                    </button>
                  </li>
                );
              })}
            </ul>
            <Recaps book={book} sectionId={section.id} progress={progress} />
          </section>
        );
      })}
    </div>
  );
}

function Recaps({ book, sectionId, progress }: { book: Book; sectionId: string; progress: number }) {
  const items = book.summaries.filter((x) => {
    const loc = locate(book, x.at);
    return loc?.section.id === sectionId && x.at <= progress;
  });
  if (items.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      {items.map((x) => (
        <details key={x.at} className="rounded-xl border border-line bg-card px-4 py-1">
          <summary className="min-h-11 cursor-pointer list-none py-3 text-sm font-medium">
            Rückblick {unitName(book, x.at)}
            {unitAt(book, x.at)?.title ? ` – ${unitAt(book, x.at)?.title}` : ""}
          </summary>
          <p className="pb-3 text-sm leading-relaxed">{x.text}</p>
        </details>
      ))}
    </div>
  );
}
