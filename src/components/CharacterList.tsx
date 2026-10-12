"use client";

import Link from "next/link";
import { useState } from "react";
import { CHARACTERS, isUnlocked, matches } from "@/lib/characters";
import { useProgress } from "@/lib/progress";

export default function CharacterList() {
  const [progress] = useProgress();
  const [query, setQuery] = useState("");

  const visible = CHARACTERS.filter((c) => isUnlocked(c.unlockAt, progress));
  const hidden = CHARACTERS.length - visible.length;
  const results = visible.filter((c) => matches(c, query));

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="sr-only">Figur oder Spitznamen suchen</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name oder Spitzname, z. B. „Mitja“"
          className="min-h-12 w-full rounded-xl border border-line bg-card px-4 text-base outline-none focus:border-accent"
        />
      </label>

      {visible.length === 0 && (
        <p className="text-sm text-muted">
          Noch keine Figuren freigeschaltet. Sobald du Kapitel abgehakt hast, erscheinen hier die Personen, die du
          kennengelernt hast.
        </p>
      )}

      <ul className="space-y-3">
        {results.map((c) => (
          <li key={c.id}>
            <Link href={`/figuren/${c.id}`} className="block rounded-2xl border border-line bg-card p-4 active:bg-line">
              <p className="font-serif text-lg leading-snug">{c.name}</p>
              <p className="mt-0.5 text-sm text-muted">{c.role}</p>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length > 0 && results.length === 0 && (
        <p className="text-sm text-muted">Niemand gefunden. Vielleicht kommt die Figur erst später im Buch.</p>
      )}

      {hidden > 0 && (
        <p className="pt-2 text-center text-xs text-muted">
          Weitere Figuren folgen, während du liest.
        </p>
      )}
    </div>
  );
}
