"use client";

import Link from "next/link";
import { CHARACTERS, isUnlocked } from "@/lib/characters";
import { useProgress } from "@/lib/progress";

export default function CharacterView({ id }: { id: string }) {
  const [progress] = useProgress();
  const c = CHARACTERS.find((x) => x.id === id);

  const back = (
    <Link href="/figuren" className="mb-4 inline-block text-sm text-accent">
      ← Alle Figuren
    </Link>
  );

  if (!c || !isUnlocked(c.unlockAt, progress)) {
    return (
      <div>
        {back}
        <p className="font-serif text-2xl">Noch gesperrt</p>
        <p className="mt-2 text-sm text-muted">Diese Figur lernst du erst beim Lesen kennen.</p>
      </div>
    );
  }

  const shown = c.facts.filter((f) => isUnlocked(f.at, progress));
  const locked = c.facts.length - shown.length;

  return (
    <article>
      {back}
      <h1 className="font-serif text-3xl leading-tight">{c.name}</h1>
      <p className="mt-1 text-muted">{c.role}</p>

      <section className="mt-5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Auch genannt</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {[...new Set(c.aliases)].map((a) => (
            <li key={a} className="rounded-full border border-line bg-card px-3 py-1 text-sm">
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Was du bisher weißt</h2>
        {shown.map((f) => (
          <p key={f.text} className="rounded-2xl border border-line bg-card p-4 leading-relaxed">
            {f.text}
          </p>
        ))}
        {locked > 0 && (
          <p className="text-center text-xs text-muted">Mehr erfährst du beim Weiterlesen.</p>
        )}
      </section>
    </article>
  );
}
