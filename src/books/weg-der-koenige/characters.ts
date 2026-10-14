import type { Character } from "../types";
import { at } from "./structure";

// Jede Info steht erst ab dem Kapitel, in dem sie im Buch vorkommt. Namen folgen der Schreibweise des
// Originals; die Aliasse enthalten auch Schreibweisen, wie man sie beim Hören verstehen könnte.
const P = (n: number) => at("vorspiel", n);
const K = (n: number) => at("teil-1", n);

export const CHARACTERS: Character[] = [
  {
    id: "kalak",
    name: "Kalak",
    aliases: ["Kalak", "Kalack"],
    role: "Gestalt aus dem Präludium",
    unlockAt: P(1),
    facts: [
      {
        at: P(1),
        text: "Er zieht über ein Schlachtfeld voller Toter und trifft sich mit Jezrien. Am Ende legen beide ihre gewaltigen Klingen ab. Die Menschen sollen glauben, sie hätten gesiegt.",
      },
    ],
  },
  {
    id: "jezrien",
    name: "Jezrien",
    aliases: ["Jezrien", "Jesrien", "Yezrien", "Jezrin"],
    role: "Gestalt aus dem Präludium",
    unlockAt: P(1),
    facts: [
      {
        at: P(1),
        text: "Er wartet am Treffpunkt auf Kalak und gilt als ihr Anführer. Er erklärt, dass die anderen ein altes Bündnis aufgegeben haben, und verlangt, dass auch Kalak seine Klinge ablegt.",
      },
    ],
  },
  {
    id: "szeth",
    name: "Szeth",
    aliases: ["Szeth", "Seth", "Szet", "Zeth"],
    role: "Attentäter im Prolog",
    unlockAt: P(2),
    facts: [
      {
        at: P(2),
        text: "Ein Meuchelmörder in weißer Kleidung. Beim Fest zu Ehren eines Friedensvertrags kämpft er sich durch die Wachen und tötet den König.",
      },
    ],
  },
  {
    id: "gavilar",
    name: "Gavilar",
    aliases: ["Gavilar", "Gawilar", "Gavilar Kholin", "König Gavilar"],
    role: "König der Alethi",
    unlockAt: P(2),
    facts: [
      {
        at: P(2),
        text: "Er feiert gerade einen Friedensvertrag, als Szeth ihn angreift. Im Sterben gibt er Szeth einen seltsamen schwarzen Gegenstand und bittet ihn, Dalinar eine Nachricht zu überbringen.",
      },
    ],
  },
  {
    id: "dalinar",
    name: "Dalinar",
    aliases: ["Dalinar", "Dalinar Kholin"],
    role: "Name aus dem Prolog",
    unlockAt: P(2),
    facts: [
      {
        at: P(2),
        text: "Für ihn ist die letzte Nachricht des sterbenden Königs bestimmt. Szeth hinterlässt sie ihm.",
      },
    ],
  },
  {
    id: "kaladin",
    name: "Kaladin",
    aliases: ["Kaladin", "Kal", "Sturmgesegnet", "Kaladin Sturmgesegnet", "Stormblessed"],
    role: "Soldat, später Sklave",
    unlockAt: K(1),
    facts: [
      {
        at: K(1),
        text: "Anführer eines kleinen Trupps in Amarams Armee. Seine Männer nennen ihn „Sturmgesegnet“. Im Kampf beschützt er den Neuling Cenn.",
      },
      {
        at: K(2),
        text: "Später ist er Sklave in einer Karawane und wartet darauf, verkauft zu werden. Wie es dazu kam, bleibt zunächst offen. Er versucht, nicht wie ein Sklave zu denken.",
      },
      {
        at: K(4),
        text: "Offiziell gilt er als Deserteur. Er hegt Rachegedanken gegen Amaram und hofft nur noch darauf, wieder kämpfen zu dürfen.",
      },
      {
        at: K(6),
        text: "Er wird einer Brückenmannschaft zugeteilt und überlebt den ersten Einsatz als Einziger der vordersten Reihe.",
      },
    ],
  },
  {
    id: "cenn",
    name: "Cenn",
    aliases: ["Cenn", "Senn", "Zenn", "Cen"],
    role: "Junger Rekrut",
    unlockAt: K(1),
    facts: [
      {
        at: K(1),
        text: "Ein Neuling mit Angst vor seiner ersten Schlacht. Er wird kurz davor in Kaladins Trupp versetzt. Am Ende des Kapitels verliert er verwundet das Bewusstsein.",
      },
    ],
  },
  {
    id: "dallet",
    name: "Dallet",
    aliases: ["Dallet", "Dalet"],
    role: "Feldwebel in Kaladins Trupp",
    unlockAt: K(1),
    facts: [
      {
        at: K(1),
        text: "Bringt Cenn zu Kaladins Trupp. Kaladin bittet ihn, in der Schlacht auf den Neuling aufzupassen.",
      },
    ],
  },
  {
    id: "amaram",
    name: "Amaram",
    aliases: ["Amaram", "Meridas Amaram", "Brightlord Amaram"],
    role: "Heerführer",
    unlockAt: K(1),
    facts: [
      { at: K(1), text: "Der Anführer der Armee, in der Kaladin und Cenn dienen." },
      { at: K(4), text: "Kaladins Hass und sein Wunsch nach Rache gelten ihm." },
    ],
  },
  {
    id: "tvlakv",
    name: "Tvlakv",
    aliases: ["Tvlakv", "Twlakv", "Tulakv", "Tvlak", "Tuwlakv"],
    role: "Sklavenhändler",
    unlockAt: K(2),
    facts: [
      { at: K(2), text: "Er führt die Karawane, in der Kaladin gefangen ist." },
      {
        at: K(4),
        text: "Er hat sich verirrt und will, dass Kaladin ihm den Weg zeigt. Er scheint zu wissen, dass die Geschichte vom Deserteur nicht ganz stimmt.",
      },
      { at: K(6), text: "Im Heerlager meldet er Kaladin als Deserteur, was dessen Hoffnung beendet, kämpfen zu dürfen." },
    ],
  },
  {
    id: "shallan",
    name: "Shallan",
    aliases: ["Shallan", "Schallan", "Schalan", "Shallan Davar", "Davar"],
    role: "Junge Frau auf der Suche nach Jasnah",
    unlockAt: K(3),
    facts: [
      {
        at: K(3),
        text: "Sie kommt per Schiff in Kharbranth an. Seit Monaten reist sie Jasnah von Stadt zu Stadt nach, weil sie ihr Mündel werden möchte. Nach dem Tod ihres Vaters steht ihr Haus vor dem finanziellen Ruin.",
      },
      {
        at: K(5),
        text: "Jasnah hört ihre Bitte an, lehnt aber ab. Shallans eigentliches Ziel: Sie will Jasnahs besonderes Gerät stehlen, um ihrer Familie zu helfen.",
      },
    ],
  },
  {
    id: "jasnah",
    name: "Jasnah",
    aliases: ["Jasnah", "Jasna", "Jasnah Kholin"],
    role: "Gelehrte, von Shallan gesucht",
    unlockAt: K(3),
    facts: [
      { at: K(3), text: "Am Ende des Kapitels steht Shallan ihr zum ersten Mal gegenüber." },
      {
        at: K(5),
        text: "Sie verhandelt gerade mit dem König von Kharbranth und prüft Shallan wie eine Lehrerin: stark in den Naturwissenschaften, schwach in Geschichte und Philosophie. Mit einem besonderen Gerät verwandelt sie einen Stein in Rauch und befreit so die Enkelin des Königs.",
      },
    ],
  },
  {
    id: "taravangian",
    name: "Taravangian",
    aliases: ["Taravangian", "Taravangjan", "Tarawangian", "König Taravangian"],
    role: "König von Kharbranth",
    unlockAt: K(5),
    facts: [
      {
        at: K(5),
        text: "Verhandelt mit Jasnah. Nachdem sie seine Enkelin befreit hat, erlaubt er ihr den Zugang zur großen Bibliothek der Stadt.",
      },
    ],
  },
  {
    id: "gaz",
    name: "Gaz",
    aliases: ["Gaz", "Gatz", "Gas"],
    role: "Aufseher einer Brückenmannschaft",
    unlockAt: K(6),
    facts: [
      {
        at: K(6),
        text: "Mag Kaladin von Anfang an nicht und gibt ihm einen der schlechtesten Plätze an der Brücke, ohne Schuhe und Weste.",
      },
    ],
  },
  {
    id: "syl",
    name: "Syl",
    aliases: ["Syl", "Sil", "Sül", "Sill"],
    role: "Kleines Wesen aus Wind",
    unlockAt: K(6),
    facts: [
      {
        at: K(6),
        text: "Das geheimnisvolle, windartige Wesen, das Kaladin schon seit der Karawane folgt, stellt sich ihm nun als Syl vor.",
      },
    ],
  },
];
