import type { Book } from "../types";
import { CHARACTERS } from "./characters";
import { NODES, RELATIONS } from "./relations";
import { SECTIONS } from "./structure";
import { SUMMARIES } from "./summaries";

export const karamasow: Book = {
  slug: "karamasow",
  title: "Die Brüder Karamasow",
  author: "Dostojewski",
  sections: SECTIONS,
  characters: CHARACTERS,
  summaries: SUMMARIES,
  relations: RELATIONS,
  graph: { height: 480, nodes: NODES },
  ai: {
    starters: [
      "Kann man ohne Glauben moralisch leben?",
      "Ist Vergebung immer richtig?",
      "Wie viel Verantwortung trägt man für die eigene Familie?",
      "Macht Freiheit glücklich?",
    ],
  },
};
