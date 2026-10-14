import type { Book } from "../types";
import { SECTIONS } from "./structure";

// Gerüst: Aufbau steht, Inhalte (Figuren, Rückblicke, Glossar) folgen, wenn gehört wird.
export const wegDerKoenige: Book = {
  slug: "weg-der-koenige",
  title: "Der Weg der Könige",
  author: "Brandon Sanderson",
  sections: SECTIONS,
  characters: [],
  summaries: [],
  relations: [],
  graph: { height: 400, nodes: {} },
  nav: { tabs: ["heute", "kapitel", "notizen", "tipps"] },
};
