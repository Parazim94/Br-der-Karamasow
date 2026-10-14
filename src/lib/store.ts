"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ensureMigrated } from "./keys";

// Kleine Liste im localStorage mit stabilem Snapshot (nur neu geparst, wenn sich der Rohtext ändert).
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown[] }>();
const EMPTY: never[] = [];

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function readList(key: string): unknown[] {
  let raw: string | null = null;
  try {
    ensureMigrated();
    raw = localStorage.getItem(key);
  } catch {
    return EMPTY;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value;
  let value: unknown[] = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) value = parsed;
  } catch {
    // Kaputte Daten werden wie eine leere Liste behandelt.
  }
  cache.set(key, { raw, value });
  return value;
}

export function useStoredList<T>(key: string): [T[], (update: (prev: T[]) => T[]) => void] {
  const list = useSyncExternalStore(
    subscribe,
    () => readList(key),
    () => EMPTY,
  ) as T[];

  const update = useCallback(
    (fn: (prev: T[]) => T[]) => {
      const next = fn(readList(key) as T[]);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Speicher gesperrt: Änderung geht verloren.
      }
      listeners.forEach((l) => l());
    },
    [key],
  );

  return [list, update];
}

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("de-DE", { day: "numeric", month: "short", year: "numeric" });
}
