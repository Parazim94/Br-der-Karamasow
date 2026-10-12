import { chapterNumber } from "./book";

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

const at = chapterNumber;

export const CHARACTERS: Character[] = [
  {
    id: "fjodor",
    name: "Fjodor Pawlowitsch Karamasow",
    aliases: ["Fjodor", "Fjodor Pawlowitsch", "der Alte", "Vater Karamasow"],
    role: "Gutsbesitzer, Vater der drei Brüder",
    unlockAt: at(1, 1),
    facts: [
      { at: at(1, 1), text: "Gutsbesitzer in der Provinz, zu Geld gekommen, aber von üblem Ruf: ein Possenreißer und Lebemann." },
      { at: at(1, 3), text: "Hat sich um seine Kinder kaum gekümmert. Sie wuchsen bei anderen Menschen auf." },
    ],
  },
  {
    id: "dmitri",
    name: "Dmitri Fjodorowitsch Karamasow",
    aliases: ["Mitja", "Mitenka", "Mitjka", "Dmitri Fjodorowitsch", "Dmitri"],
    role: "Ältester Sohn",
    unlockAt: at(1, 2),
    facts: [
      { at: at(1, 2), text: "Der älteste Sohn Fjodors, aus dessen erster Ehe. Wuchs fern vom Vater auf." },
      { at: at(1, 3), text: "Halbbruder von Iwan und Aljoscha, die aus der zweiten Ehe stammen." },
      { at: at(2, 2), text: "Steht mit dem Vater wegen Erbe und Geld im Streit. Das ist der Anlass für das Treffen im Kloster." },
    ],
  },
  {
    id: "iwan",
    name: "Iwan Fjodorowitsch Karamasow",
    aliases: ["Wanja", "Wanjetschka", "Iwan Fjodorowitsch", "Iwan"],
    role: "Zweiter Sohn",
    unlockAt: at(1, 3),
    facts: [
      { at: at(1, 3), text: "Zweiter Sohn Fjodors, Bruder von Aljoscha. Beide stammen aus der zweiten Ehe." },
      { at: at(1, 5), text: "Gebildet, verschlossen und von kühlem Verstand. Hat in Moskau studiert." },
    ],
  },
  {
    id: "aljoscha",
    name: "Alexej Fjodorowitsch Karamasow",
    aliases: ["Aljoscha", "Aljoschka", "Aljoschenka", "Alexej", "Alexej Fjodorowitsch", "Aljoscha"],
    role: "Jüngster Sohn, Novize im Kloster",
    unlockAt: at(1, 4),
    facts: [
      { at: at(1, 4), text: "Der jüngste Sohn, etwa zwanzig Jahre alt. Warmherzig, offen, von fast allen gemocht." },
      { at: at(1, 5), text: "Lebt als Novize im Kloster der Stadt und verehrt dort den Starez Sossima." },
    ],
  },
  {
    id: "sossima",
    name: "Starez Sossima",
    aliases: ["Sossima", "Vater Sossima", "der Starez", "Starez"],
    role: "Geistlicher Lehrer im Kloster",
    unlockAt: at(1, 5),
    facts: [
      { at: at(1, 5), text: "Ein „Starez“ ist ein erfahrener Mönch, der anderen als geistlicher Ratgeber dient. Viele suchen Sossima auf, um Trost und Rat zu finden." },
    ],
  },
  {
    id: "miusow",
    name: "Pjotr Alexandrowitsch Miusow",
    aliases: ["Miusow", "Pjotr Alexandrowitsch"],
    role: "Verwandter der Familie",
    unlockAt: at(2, 1),
    facts: [
      { at: at(2, 1), text: "Weltgewandter, aufgeklärter Mann mit Verbindungen zur Familie Karamasow. Gibt sich fortschrittlich und kirchenkritisch." },
    ],
  },
  {
    id: "smerdjakow",
    name: "Pawel Fjodorowitsch Smerdjakow",
    aliases: ["Smerdjakow", "Pawel Fjodorowitsch", "Smerdjakow"],
    role: "Diener im Haus Karamasow",
    unlockAt: at(3, 6),
    facts: [
      { at: at(3, 6), text: "Diener und Koch im Haus Fjodors. Verschlossen, schwer zu durchschauen." },
    ],
  },
  {
    id: "gruschenka",
    name: "Agrafena Alexandrowna Swetlowa",
    aliases: ["Gruschenka", "Gruschenjka", "Agrafena Alexandrowna", "Gruscha"],
    role: "Junge Frau in der Stadt",
    unlockAt: at(3, 1),
    facts: [
      { at: at(3, 1), text: "Eine junge, auffällige Frau, über die in der Stadt viel gesprochen wird. Sie spielt für die Männer der Familie eine Rolle." },
    ],
  },
  {
    id: "katerina",
    name: "Katerina Iwanowna",
    aliases: ["Katja", "Katerina", "Katerina Iwanowna", "Katjuscha"],
    role: "Verlobte Dmitris",
    unlockAt: at(3, 3),
    facts: [
      { at: at(3, 3), text: "Stolze, gebildete junge Frau aus guter Familie. Verlobte von Dmitri." },
    ],
  },
];

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function isUnlocked(unlockAt: number, progress: number): boolean {
  return unlockAt <= progress;
}

export function matches(c: Character, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  return [c.name, ...c.aliases].some((n) => normalize(n).includes(q));
}
