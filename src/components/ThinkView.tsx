"use client";

import { useEffect, useRef, useState } from "react";
import { describe } from "@/lib/book";
import { STARTERS, type Mode } from "@/lib/philosophy";
import { useProgress } from "@/lib/progress";

type Msg = { role: "user" | "assistant"; text: string };

const PASS_KEY = "karamasow:passphrase:v1";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "sokrates", label: "Sokrates", hint: "Stellt dir Fragen, damit du deine Position klärst." },
  { id: "advocatus", label: "Advocatus Diaboli", hint: "Hält dagegen, so stark er kann." },
];

function loadPass(): string {
  try {
    return localStorage.getItem(PASS_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function ThinkView() {
  const [progress] = useProgress();
  const [mode, setMode] = useState<Mode>("sokrates");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gespeichertes Passwort erst nach dem Hydrieren lesen, damit Server und Client übereinstimmen.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPass(loadPass());
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || loading) return;
    const next: Msg[] = [...messages, { role: "user", text: t }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/denken", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-passphrase": pass },
        body: JSON.stringify({ messages: next, mode, progress }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Etwas ist schiefgelaufen.");
        return;
      }
      try {
        localStorage.setItem(PASS_KEY, pass);
      } catch {
        // Passwort muss dann beim nächsten Mal neu eingegeben werden.
      }
      setMessages([...next, { role: "assistant", text: data.text }]);
    } catch {
      setError("Keine Verbindung. Die KI braucht Internet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Gesprächsmodus" className="grid grid-cols-2 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`min-h-12 rounded-xl border px-2 text-sm font-semibold ${
              mode === m.id ? "border-accent bg-accent text-accent-ink" : "border-line bg-card"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted">{MODES.find((m) => m.id === mode)?.hint}</p>
      <p className="text-xs text-muted">
        Die KI kennt nur den Stand bis: {describe(progress)}. Sie kann sich trotzdem einmal irren oder etwas verraten.
      </p>

      {messages.length === 0 && (
        <ul className="flex flex-col gap-2">
          {STARTERS.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => send(s)}
                className="min-h-12 w-full rounded-xl border border-line bg-card px-4 text-left text-sm"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}

      <ul className="space-y-3" aria-live="polite">
        {messages.map((m, i) => (
          <li
            key={i}
            className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 leading-relaxed ${
              m.role === "user" ? "ml-auto bg-accent text-accent-ink" : "border border-line bg-card"
            }`}
          >
            {m.text}
          </li>
        ))}
        {loading && <li className="text-sm text-muted">Denkt nach …</li>}
      </ul>

      {error && (
        <p role="alert" className="rounded-xl border border-accent px-4 py-3 text-sm">
          {error}
        </p>
      )}

      {(!pass || error === "Falsches Passwort.") && (
        <label className="block">
          <span className="text-xs text-muted">Passwort</span>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="off"
            className="mt-1 min-h-12 w-full rounded-xl border border-line bg-card px-4 text-base outline-none focus:border-accent"
          />
        </label>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          maxLength={1500}
          aria-label="Deine Nachricht"
          placeholder="Deine Gedanken …"
          className="w-full resize-none rounded-xl border border-line bg-card p-3 text-base outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="min-h-12 self-end rounded-xl bg-accent px-4 font-semibold text-accent-ink disabled:opacity-40"
        >
          Senden
        </button>
      </form>

      {messages.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setMessages([]);
            setError(null);
          }}
          className="min-h-11 text-sm text-muted"
        >
          Neues Gespräch
        </button>
      )}
      <div ref={endRef} />
    </div>
  );
}
