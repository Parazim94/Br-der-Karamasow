"use client";

import { useState } from "react";
import type { Book } from "@/books/types";
import { useProgress } from "@/lib/progress";
import { isUnlocked, matchesTerm } from "@/lib/unlock";

export default function GlossaryView({ book }: { book: Book }) {
  const [progress] = useProgress(book);
  const [query, setQuery] = useState("");

  const all = book.glossary ?? [];
  const visible = all
    .filter((g) => isUnlocked(g.at, progress))
    .sort((a, b) => a.term.localeCompare(b.term, "de"));
  const results = visible.filter((g) => matchesTerm(g, query));

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="sr-only">Begriff suchen</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Begriff suchen, auch wie du ihn gehört hast"
          className="min-h-12 w-full rounded-xl border border-line bg-card px-4 text-base outline-none focus:border-accent"
        />
      </label>

      {visible.length === 0 && (
        <p className="text-sm text-muted">
          Noch keine Begriffe freigeschaltet. Sie erscheinen, sobald sie dir im Buch begegnet sind.
        </p>
      )}

      <ul className="space-y-3">
        {results.map((g) => (
          <li key={g.id} className="rounded-2xl border border-line bg-card p-4">
            <p className="font-serif text-lg leading-snug">{g.term}</p>
            <p className="mt-1 leading-relaxed">{g.text}</p>
          </li>
        ))}
      </ul>

      {visible.length > 0 && results.length === 0 && (
        <p className="text-sm text-muted">Nichts gefunden. Vielleicht kommt der Begriff erst später im Buch.</p>
      )}

      {all.length > visible.length && (
        <p className="pt-2 text-center text-xs text-muted">Weitere Begriffe folgen, während du liest.</p>
      )}
    </div>
  );
}
