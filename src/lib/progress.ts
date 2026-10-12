"use client";

import { useCallback, useSyncExternalStore } from "react";
import { TOTAL_CHAPTERS } from "./book";

// Fortschritt = Anzahl der gelesenen Kapitel (0 … TOTAL_CHAPTERS), lokal gespeichert.
const KEY = "karamasow:progress:v1";
const listeners = new Set<() => void>();

function read(): number {
  try {
    const n = parseInt(localStorage.getItem(KEY) ?? "0", 10);
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), TOTAL_CHAPTERS) : 0;
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

export function useProgress(): [number, (n: number) => void] {
  const progress = useSyncExternalStore(subscribe, read, () => 0);
  const set = useCallback((n: number) => {
    const clamped = Math.min(Math.max(Math.round(n), 0), TOTAL_CHAPTERS);
    try {
      localStorage.setItem(KEY, String(clamped));
    } catch {
      // Speicher gesperrt (z. B. privates Fenster): Fortschritt geht dann verloren.
    }
    listeners.forEach((l) => l());
  }, []);
  return [progress, set];
}
