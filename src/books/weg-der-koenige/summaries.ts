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
  s(
    "teil-1",
    7,
    "Shallan geht zur großen Bibliothek, um Jasnah doch noch zu überzeugen, dass sie als Mündel taugt. Sie darf in Jasnahs Leseplatz warten, in die Bibliothek selbst aber nicht. Beim Warten stellt sich ihr ein gelehrter Geistlicher namens Kabsal vor. Am Ende steht Jasnah in der Tür, sichtlich verärgert.",
  ),
  s(
    "teil-1",
    8,
    "Jasnah weist Shallan zunächst scharf zurecht, ruft sie dann aber zurück und entschuldigt sich. Sie ist beeindruckt, dass Shallan sich vieles selbst beigebracht hat, und will sie als Mündel aufnehmen, sobald sie Geschichte und Philosophie nachgeholt hat. Shallan kauft Bücher, um schnell aufzuholen, und fragt in einer Buchhandlung nach einem Roman, dessen Titel dem Kapitel den Namen gibt. Jasnah findet in Shallans Tasche Skizzen mit Notizen zur Biologie, und dass Shallan sich in ihrer freien Zeit mit Wissenschaft beschäftigt, überzeugt sie endgültig. Shallan hat damit den ersten Teil ihres heimlichen Plans geschafft, muss aber noch klären, wie sie den Rest erreicht, ohne erwischt zu werden.",
  ),
  s(
    "teil-1",
    9,
    "Kaladin ist seit einigen Wochen bei den Brückenmannschaften. Von seinem ersten Einsatz lebt außer ihm nur noch ein weiterer Mann. Unter den Neuen ist ein Junge, der ihn an seinen jüngeren Bruder Tien erinnert. Kaladin kommt mit seiner Lage immer schlechter zurecht, fährt Syl an und versinkt in Verzweiflung. Syl verlässt ihn. Beim nächsten Einsatz sterben der Junge und der letzte Überlebende von Kaladins erstem Einsatz. Kaladin hat das Gefühl, innerlich tot zu sein, und weint.",
  ),
  s(
    "teil-1",
    10,
    "Ein Rückblick auf Kaladins Kindheit. Kaladin, als Junge Kal genannt, hilft seinem Vater Lirin, einem Chirurgen, bei der Behandlung einer jungen Frau namens Sani, der ein Finger amputiert werden muss. Er denkt darüber nach, dass seine Familie wegen des Berufs des Vaters anders behandelt wird. Danach fragt Lirin, warum Kaladin zu spät kam: Er hat mit einem Jungen namens Jam den Stockkampf geübt. Es folgt ein Streit darüber, ob Soldaten oder Chirurgen mehr Leben retten. Lirin sagt, Töten könne kein Leben retten, das sei, als wolle man einen Sturm aufhalten, indem man stärker bläst. Er prüft Kaladins Wissen, lobt seine Begabung und hofft, ihn zur Ausbildung nach Kharbranth schicken zu können.",
  ),
  s(
    "teil-1",
    11,
    "Nach einem Sturm geht Kaladin völlig verzweifelt zu einer Kluft, um nicht mehr weiterzuleben. Gaz hält ihn auf und beschuldigt ihn, draußen liegende Wertgegenstände stehlen zu wollen, doch Kaladin beachtet ihn nicht. Am Rand der Kluft taucht Syl wieder auf. Kaladin klagt, dass er niemanden beschützen konnte. Syl überzeugt ihn, es noch einmal zu versuchen: Die Brückenmänner sterben ohnehin, also kann sein Einsatz nichts verschlimmern. Kaladin kehrt zum Lager zurück, wirft Gaz zu Boden und verlangt, Brücke Vier mit voller Befehlsgewalt anführen zu dürfen. Gaz bekommt dafür einen Teil von Kaladins Lohn. Am Ende geht Kaladin in die Baracke und beginnt, die Männer nach ihren Namen zu fragen.",
  ),
];
