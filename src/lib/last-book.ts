"use client";

import { useSyncExternalStore } from "react";

// Merkt sich das zuletzt geöffnete Buch, damit die Bibliothek es nach vorn stellen kann.
const KEY = "lesebegleiter:last-book";

export function rememberBook(slug: string): void {
  try {
    localStorage.setItem(KEY, slug);
  } catch {
    // Nur eine Annehmlichkeit.
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function useLastBook(): string | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
