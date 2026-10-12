import PredictionsView from "@/components/PredictionsView";

export const metadata = { title: "Tipps · Karamasow-Begleiter" };

export default function TippsPage() {
  return (
    <>
      <h1 className="font-serif text-3xl">Tipps</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Dein Vorhersage-Tagebuch: erst raten, dann lesen.</p>
      <PredictionsView />
    </>
  );
}
