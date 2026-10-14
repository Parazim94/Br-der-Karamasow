import type { Book } from "../types";
import { CHARACTERS } from "./characters";
import { GLOSSARY } from "./glossary";
import { SECTIONS } from "./structure";
import { SUMMARIES } from "./summaries";

// Aufbau nach der Audible-Kapitelliste; Inhalte bisher bis Kapitel 6 (erste Welle).
export const wegDerKoenige: Book = {
  slug: "weg-der-koenige",
  title: "Der Weg der Könige",
  author: "Brandon Sanderson",
  sections: SECTIONS,
  characters: CHARACTERS,
  summaries: SUMMARIES,
  glossary: GLOSSARY,
  relations: [],
  graph: { height: 400, nodes: {} },
  nav: {
    tabs: ["heute", "kapitel", "figuren", "glossar"],
    more: ["notizen", "tipps", "perspektiven"],
  },
};
