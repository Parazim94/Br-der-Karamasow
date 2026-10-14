import type { Summary } from "../types";
import { at } from "./structure";

// Eigene Kurzfassungen, geschrieben nach Zusammenfassungen aus dem Fan-Wiki „Coppermind“ und
// NICHT gegen das Hörbuch geprüft. Jede enthält nur, was im jeweiligen Kapitel selbst geschieht.
const s = (section: string, n: number, text: string): Summary => ({ at: at(section, n), text });

export const SUMMARIES: Summary[] = [
  s(
    "vorspiel",
    1,
    "Kalak zieht über ein Schlachtfeld voller Toter zu einem Treffpunkt. Dort wartet nur noch Jezrien. Sieben gewaltige Klingen stecken schon im Boden. Jezrien erklärt, dass die anderen ein altes Bündnis aufgegeben haben, und verlangt, dass auch Kalak seine Klinge ablegt. Damit bleibt einer von ihnen allein zurück und muss weiter leiden. Kalak ist angewidert von ihrer Schwäche. Beide stoßen ihre Klingen in den Boden und gehen in entgegengesetzte Richtungen. Den Menschen wollen sie erzählen, sie hätten gesiegt.",
  ),
  s(
    "vorspiel",
    2,
    "Beim Fest zur Feier eines Friedensvertrags mit den Parschendi tötet der weiß gekleidete Attentäter Szeth den König Gavilar. Er kämpft sich durch die Wachen und besiegt den König schließlich, indem er den Balkon unter ihm einstürzen lässt. Der sterbende König gibt ihm einen seltsamen schwarzen Gegenstand und bittet ihn, Dalinar eine Nachricht zu überbringen. Szeth hinterlässt sie.",
  ),
  s(
    "teil-1",
    1,
    "Cenn, ein junger Rekrut, hat Angst vor seiner ersten Schlacht. Kurz davor wird er dem Trupp von Kaladin zugeteilt, dem der Feldwebel Dallet ihn bringt. Kaladin bittet Dallet, im Kampf auf Cenn aufzupassen. Der Trupp verliert in der Schlacht keinen Mann, und Kaladin kämpft allein sechs Speerkämpfer nieder, um Cenn zu retten. Dann taucht ein feindlicher Krieger mit einer gewaltigen Waffe auf. Cenn verliert Blut und das Bewusstsein.",
  ),
  s(
    "teil-1",
    2,
    "Kaladin ist inzwischen Sklave in einer Karawane und wartet darauf, verkauft zu werden. Er versucht, nicht wie ein Sklave zu denken. Ein Mitgefangener fragt nach Flucht, Kaladin hält sie für aussichtslos. Ein kleines windartiges Wesen schwebt um ihn und fragt, warum er nicht mehr kämpft. Er antwortet, er habe versagt. Als der Händler einen kranken Sklaven wegbringt, kommt es zu einer Gewalttat, die Kaladin nicht verhindern kann.",
  ),
  s(
    "teil-1",
    3,
    "Shallan kommt per Schiff in Kharbranth an, der Stadt der Glocken, und staunt über die vielen verschiedenen Menschen. Sie erfährt, dass Jasnah Kholin, der sie seit Monaten von Stadt zu Stadt nachreist, noch hier ist. Shallan hatte darum gebeten, Jasnahs Mündel zu werden. Ihr Haus steht nach dem Tod ihres Vaters finanziell vor dem Ruin. Am Ende des Kapitels steht sie Jasnah gegenüber.",
  ),
  s(
    "teil-1",
    4,
    "Die Karawane hat sich verirrt. Der Händler Tvlakv will, dass Kaladin ihm den Weg zeigt, doch Kaladin zerreißt die Karte und behauptet, ihn nicht zu kennen. Tvlakv gibt zu, dass er Kaladin die Flucht erlauben würde, denn dessen Hass auf Amaram wiegt schwerer als jeder Groll gegen ihn. Kaladin erkennt, dass Tvlakv weiß, dass die Geschichte vom Deserteur nicht ganz stimmt. Das windartige Wesen kehrt zurück und weist ihn auf viele Menschen in der Nähe hin. Kaladin erkennt ein Heerlager der Alethi und begreift, dass es zur Zerbrochenen Ebene geht. Er hofft nur noch, wieder kämpfen zu dürfen.",
  ),
  s(
    "teil-1",
    5,
    "Shallan trifft Jasnah, die gerade mit König Taravangian von Kharbranth verhandelt. Jasnah hört Shallans Bitte an, ihr Mündel zu werden, und prüft sie: stark in den Naturwissenschaften, schwach in Geschichte und Philosophie. Mit einem besonderen Gerät verwandelt Jasnah einen herabgestürzten Stein in Rauch und befreit die Enkelin des Königs. Zum Dank darf sie in die große Bibliothek der Stadt. Am Ende lehnt Jasnah Shallan ab. Shallans eigentliches Ziel wird klar: Sie will Jasnahs Gerät stehlen, um ihrer Familie finanziell zu helfen.",
  ),
  s(
    "teil-1",
    6,
    "Kaladin und die anderen Sklaven erreichen das Heerlager von Großprinz Sadeas. Kaladin bittet darum, kämpfen zu dürfen, doch Tvlakv meldet ihn als Deserteur. Die Frau, die über die Sklaven entscheidet, weist ihn und seine Gefährten den Brückenmannschaften zu. Der Aufseher Gaz mag Kaladin sofort nicht und gibt ihm einen der schlechtesten Plätze an der Brücke, ohne Schuhe und Weste. Beim ersten Einsatz geraten sie unter Pfeilbeschuss, und Kaladin überlebt als Einziger der vordersten Reihe. Später weckt ihn das windartige Wesen, das ihm gefolgt ist, und stellt sich als Syl vor.",
  ),
];
