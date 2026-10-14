import { makeAt } from "@/lib/book";
import type { Section, Unit } from "../types";

// Aufbau nach der Kapitelliste des Hörbuchs bei Audible („Der Weg der Könige“, Teil 1 bis 3).
// Nicht gezählt werden „Vorspann“ und „Schlussbemerkung“: Sie gehören nicht zur Geschichte.
// Die Einheiten stehen in der Reihenfolge, in der man sie hört.

// Aus wessen Sicht eine Einheit erzählt wird. Wächst mit den Inhalten.
const POV: Record<string, string> = {
  Präludium: "Kalak",
  Prolog: "Szeth",
  "Kapitel 1": "Cenn",
  "Kapitel 2": "Kaladin",
  "Kapitel 3": "Shallan",
  "Kapitel 4": "Kaladin",
  "Kapitel 5": "Shallan",
  "Kapitel 6": "Kaladin",
  "Kapitel 7": "Shallan",
  "Kapitel 8": "Shallan",
  "Kapitel 9": "Kaladin",
  "Kapitel 10": "Kaladin",
  "Kapitel 11": "Kaladin",
};

const unit = (name: string, title?: string, mark?: string): Unit => ({
  name,
  ...(title ? { title } : {}),
  ...(mark ? { mark } : {}),
  ...(POV[name] ? { pov: POV[name] } : {}),
});
const chapters = (from: number, titles: string[]): Unit[] => titles.map((t, i) => unit(`Kapitel ${from + i}`, t));
const interludes = (from: number, titles: string[]): Unit[] =>
  titles.map((t, i) => unit(`Zwischenspiel ${from + i}`, t));
const section = (s: Omit<Section, "chapters"> & { units: Unit[] }): Section => ({ ...s, chapters: s.units.length });

export const SECTIONS: Section[] = [
  section({
    id: "vorspiel",
    label: "Vorspiel",
    units: [unit("Präludium", undefined, "Prä"), unit("Prolog", "Töten", "Pro")],
  }),
  section({
    id: "teil-1",
    part: "Erster Teil: Über dem Schweigen",
    label: "Kapitel 1–11",
    units: chapters(1, [
      "Sturmgesegnet",
      "Die Ehre ist tot",
      "Die Stadt der Glocken",
      "Zerbrochene Ebene",
      "Häretisch",
      "Brücke Vier",
      "Alles, was vernünftig ist",
      "Näher zur Flamme",
      "Verdammnis",
      "Geschichten über Chirurgen",
      "Tropfen",
    ]),
  }),
  section({
    id: "zwischenspiele-1",
    label: "Zwischenspiele 1–3",
    units: interludes(1, ["Ischikk", "Nan Balat", "Der Segen der Unwissenheit"]),
  }),
  section({
    id: "teil-2",
    part: "Zweiter Teil: Die leuchtenden Stürme",
    label: "Kapitel 12–28",
    units: chapters(12, [
      "Einheit",
      "Zehn Herzschläge",
      "Zahltag",
      "Der Köder",
      "Kokons",
      "Ein blutroter Sonnenuntergang",
      "Der Großprinz des Krieges",
      "Der Sturz der Sterne",
      "Scharlachrot",
      "Warum Menschen lügen",
      "Augen, Hände oder Kugeln?",
      "Vielseitig",
      "Die Galerie der Landkarten",
      "Der Schlächter",
      "Stille",
      "Kluftdienst",
      "Entscheidung",
    ]),
  }),
  section({
    id: "zwischenspiele-2",
    label: "Zwischenspiele 4–6",
    units: interludes(4, ["Rysn", "Der Sammler Axies", "Ein Kunstwerk"]),
  }),
  section({
    id: "teil-3",
    part: "Dritter Teil: Sterben",
    label: "Kapitel 29–36",
    units: chapters(29, [
      "Irrmassung",
      "Unsichtbare Finsternis",
      "Unter der Haut",
      "Seitentragen",
      "Cymatik",
      "Sturmwand",
      "Ein Licht zu sehen",
      "Die Lektion",
    ]),
  }),
];

/** (Abschnitt, Nummer innerhalb des Abschnitts) → globale Nummer, z. B. at("teil-2", 4) für Kapitel 15. */
export const at = makeAt(SECTIONS);
