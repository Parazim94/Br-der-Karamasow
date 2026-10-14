import type { Book, Character, GlossaryEntry, Relation } from "@/books/types";

export function isUnlocked(unlockAt: number, progress: number): boolean {
  return unlockAt <= progress;
}

export function matchesTerm(g: GlossaryEntry, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  return [g.term, ...g.aliases].some((n) => normalize(n).includes(q));
}

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function matches(c: Character, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  return [c.name, ...c.aliases].some((n) => normalize(n).includes(q));
}

/** Jüngste freigeschaltete Bezeichnung oder null, wenn die Beziehung noch unbekannt ist. */
export function currentLabel(r: Relation, progress: number) {
  const unlocked = r.labels.filter((l) => l.at <= progress);
  return unlocked.length ? unlocked[unlocked.length - 1] : null;
}

/** Rückblick auf genau dieses Kapitel (oder null). */
export function summaryFor(book: Pick<Book, "summaries">, n: number) {
  return book.summaries.find((x) => x.at === n) ?? null;
}
