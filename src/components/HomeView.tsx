"use client";

import Link from "next/link";
import { TOTAL_CHAPTERS, describe } from "@/lib/book";
import { CHARACTERS, isUnlocked } from "@/lib/characters";
import { useProgress } from "@/lib/progress";
import { summaryFor } from "@/lib/summaries";

export default function HomeView() {
  const [progress, setProgress] = useProgress();
  const percent = Math.round((progress / TOTAL_CHAPTERS) * 100);
  const unlocked = CHARACTERS.filter((c) => isUnlocked(c.unlockAt, progress)).length;
  const finished = progress >= TOTAL_CHAPTERS;
  const recap = summaryFor(progress);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl leading-tight">Die Brüder Karamasow</h1>
        <p className="mt-1 text-sm text-muted">Dein spoilerfreier Lesebegleiter</p>
      </header>

      <section className="rounded-2xl border border-line bg-card p-5">
        <p className="text-sm text-muted">Dein Stand</p>
        <p className="mt-1 font-serif text-xl">{describe(progress)}</p>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Lesefortschritt"
        >
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted">
          {progress} von {TOTAL_CHAPTERS} Kapiteln · {percent} %
        </p>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => setProgress(progress + 1)}
            disabled={finished}
            className="min-h-12 flex-1 rounded-xl bg-accent px-4 font-semibold text-accent-ink disabled:opacity-40"
          >
            Kapitel gelesen ✓
          </button>
          <button
            type="button"
            onClick={() => setProgress(progress - 1)}
            disabled={progress === 0}
            aria-label="Letztes Kapitel rückgängig machen"
            className="min-h-12 rounded-xl border border-line px-4 text-muted disabled:opacity-40"
          >
            ↩
          </button>
        </div>
        <Link href="/kapitel" className="mt-3 block text-center text-sm text-accent underline-offset-4 hover:underline">
          Stand an anderer Stelle setzen
        </Link>
      </section>

      {recap && (
        <section className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm text-muted">Zuletzt gelesen, kurz erinnert</p>
          <p className="mt-2 leading-relaxed">{recap.text}</p>
        </section>
      )}

      <section className="rounded-2xl border border-line bg-card p-5">
        <p className="text-sm text-muted">Figuren</p>
        <p className="mt-1 font-serif text-xl">
          {unlocked} von {CHARACTERS.length} freigeschaltet
        </p>
        <p className="mt-1 text-sm text-muted">Neue Figuren und Infos erscheinen, sobald du sie im Buch kennengelernt hast.</p>
        <Link href="/figuren" className="mt-3 inline-block text-sm font-semibold text-accent">
          Zu den Figuren →
        </Link>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <p className="text-sm text-muted">Philosophieren</p>
        <p className="mt-1 font-serif text-xl">Denk mit einer KI nach</p>
        <p className="mt-1 text-sm text-muted">Sokratisch oder als Advocatus Diaboli, ohne Spoiler.</p>
        <Link href="/denken" className="mt-3 inline-block text-sm font-semibold text-accent">
          Gespräch starten →
        </Link>
      </section>

      {progress === 0 && (
        <p className="text-sm leading-relaxed text-muted">
          Du hast noch nicht angefangen? Perfekt. Hier ist nichts gesperrt, was du brauchst, und nichts offen, was dir
          etwas verrät. Hake nach jedem gelesenen Kapitel ab, dann wächst die App mit dir.
        </p>
      )}
    </div>
  );
}
