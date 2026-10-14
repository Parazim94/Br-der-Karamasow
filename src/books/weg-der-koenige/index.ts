import type { Book } from "../types";
import { CHARACTERS } from "./characters";
import { GLOSSARY } from "./glossary";
import { NODES, RELATIONS } from "./relations";
import { SECTIONS } from "./structure";
import { SUMMARIES } from "./summaries";

// Aufbau nach der Audible-Kapitelliste; Inhalte bisher bis Kapitel 11 (zwei Wellen).
export const wegDerKoenige: Book = {
  slug: "weg-der-koenige",
  title: "Der Weg der Könige",
  author: "Brandon Sanderson",
  sections: SECTIONS,
  characters: CHARACTERS,
  summaries: SUMMARIES,
  glossary: GLOSSARY,
  relations: RELATIONS,
  graph: { height: 750, nodes: NODES },
  nav: {
    tabs: ["heute", "kapitel", "figuren", "glossar"],
    more: ["beziehungen", "notizen", "tipps", "perspektiven"],
  },
};
