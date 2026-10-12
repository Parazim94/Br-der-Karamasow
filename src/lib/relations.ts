import { chapterNumber } from "./book";

const at = chapterNumber;

// Position und Kurzname pro Figur im Graphen (viewBox 360 × 450).
export const LAYOUT: Record<string, { short: string; x: number; y: number }> = {
  miusow: { short: "Miusow", x: 50, y: 50 },
  fjodor: { short: "Fjodor", x: 180, y: 50 },
  smerdjakow: { short: "Smerdjakow", x: 310, y: 50 },
  dmitri: { short: "Dmitri", x: 60, y: 175 },
  iwan: { short: "Iwan", x: 180, y: 175 },
  aljoscha: { short: "Aljoscha", x: 300, y: 175 },
  katerina: { short: "Katerina", x: 60, y: 300 },
  gruschenka: { short: "Gruschenka", x: 180, y: 300 },
  sossima: { short: "Sossima", x: 300, y: 300 },
  rakitin: { short: "Rakitin", x: 180, y: 410 },
  chochlakowa: { short: "Chochlakowa", x: 300, y: 410 },
};

// Eine Beziehung kann sich mit dem Lesen verändern: es gilt immer die jüngste freigeschaltete Bezeichnung.
// aIs = was Person a für b ist (z. B. „Vater“), bIs = was b für a ist (z. B. „Sohn“).
export type Relation = {
  a: string;
  b: string;
  labels: { at: number; aIs: string; bIs: string }[];
};

export const RELATIONS: Relation[] = [
  {
    a: "fjodor",
    b: "dmitri",
    labels: [
      { at: at(1, 2), aIs: "Vater", bIs: "Sohn" },
      { at: at(2, 2), aIs: "Vater, im Streit ums Erbe", bIs: "Sohn, im Streit ums Erbe" },
    ],
  },
  { a: "fjodor", b: "iwan", labels: [{ at: at(1, 3), aIs: "Vater", bIs: "Sohn" }] },
  { a: "fjodor", b: "aljoscha", labels: [{ at: at(1, 4), aIs: "Vater", bIs: "Sohn" }] },
  { a: "dmitri", b: "iwan", labels: [{ at: at(1, 3), aIs: "Halbbruder", bIs: "Halbbruder" }] },
  { a: "dmitri", b: "aljoscha", labels: [{ at: at(1, 4), aIs: "Halbbruder", bIs: "Halbbruder" }] },
  { a: "iwan", b: "aljoscha", labels: [{ at: at(1, 4), aIs: "Bruder", bIs: "Bruder" }] },
  { a: "aljoscha", b: "sossima", labels: [{ at: at(1, 5), aIs: "Novize", bIs: "Geistlicher Lehrer" }] },
  { a: "fjodor", b: "miusow", labels: [{ at: at(2, 1), aIs: "Verwandter", bIs: "Verwandter" }] },
  { a: "chochlakowa", b: "sossima", labels: [{ at: at(2, 4), aIs: "Ratsuchende Besucherin", bIs: "Ratgeber" }] },
  { a: "aljoscha", b: "rakitin", labels: [{ at: at(2, 7), aIs: "Bekannter", bIs: "Bekannter" }] },
  { a: "fjodor", b: "smerdjakow", labels: [{ at: at(3, 6), aIs: "Hausherr", bIs: "Diener" }] },
  { a: "dmitri", b: "katerina", labels: [{ at: at(3, 3), aIs: "Verlobter", bIs: "Verlobte" }] },
];

/** Jüngste freigeschaltete Bezeichnung oder null, wenn die Beziehung noch unbekannt ist. */
export function currentLabel(r: Relation, progress: number) {
  const unlocked = r.labels.filter((l) => l.at <= progress);
  return unlocked.length ? unlocked[unlocked.length - 1] : null;
}
