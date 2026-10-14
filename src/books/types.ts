// Datenmodell eines Buchs. Alles hier ist reine, serialisierbare Daten (keine Funktionen),
// damit Server-Seiten ein Buch direkt an Client-Komponenten übergeben können.

/** Ein Abschnitt des Buchs (z. B. „Buch 2“, „Teil I“, „Epilog“) mit seiner Kapitelzahl. */
export type Section = {
  id: string;
  /** Übergeordnete Gruppe, z. B. „Teil I“. Abschnitte mit gleichem `part` stehen unter einer Überschrift. */
  part?: string;
  label: string;
  chapters: number;
};

// Jede Info ist erst sichtbar, wenn `at` (globale Kapitelnummer) gelesen ist.
// Regel: Eine Info darf nur Wissen enthalten, das das Buch bis dahin preisgibt.
// Freischaltpunkte sind bewusst eher zu spät als zu früh gesetzt.
export type Fact = { at: number; text: string };

export type Character = {
  id: string;
  name: string;
  aliases: string[];
  role: string;
  unlockAt: number;
  facts: Fact[];
};

/** Kurze Erinnerungsstütze zu einem Kapitel, sichtbar erst nach dem Lesen. */
export type Summary = { at: number; text: string };

// Eine Beziehung kann sich mit dem Lesen verändern: es gilt immer die jüngste freigeschaltete Bezeichnung.
// aIs = was Person a für b ist (z. B. „Vater“), bIs = was b für a ist (z. B. „Sohn“).
export type Relation = {
  a: string;
  b: string;
  labels: { at: number; aIs: string; bIs: string }[];
};

/** Position und Kurzname einer Figur in der Beziehungskarte (Breite der Zeichenfläche: 360). */
export type GraphNode = { short: string; x: number; y: number };

/** Seiten eines Buchs, die in der Navigation vorkommen können. */
export type NavId = "heute" | "kapitel" | "figuren" | "notizen" | "tipps" | "beziehungen" | "denken";

export type Book = {
  slug: string;
  title: string;
  author: string;
  sections: Section[];
  characters: Character[];
  summaries: Summary[];
  relations: Relation[];
  graph: { height: number; nodes: Record<string, GraphNode> };
  /**
   * Untere Leiste: `tabs` stehen direkt in der Leiste (höchstens 5, mit `more` höchstens 4),
   * `more` erscheint gesammelt hinter dem Tab „Mehr“.
   */
  nav: { tabs: NavId[]; more?: NavId[] };
  /** Nur Bücher mit KI-Gespräch haben diesen Eintrag. */
  ai?: { starters: string[] };
};
