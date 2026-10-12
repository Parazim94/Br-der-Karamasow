"use client";

import { BOOKS, chapterNumber } from "@/lib/book";
import { useProgress } from "@/lib/progress";

export default function ChapterList() {
  const [progress, setProgress] = useProgress();

  return (
    <div className="space-y-6">
      {BOOKS.map((book, i) => {
        const showPart = i === 0 || BOOKS[i - 1].part !== book.part;
        return (
          <section key={book.id}>
            {showPart && (
              <h2 className="mb-3 mt-2 font-serif text-xl text-accent">{book.part}</h2>
            )}
            <h3 className="mb-2 text-sm font-semibold">{book.label}</h3>
            <ul className="grid grid-cols-5 gap-2">
              {Array.from({ length: book.chapters }, (_, k) => {
                const n = chapterNumber(book.id, k + 1);
                const read = n <= progress;
                const isCurrent = n === progress;
                return (
                  <li key={n}>
                    <button
                      type="button"
                      // Tipp auf das aktuelle Kapitel macht es rückgängig.
                      onClick={() => setProgress(isCurrent ? n - 1 : n)}
                      aria-pressed={read}
                      aria-label={`${book.label}, Kapitel ${k + 1}${read ? ", gelesen" : ""}`}
                      className={`flex aspect-square w-full items-center justify-center rounded-xl border text-sm font-medium ${
                        read ? "border-accent bg-accent text-accent-ink" : "border-line bg-card text-ink"
                      } ${isCurrent ? "ring-2 ring-accent ring-offset-2 ring-offset-paper" : ""}`}
                    >
                      {k + 1}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
