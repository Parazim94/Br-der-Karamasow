// Struktur von „Die Brüder Karamasow“. Bewusst OHNE Buch- und Kapiteltitel:
// viele davon verraten Handlung. Kapitelzahlen können je nach Ausgabe leicht
// abweichen – bei Bedarf hier anpassen.

export type BookInfo = {
  id: number;
  part: string;
  label: string;
  chapters: number;
};

export const BOOKS: BookInfo[] = [
  { id: 1, part: "Teil I", label: "Buch 1", chapters: 5 },
  { id: 2, part: "Teil I", label: "Buch 2", chapters: 8 },
  { id: 3, part: "Teil I", label: "Buch 3", chapters: 11 },
  { id: 4, part: "Teil II", label: "Buch 4", chapters: 7 },
  { id: 5, part: "Teil II", label: "Buch 5", chapters: 7 },
  { id: 6, part: "Teil II", label: "Buch 6", chapters: 3 },
  { id: 7, part: "Teil III", label: "Buch 7", chapters: 4 },
  { id: 8, part: "Teil III", label: "Buch 8", chapters: 8 },
  { id: 9, part: "Teil III", label: "Buch 9", chapters: 9 },
  { id: 10, part: "Teil IV", label: "Buch 10", chapters: 7 },
  { id: 11, part: "Teil IV", label: "Buch 11", chapters: 10 },
  { id: 12, part: "Teil IV", label: "Buch 12", chapters: 14 },
  { id: 13, part: "Epilog", label: "Epilog", chapters: 3 },
];

const offsets = BOOKS.reduce<number[]>((acc, b, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + BOOKS[i - 1].chapters);
  return acc;
}, []);

export const TOTAL_CHAPTERS = BOOKS.reduce((sum, b) => sum + b.chapters, 0);

/** Globale Kapitelnummer (1-basiert) für Buch/Kapitel. */
export function chapterNumber(book: number, chapter: number): number {
  return offsets[book - 1] + chapter;
}

/** Umkehrung von chapterNumber. */
export function locate(n: number): { book: BookInfo; chapter: number } | null {
  if (n < 1 || n > TOTAL_CHAPTERS) return null;
  for (let i = BOOKS.length - 1; i >= 0; i--) {
    if (n > offsets[i]) return { book: BOOKS[i], chapter: n - offsets[i] };
  }
  return null;
}

export function describe(n: number): string {
  const loc = locate(n);
  return loc ? `${loc.book.label}, Kapitel ${loc.chapter}` : "noch nicht begonnen";
}
