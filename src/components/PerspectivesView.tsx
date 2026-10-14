"use client";

import type { Book } from "@/books/types";
import { chapterNumber } from "@/lib/book";
import { useProgress } from "@/lib/progress";

export default function PerspectivesView({ book }: { book: Book }) {
  const [progress] = useProgress(book);

  // Gelesene Einheiten nach Erzähler gruppieren, in der Reihenfolge ihres ersten Auftretens.
  const groups = new Map<string, string[]>();
  for (const section of book.sections) {
    section.units?.forEach((unit, k) => {
      if (!unit.pov || chapterNumber(book, section.id, k + 1) > progress) return;
      groups.set(unit.pov, [...(groups.get(unit.pov) ?? []), unit.name]);
    });
  }

  if (groups.size === 0) {
    return (
      <p className="text-sm text-muted">
        Noch keine Perspektive bekannt. Sobald du ein Kapitel gehört hast, siehst du hier, aus wessen Sicht es erzählt wurde.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {[...groups].map(([pov, names]) => (
        <li key={pov} className="rounded-2xl border border-line bg-card p-4">
          <p className="font-serif text-lg leading-snug">{pov}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{names.join(" · ")}</p>
        </li>
      ))}
    </ul>
  );
}
