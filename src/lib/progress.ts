"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Book } from "@/books/types";
import { totalChapters } from "./book";
import { ensureMigrated, storageKey } from "./keys";

// Fortschritt = Anzahl der gelesenen Kapitel (0 … Kapitelzahl), lokal gespeichert.
const listeners = new Set<() => void>();

function read(key: string, total: number): number {
  try {
    ensureMigrated();
    const n = parseInt(localStorage.getItem(key) ?? "0", 10);
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), total) : 0;
  } catch {
    return 0;
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useProgress(book: Pick<Book, "slug" | "sections">): [number, (n: number) => void] {
  const total = totalChapters(book);
  const key = storageKey(book.slug, "progress");
  const progress = useSyncExternalStore(
    subscribe,
    () => read(key, total),
    () => 0,
  );
  const set = useCallback(
    (n: number) => {
      const clamped = Math.min(Math.max(Math.round(n), 0), total);
      try {
        localStorage.setItem(key, String(clamped));
      } catch {
        // Speicher gesperrt (z. B. privates Fenster): Fortschritt geht dann verloren.
      }
      listeners.forEach((l) => l());
    },
    [key, total],
  );
  return [progress, set];
}
