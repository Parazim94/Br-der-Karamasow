import { chapterNumber } from "./book";

// Kurze Erinnerungsstützen, selbst geschrieben und aus dem Gedächtnis (nicht aus einer Ausgabe).
// Sie enthalten nur, was im jeweiligen Kapitel selbst vorkommt. Ein Kapitel erscheint erst, wenn es gelesen ist.
// Kapitelgrenzen können in der Ausgabe von Röhl (Anaconda) leicht abweichen.
export type Summary = { at: number; text: string };

const s = (book: number, chapter: number, text: string): Summary => ({
  at: chapterNumber(book, chapter),
  text,
});

export const SUMMARIES: Summary[] = [
  s(
    1,
    1,
    "Der Erzähler stellt Fjodor Pawlowitsch Karamasow vor: ein Gutsbesitzer, der als Schmarotzer begann, zu Geld kam und dabei ein Possenreißer und Lebemann blieb. Seine erste Frau, Adelaida Miusowa, verlässt ihn und stirbt früh. Der kleine Sohn Dmitri wird vom Vater schlicht vergessen. Der Diener Grigori nimmt sich seiner an.",
  ),
  s(
    1,
    2,
    "Dmitri wächst bei wechselnden Verwandten und Vormündern auf, geht zum Militär und lebt über seine Verhältnisse. Als junger Mann kommt er in die Stadt zurück, um mit dem Vater das Erbe der Mutter zu klären. Das Verhältnis bleibt von Anfang an gereizt und ungeklärt.",
  ),
  s(
    1,
    3,
    "Fjodor heiratet ein zweites Mal: Sofja Iwanowna, ein verwaistes, schutzloses Mädchen. Sie bekommt die Söhne Iwan und Alexej, leidet unter Anfällen und stirbt früh. Auch diese Kinder wachsen bei anderen auf. Iwan zeigt früh große Begabung, studiert in Moskau und kommt später in die Heimatstadt.",
  ),
  s(
    1,
    4,
    "Aljoscha, der jüngste Sohn, ist etwa zwanzig, warmherzig und ohne Misstrauen gegenüber den Menschen. Er ist kein weltfremder Schwärmer, sondern ein nüchterner, gütiger junger Mann. Er kehrt in die Stadt zurück und zieht ins Kloster, wo ihn eine besondere Verehrung für einen Mönch bindet.",
  ),
  s(
    1,
    5,
    "Das Kapitel erklärt, was ein Starez ist: ein erfahrener Mönch, dem sich Brüder und Laien anvertrauen. Dieser Brauch ist nicht unumstritten. Der Starez Sossima, schon alt und kränklich, ist für Aljoscha der Mittelpunkt des Klosterlebens und der Mensch, an dem er hängt.",
  ),
];

/** Zusammenfassung des zuletzt gelesenen Kapitels (oder null). */
export function summaryFor(n: number): Summary | null {
  return SUMMARIES.find((x) => x.at === n) ?? null;
}
