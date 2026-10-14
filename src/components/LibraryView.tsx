"use client";

import Link from "next/link";
import type { Book } from "@/books/types";
import { totalChapters } from "@/lib/book";
import { useLastBook } from "@/lib/last-book";
import { useProgress } from "@/lib/progress";

type Shelf = Pick<Book, "slug" | "title" | "author" | "sections">;

export default function LibraryView({ books }: { books: Shelf[] }) {
  const last = useLastBook();
  // Zuletzt geöffnetes Buch nach vorn; sonst bleibt die Reihenfolge der Registrierung.
  const sorted = [...books].sort((a, b) => Number(b.slug === last) - Number(a.slug === last));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl leading-tight">Bibliothek</h1>
        <p className="mt-1 text-sm text-muted">Deine Bücher, jedes mit eigenem Lesestand.</p>
      </header>
      <ul className="space-y-4">
        {sorted.map((b) => (
          <li key={b.slug}>
            <BookCard book={b} isLast={b.slug === last} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function BookCard({ book, isLast }: { book: Shelf; isLast: boolean }) {
  const [progress] = useProgress(book);
  const total = totalChapters(book);
  const percent = Math.round((progress / total) * 100);

  return (
    <Link href={`/${book.slug}`} className="block rounded-2xl border border-line bg-card p-5 active:bg-line">
      {isLast && <p className="mb-1 text-xs font-semibold text-accent">Zuletzt geöffnet</p>}
      <p className="font-serif text-2xl leading-snug">{book.title}</p>
      <p className="mt-0.5 text-sm text-muted">{book.author}</p>
      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Lesefortschritt ${book.title}`}
      >
        <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted">
        {progress} von {total} Kapiteln · {percent} %
      </p>
    </Link>
  );
}
