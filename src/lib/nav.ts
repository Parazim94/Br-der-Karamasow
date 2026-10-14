import type { NavId } from "@/books/types";

// Alle Navigationsziele eines Buchs: Beschriftung, Symbol (SVG-Pfad) und Kurzbeschreibung für „Mehr“.
export const NAV: Record<NavId, { label: string; path: string; icon: string; desc: string }> = {
  heute: {
    label: "Heute",
    path: "",
    icon: "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    desc: "Dein Stand und die Erinnerung ans letzte Kapitel.",
  },
  kapitel: {
    label: "Kapitel",
    path: "/kapitel",
    icon: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11",
    desc: "Lesestand setzen und Rückblicke ansehen.",
  },
  figuren: {
    label: "Figuren",
    path: "/figuren",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
    desc: "Wer ist wer? Mit Spitznamen-Suche.",
  },
  glossar: {
    label: "Glossar",
    path: "/glossar",
    icon: "M5 4h14v16H5zM9 8h6M9 12h6M9 16h3",
    desc: "Begriffe der Welt, sobald sie dir begegnet sind.",
  },
  notizen: {
    label: "Notizen",
    path: "/notizen",
    icon: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
    desc: "Gedanken und Zitate mit deinem Lesestand.",
  },
  tipps: {
    label: "Tipps",
    path: "/tipps",
    icon: "M12 3a6 6 0 0 0-4 10.5V16h8v-2.5A6 6 0 0 0 12 3zM9 20h6",
    desc: "Vorhersage-Tagebuch: erst raten, dann lesen.",
  },
  beziehungen: {
    label: "Beziehungen",
    path: "/beziehungen",
    icon: "M6 6a2 2 0 1 0 0 .01M18 6a2 2 0 1 0 0 .01M12 19a2 2 0 1 0 0 .01M7.5 7.5l3.5 9M16.5 7.5L13 16.5M8 6h8",
    desc: "Wer gehört zu wem? Die Karte wächst mit dir.",
  },
  perspektiven: {
    label: "Perspektiven",
    path: "/perspektiven",
    icon: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    desc: "Wer erzählt gerade? Aus wessen Sicht du bisher gehört hast.",
  },
  denken: {
    label: "Philosophieren",
    path: "/denken",
    icon: "M4 5h16v11H9l-5 4z",
    desc: "Gespräch mit einer KI, die dir nichts verrät.",
  },
};

export const MORE_ICON = "M5 12h.01M12 12h.01M19 12h.01";
