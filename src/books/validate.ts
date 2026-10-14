import { totalChapters } from "@/lib/book";
import type { Book } from "./types";

/**
 * Prüft ein Buch beim Start (und damit beim Build) auf Fehler, die sonst erst als leere oder
 * falsche Seite auffallen würden: Tippfehler in Kennungen, Kapitelnummern außerhalb des Buchs,
 * eine Navigation, die nicht in die Leiste passt.
 */
export function validateBook(book: Book): void {
  const errors: string[] = [];
  const err = (msg: string) => errors.push(msg);
  const total = totalChapters(book);
  const inRange = (n: number) => Number.isInteger(n) && n >= 1 && n <= total;

  if (!/^[a-z0-9-]+$/.test(book.slug)) err(`Kennung „${book.slug}“ darf nur a–z, 0–9 und - enthalten`);
  if (["api", "mehr", "kapitel", "figuren", "beziehungen", "notizen", "tipps", "denken"].includes(book.slug)) {
    err(`Kennung „${book.slug}“ ist für die App reserviert`);
  }
  if (new Set(book.sections.map((s) => s.id)).size !== book.sections.length) err("Abschnitts-Kennungen sind nicht eindeutig");

  for (const s of book.sections) {
    if (s.units && s.units.length !== s.chapters) {
      err(`Abschnitt „${s.id}“: ${s.chapters} Kapitel, aber ${s.units.length} benannte Einheiten`);
    }
  }
  const unitNames = book.sections.flatMap((s) => s.units?.map((u) => u.name) ?? []);
  if (new Set(unitNames).size !== unitNames.length) err("Einheiten-Namen sind nicht eindeutig");

  const ids = new Set<string>();
  for (const c of book.characters) {
    if (ids.has(c.id)) err(`Figur „${c.id}“ kommt doppelt vor`);
    ids.add(c.id);
    if (!inRange(c.unlockAt)) err(`Figur „${c.id}“: Freischaltpunkt ${c.unlockAt} liegt außerhalb des Buchs`);
    for (const f of c.facts) if (!inRange(f.at)) err(`Figur „${c.id}“: Info bei ${f.at} liegt außerhalb des Buchs`);
  }
  for (const s of book.summaries) if (!inRange(s.at)) err(`Rückblick bei ${s.at} liegt außerhalb des Buchs`);
  for (const r of book.relations) {
    for (const id of [r.a, r.b]) if (!ids.has(id)) err(`Beziehung ${r.a}–${r.b}: unbekannte Figur „${id}“`);
    for (const l of r.labels) if (!inRange(l.at)) err(`Beziehung ${r.a}–${r.b}: Stelle ${l.at} liegt außerhalb des Buchs`);
  }
  for (const id of Object.keys(book.graph.nodes)) if (!ids.has(id)) err(`Beziehungskarte: unbekannte Figur „${id}“`);

  const more = book.nav.more ?? [];
  const all = [...book.nav.tabs, ...more];
  const max = more.length > 0 ? 4 : 5;
  if (book.nav.tabs.length === 0) err("Navigation hat keine Tabs");
  if (book.nav.tabs.length > max) err(`Navigation: höchstens ${max} Tabs${more.length > 0 ? " (plus „Mehr“)" : ""}, gefunden ${book.nav.tabs.length}`);
  if (new Set(all).size !== all.length) err("Navigation enthält ein Ziel doppelt");
  if (all.includes("beziehungen") && book.relations.length === 0) err("Navigation verweist auf Beziehungen, aber das Buch hat keine");
  if (all.includes("denken") && !book.ai) err("Navigation verweist auf das KI-Gespräch, aber das Buch hat keins");

  if (errors.length > 0) throw new Error(`Buch „${book.slug}“ ist fehlerhaft:\n- ${errors.join("\n- ")}`);
}
