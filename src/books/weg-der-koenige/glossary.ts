import type { GlossaryEntry } from "../types";
import { at } from "./structure";

// Begriffe, wie sie in den Kapiteltiteln und im Hörbuch vorkommen. Weitere folgen, sobald der
// Hörer meldet, welche Wörter er tatsächlich hört (die deutsche Übersetzung ist nicht überall bekannt).
const P = (n: number) => at("vorspiel", n);
const K = (n: number) => at("teil-1", n);

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: "alethi",
    term: "Alethi",
    aliases: ["Alethi", "Alethkar", "Aletis", "Aleti"],
    text: "Das Volk von König Gavilar. Es feiert im Prolog einen Friedensvertrag mit den Parschendi.",
    at: P(2),
  },
  {
    id: "parschendi",
    term: "Parschendi",
    aliases: ["Parschendi", "Parshendi", "Parschenti", "Barschendi"],
    text: "Das Volk, mit dem die Alethi im Prolog einen Friedensvertrag feiern.",
    at: P(2),
  },
  {
    id: "sturmgesegnet",
    term: "Sturmgesegnet",
    aliases: ["Sturmgesegnet", "Stormblessed", "Sturm gesegnet"],
    text: "Der Name, unter dem Kaladin bei seinen Soldaten bekannt ist. Das erste Kapitel trägt ihn als Titel.",
    at: K(1),
  },
  {
    id: "kharbranth",
    term: "Kharbranth",
    aliases: ["Kharbranth", "Karbranth", "Charbranth", "Karbrant", "Stadt der Glocken"],
    text: "Die „Stadt der Glocken“. Hier kommt Shallan per Schiff an. In der Stadt leben viele unterschiedliche Menschen, und ein König regiert sie.",
    at: K(3),
  },
  {
    id: "zerbrochene-ebene",
    term: "Zerbrochene Ebene",
    aliases: ["Zerbrochene Ebene", "Zerbrochene Ebenen", "Shattered Plains"],
    text: "Das Ziel von Kaladins Karawane: ein Ort, an dem mehrere Heerlager der Alethi liegen. Kaladin erkennt ihn am Ende des vierten Kapitels.",
    at: K(4),
  },
  {
    id: "bruecke-vier",
    term: "Brücke Vier",
    aliases: ["Brücke Vier", "Brückenmannschaft", "Brückenmannschaften", "Brückenmänner", "Bridge Four"],
    text: "Eine der Brückenmannschaften im Heerlager von Großprinz Sadeas. Sie tragen Brücken zu den Einsatzorten und setzen sie dort ein, dabei sind sie Pfeilbeschuss ausgesetzt. Kaladin wird einer solchen Mannschaft zugeteilt.",
    at: K(6),
  },
];
