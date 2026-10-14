import type { Summary } from "../types";
import { at } from "./structure";

// Kurze Erinnerungsstützen, selbst geschrieben und aus dem Gedächtnis (nicht aus einer Ausgabe).
// Sie enthalten nur, was im jeweiligen Kapitel selbst vorkommt. Ein Kapitel erscheint erst, wenn es gelesen ist.
// Kapitelgrenzen können in der Ausgabe von Röhl (Anaconda) leicht abweichen.
const s = (book: number, chapter: number, text: string): Summary => ({
  at: at(book, chapter),
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
  s(
    2,
    1,
    "Die Familie macht sich auf den Weg ins Kloster, wo Starez Sossima den Streit zwischen Vater und Dmitri schlichten soll. Fjodor, Iwan und Miusow kommen an, Dmitri fehlt zunächst. Schon hier ist die Stimmung gereizt, vor allem Miusow ist von Fjodors Gesellschaft genervt.",
  ),
  s(
    2,
    2,
    "Bei Sossima spielt Fjodor den Narren, übertreibt jede Höflichkeit und überzieht jeden Satz mit Witzen. Miusow ist die ganze Sache peinlich. Sossima bleibt ruhig und rät Fjodor, sich nicht zu schämen und sich selbst nichts vorzumachen.",
  ),
  s(
    2,
    3,
    "Bevor das Gespräch weitergeht, tritt Sossima vor die Zelle zu den wartenden einfachen Menschen. Er hört sich ihre Sorgen an, segnet sie und tröstet einzelne Frauen. Das Kapitel zeigt, wie sehr das Volk an ihm hängt.",
  ),
  s(
    2,
    4,
    "Eine wohlhabende Dame, Frau Chochlakowa, sucht bei Sossima Rat, weil ihr der Glaube schwerfällt. Sie fragt, wie man an ein Leben nach dem Tod glauben könne. Sossima antwortet mit dem Gedanken, dass man durch tätige Liebe zum Glauben findet.",
  ),
  s(
    2,
    5,
    "Zurück in der Zelle wird über Iwans Aufsatz zum Verhältnis von Kirche und Staat gesprochen. Miusow, Iwan und die Mönche vertreten dabei verschiedene Standpunkte. Fjodor wirft immer wieder spöttische Bemerkungen ein.",
  ),
  s(
    2,
    6,
    "Dmitri ist inzwischen da, und der Streit mit dem Vater bricht offen aus. Beide beschimpfen sich vor allen. Sossima verneigt sich plötzlich tief vor Dmitri, was alle Anwesenden verwirrt.",
  ),
  s(
    2,
    7,
    "Aljoscha verlässt die Zelle und trifft Rakitin, einen ehrgeizigen Seminaristen, der auf seine Weise deutet, was gerade geschehen ist. Sossima hat Aljoscha aufgetragen, nicht im Kloster zu bleiben, sondern zu Vater und Brüdern zu gehen.",
  ),
  s(
    2,
    8,
    "Das Mittagessen beim Abt endet in einem Skandal: Fjodor beleidigt die Mönche und seine Gäste. Miusow verlässt gekränkt die Runde. Die Aussprache hat nichts gelöst, die Spannungen sind größer als zuvor.",
  ),
];
