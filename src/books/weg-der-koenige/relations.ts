import type { GraphNode, Relation } from "../types";
import { at } from "./structure";

const P = (n: number) => at("vorspiel", n);
const K = (n: number) => at("teil-1", n);

// Zeichenfläche 360 × 750: oben die Gestalten aus Präludium und Prolog, in der Mitte Kaladin mit seinem
// Umfeld, unten Shallan und Jasnah.
export const NODES: Record<string, GraphNode> = {
  kalak: { short: "Kalak", x: 60, y: 50 },
  jezrien: { short: "Jezrien", x: 150, y: 50 },
  szeth: { short: "Szeth", x: 240, y: 50 },
  gavilar: { short: "Gavilar", x: 320, y: 50 },
  dalinar: { short: "Dalinar", x: 320, y: 160 },

  kaladin: { short: "Kaladin", x: 180, y: 340 },
  cenn: { short: "Cenn", x: 180, y: 225 },
  tvlakv: { short: "Tvlakv", x: 261, y: 259 },
  lirin: { short: "Lirin", x: 295, y: 340 },
  tien: { short: "Tien", x: 261, y: 421 },
  syl: { short: "Syl", x: 180, y: 455 },
  gaz: { short: "Gaz", x: 99, y: 421 },
  amaram: { short: "Amaram", x: 65, y: 340 },
  dallet: { short: "Dallet", x: 99, y: 259 },

  shallan: { short: "Shallan", x: 70, y: 575 },
  jasnah: { short: "Jasnah", x: 190, y: 575 },
  taravangian: { short: "Taravangian", x: 305, y: 575 },
  kabsal: { short: "Kabsal", x: 70, y: 690 },
};

// aIs = was a für b ist, bIs = was b für a ist (Beispiel a=lirin, b=kaladin: aIs „Vater“, bIs „Sohn“).
// Beim Antippen von X erscheint, was die anderen für X sind. Es gilt immer die jüngste freigeschaltete Bezeichnung.
export const RELATIONS: Relation[] = [
  { a: "kalak", b: "jezrien", labels: [{ at: P(1), aIs: "Gefährte", bIs: "Anführer" }] },
  { a: "szeth", b: "gavilar", labels: [{ at: P(2), aIs: "Attentäter", bIs: "Opfer" }] },
  {
    a: "gavilar",
    b: "dalinar",
    labels: [{ at: P(2), aIs: "Absender einer letzten Nachricht", bIs: "Empfänger der Nachricht" }],
  },
  { a: "kaladin", b: "cenn", labels: [{ at: K(1), aIs: "Beschützer", bIs: "Neuling im Trupp" }] },
  { a: "dallet", b: "kaladin", labels: [{ at: K(1), aIs: "Feldwebel im Trupp", bIs: "Anführer des Trupps" }] },
  {
    a: "amaram",
    b: "kaladin",
    labels: [
      { at: K(1), aIs: "Heerführer", bIs: "Soldat unter ihm" },
      { at: K(4), aIs: "Heerführer, auf den Kaladins Hass zielt", bIs: "Hasst ihn und will Rache" },
    ],
  },
  {
    a: "tvlakv",
    b: "kaladin",
    labels: [
      { at: K(2), aIs: "Sklavenhändler", bIs: "Sklave in seiner Karawane" },
      { at: K(6), aIs: "Händler, der ihn als Deserteur meldet", bIs: "Von ihm als Deserteur gemeldet" },
    ],
  },
  {
    a: "kaladin",
    b: "syl",
    labels: [
      { at: K(6), aIs: "Der, dem sie folgt", bIs: "Begleiterin" },
      { at: K(9), aIs: "Der, den sie verlassen hat", bIs: "Hat ihn verlassen" },
      { at: K(11), aIs: "Der, zu dem sie zurückkehrt", bIs: "Wieder an seiner Seite" },
    ],
  },
  {
    a: "gaz",
    b: "kaladin",
    labels: [
      { at: K(6), aIs: "Aufseher, der ihn nicht mag", bIs: "Neuer in der Mannschaft" },
      { at: K(11), aIs: "Aufseher, den er zu einer Abmachung zwingt", bIs: "Fordert die Führung von Brücke Vier" },
    ],
  },
  { a: "kaladin", b: "tien", labels: [{ at: K(9), aIs: "Älterer Bruder", bIs: "Jüngerer Bruder" }] },
  { a: "lirin", b: "kaladin", labels: [{ at: K(10), aIs: "Vater", bIs: "Sohn" }] },
  {
    a: "shallan",
    b: "jasnah",
    labels: [
      { at: K(3), aIs: "Möchte ihr Mündel werden", bIs: "Von Shallan gesuchte Gelehrte" },
      { at: K(5), aIs: "Bewerberin, die sie ablehnt", bIs: "Prüferin, die ablehnt" },
      { at: K(8), aIs: "Mündel", bIs: "Vormund" },
    ],
  },
  {
    a: "jasnah",
    b: "taravangian",
    labels: [{ at: K(5), aIs: "Verhandlungspartnerin", bIs: "König, mit dem sie verhandelt" }],
  },
  {
    a: "shallan",
    b: "kabsal",
    labels: [{ at: K(7), aIs: "Wartende Besucherin", bIs: "Geistlicher, der sich ihr vorstellt" }],
  },
];
