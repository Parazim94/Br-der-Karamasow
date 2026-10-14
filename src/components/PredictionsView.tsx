"use client";

import { useState } from "react";
import type { Book } from "@/books/types";
import { describe } from "@/lib/book";
import { useProgress } from "@/lib/progress";
import { storageKey } from "@/lib/keys";
import { formatDate, newId, useStoredList } from "@/lib/store";

type Result = "open" | "hit" | "near" | "miss";
type Prediction = { id: string; createdAt: number; at: number; text: string; result: Result };

const PROMPTS = [
  "Wer wird mir am sympathischsten sein?",
  "Worauf läuft die Geschichte meiner Meinung nach hinaus?",
  "Wie wird sich die Familie entwickeln?",
  "Welche Figur ist mir noch ein Rätsel?",
];

const LABELS: Record<Exclude<Result, "open">, string> = {
  hit: "Getroffen",
  near: "Knapp daneben",
  miss: "Daneben",
};

export default function PredictionsView({ book }: { book: Book }) {
  const [progress] = useProgress(book);
  const [items, update] = useStoredList<Prediction>(storageKey(book.slug, "predictions"));
  const [text, setText] = useState("");

  function add() {
    const t = text.trim();
    if (!t) return;
    update((prev) => [{ id: newId(), createdAt: Date.now(), at: progress, text: t, result: "open" }, ...prev]);
    setText("");
  }

  function resolve(id: string, result: Result) {
    update((prev) => prev.map((p) => (p.id === id ? { ...p, result } : p)));
  }

  const closed = items.filter((p) => p.result !== "open");
  const hits = closed.filter((p) => p.result === "hit").length;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-line bg-card p-4">
        <p className="text-xs text-muted">Dein Tipp bei: {describe(book, progress)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setText(p + " ")}
              className="min-h-11 rounded-full border border-line px-3 text-left text-xs text-muted"
            >
              {p}
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          aria-label="Dein Tipp"
          placeholder="Was erwartest du?"
          className="mt-3 w-full resize-y rounded-xl border border-line bg-paper p-3 text-base outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={add}
          disabled={!text.trim()}
          className="mt-3 min-h-11 w-full rounded-xl bg-accent px-5 font-semibold text-accent-ink disabled:opacity-40"
        >
          Tipp festhalten
        </button>
      </section>

      {closed.length > 0 && (
        <p className="text-center text-sm text-muted">
          {hits} von {closed.length} aufgelösten Tipps getroffen
        </p>
      )}

      <ul className="space-y-3">
        {items.map((p) => (
          <li key={p.id} className="rounded-2xl border border-line bg-card p-4">
            <p className="text-xs text-muted">
              {describe(book, p.at)} · {formatDate(p.createdAt)}
              {p.result !== "open" && ` · ${LABELS[p.result]}`}
            </p>
            <p className="mt-2 whitespace-pre-wrap leading-relaxed">{p.text}</p>
            {p.result === "open" ? (
              <div className="mt-3">
                <p className="text-xs text-muted">Aufgelöst?</p>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {(Object.keys(LABELS) as (keyof typeof LABELS)[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => resolve(p.id, r)}
                      className="min-h-11 rounded-xl border border-line px-1 text-xs"
                    >
                      {LABELS[r]}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => resolve(p.id, "open")} className="mt-2 min-h-11 text-sm text-muted">
                Wieder öffnen
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Tipp löschen?")) update((prev) => prev.filter((x) => x.id !== p.id));
              }}
              className="ml-4 mt-2 min-h-11 text-sm text-muted"
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="text-sm text-muted">
          Schreib auf, was du erwartest, bevor du weiterliest, und prüfe es danach. Hier steht nur, was du selbst tippst.
        </p>
      )}
    </div>
  );
}
