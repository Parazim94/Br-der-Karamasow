import type { Book, Section, Unit } from "@/books/types";

// Funktionen rund um den Aufbau eines Buchs. Kapitel werden fortlaufend über alle Abschnitte
// gezählt („globale Kapitelnummer“, 1-basiert); der Lesestand ist die Anzahl gelesener Kapitel.

type Structure = Pick<Book, "sections">;

/** Baut für eine Abschnittsliste die Funktion (Abschnitt, Kapitel) → globale Kapitelnummer. */
export function makeAt(sections: Section[]) {
  return (section: string | number, chapter: number): number => {
    let offset = 0;
    for (const s of sections) {
      if (s.id === String(section)) return offset + chapter;
      offset += s.chapters;
    }
    throw new Error(`Unbekannter Abschnitt: ${section}`);
  };
}

export function totalChapters(book: Structure): number {
  return book.sections.reduce((sum, s) => sum + s.chapters, 0);
}

export function chapterNumber(book: Structure, section: string | number, chapter: number): number {
  return makeAt(book.sections)(section, chapter);
}

/** Umkehrung von chapterNumber. */
export function locate(book: Structure, n: number): { section: Section; chapter: number } | null {
  let offset = 0;
  for (const section of book.sections) {
    if (n > offset && n <= offset + section.chapters) return { section, chapter: n - offset };
    offset += section.chapters;
  }
  return null;
}

/** Die benannte Einheit zur globalen Kapitelnummer (nur bei Büchern mit `units`). */
export function unitAt(book: Structure, n: number): Unit | null {
  const loc = locate(book, n);
  return loc?.section.units?.[loc.chapter - 1] ?? null;
}

/** Name der Einheit: „Kapitel 12“, „Zwischenspiel 3“ … */
export function unitName(book: Structure, n: number): string {
  const loc = locate(book, n);
  if (!loc) return "";
  return loc.section.units?.[loc.chapter - 1]?.name ?? `Kapitel ${loc.chapter}`;
}

/** Text auf dem Knopf im Kapitelraster. */
export function unitMark(unit: Unit | undefined, index: number): string {
  return unit?.mark ?? unit?.name.match(/(\d+)\s*$/)?.[1] ?? String(index + 1);
}

export function describe(book: Structure, n: number): string {
  const loc = locate(book, n);
  if (!loc) return "noch nicht begonnen";
  const unit = loc.section.units?.[loc.chapter - 1];
  return unit ? unit.name : `${loc.section.label}, Kapitel ${loc.chapter}`;
}
