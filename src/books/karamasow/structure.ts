import { makeAt } from "@/lib/book";
import type { Section } from "../types";

// Aufbau von „Die Brüder Karamasow“. Bewusst OHNE Buch- und Kapiteltitel:
// viele davon verraten Handlung. Kapitelzahlen können je nach Ausgabe leicht
// abweichen – bei Bedarf hier anpassen.
export const SECTIONS: Section[] = [
  { id: "1", part: "Teil I", label: "Buch 1", chapters: 5 },
  { id: "2", part: "Teil I", label: "Buch 2", chapters: 8 },
  { id: "3", part: "Teil I", label: "Buch 3", chapters: 11 },
  { id: "4", part: "Teil II", label: "Buch 4", chapters: 7 },
  { id: "5", part: "Teil II", label: "Buch 5", chapters: 7 },
  { id: "6", part: "Teil II", label: "Buch 6", chapters: 3 },
  { id: "7", part: "Teil III", label: "Buch 7", chapters: 4 },
  { id: "8", part: "Teil III", label: "Buch 8", chapters: 8 },
  { id: "9", part: "Teil III", label: "Buch 9", chapters: 9 },
  { id: "10", part: "Teil IV", label: "Buch 10", chapters: 7 },
  { id: "11", part: "Teil IV", label: "Buch 11", chapters: 10 },
  { id: "12", part: "Teil IV", label: "Buch 12", chapters: 14 },
  { id: "13", part: "Epilog", label: "Epilog", chapters: 3 },
];

/** (Buch, Kapitel) → globale Kapitelnummer, z. B. at(2, 4) für Buch 2, Kapitel 4. */
export const at = makeAt(SECTIONS);
