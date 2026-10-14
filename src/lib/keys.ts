// Speicherschlüssel pro Buch. Die alten Schlüssel (nur Karamasow, vor der Mehrbuch-Umstellung)
// werden beim ersten Lesen KOPIERT, nie gelöscht, und nur, wenn der neue Schlüssel noch fehlt.

export type Kind = "progress" | "notes" | "predictions";

export function storageKey(slug: string, kind: Kind): string {
  return `lesebegleiter:${slug}:${kind}:v1`;
}

const LEGACY: Record<string, Record<Kind, string>> = {
  karamasow: {
    progress: "karamasow:progress:v1",
    notes: "karamasow:notes:v1",
    predictions: "karamasow:predictions:v1",
  },
};

let migrated = false;

/** Idempotent; läuft pro Seitenaufruf höchstens einmal. */
export function ensureMigrated(): void {
  if (migrated) return;
  try {
    for (const [slug, kinds] of Object.entries(LEGACY)) {
      for (const [kind, oldKey] of Object.entries(kinds) as [Kind, string][]) {
        const newKey = storageKey(slug, kind);
        const old = localStorage.getItem(oldKey);
        if (old !== null && localStorage.getItem(newKey) === null) localStorage.setItem(newKey, old);
      }
    }
    migrated = true;
  } catch {
    // Speicher nicht verfügbar: nächster Versuch beim nächsten Lesen.
  }
}
