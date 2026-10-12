"use client";

import { useState } from "react";
import { describe } from "@/lib/book";
import { useProgress } from "@/lib/progress";
import { formatDate, newId, useStoredList } from "@/lib/store";

type Note = { id: string; createdAt: number; at: number; text: string; quote: boolean };

export default function NotesView() {
  const [progress] = useProgress();
  const [notes, update] = useStoredList<Note>("karamasow:notes:v1");
  const [text, setText] = useState("");
  const [quote, setQuote] = useState(false);
  const [onlyQuotes, setOnlyQuotes] = useState(false);

  function add() {
    const t = text.trim();
    if (!t) return;
    update((prev) => [{ id: newId(), createdAt: Date.now(), at: progress, text: t, quote }, ...prev]);
    setText("");
    setQuote(false);
  }

  function exportNotes() {
    const lines = [...notes]
      .reverse()
      .map((n) => `[${describe(n.at)} · ${formatDate(n.createdAt)}]${n.quote ? " Zitat" : ""}\n${n.text}\n`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "karamasow-notizen.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const shown = onlyQuotes ? notes.filter((n) => n.quote) : notes;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-line bg-card p-4">
        <label className="block">
          <span className="text-xs text-muted">Notiz zu: {describe(progress)}</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Gedanke, Frage oder Lieblingsstelle …"
            className="mt-2 w-full resize-y rounded-xl border border-line bg-paper p-3 text-base outline-none focus:border-accent"
          />
        </label>
        <div className="mt-3 flex items-center justify-between gap-3">
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={quote} onChange={(e) => setQuote(e.target.checked)} className="size-5 accent-[var(--accent)]" />
            Ist ein Zitat
          </label>
          <button
            type="button"
            onClick={add}
            disabled={!text.trim()}
            className="min-h-11 rounded-xl bg-accent px-5 font-semibold text-accent-ink disabled:opacity-40"
          >
            Speichern
          </button>
        </div>
      </section>

      {notes.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setOnlyQuotes((v) => !v)}
            aria-pressed={onlyQuotes}
            className={`min-h-11 rounded-full border px-4 ${onlyQuotes ? "border-accent text-accent" : "border-line text-muted"}`}
          >
            Nur Zitate
          </button>
          <button type="button" onClick={exportNotes} className="min-h-11 px-2 text-accent">
            Exportieren
          </button>
        </div>
      )}

      <ul className="space-y-3">
        {shown.map((n) => (
          <li key={n.id} className="rounded-2xl border border-line bg-card p-4">
            <p className="text-xs text-muted">
              {describe(n.at)} · {formatDate(n.createdAt)}
              {n.quote && " · Zitat"}
            </p>
            <p className={`mt-2 whitespace-pre-wrap leading-relaxed ${n.quote ? "font-serif italic" : ""}`}>{n.text}</p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Notiz löschen?")) update((prev) => prev.filter((x) => x.id !== n.id));
              }}
              className="mt-2 min-h-11 text-sm text-muted"
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>

      {notes.length === 0 && <p className="text-sm text-muted">Noch keine Notizen. Die erste kommt bestimmt bald.</p>}
    </div>
  );
}
