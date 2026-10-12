import RelationsView from "@/components/RelationsView";

export const metadata = { title: "Beziehungen · Karamasow-Begleiter" };

export default function BeziehungenPage() {
  return (
    <>
      <h1 className="font-serif text-3xl">Beziehungen</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Die Karte wächst mit deinem Lesestand.</p>
      <RelationsView />
    </>
  );
}
