import type { Metadata } from "next";
import { bookFromParams } from "@/lib/route";
import PredictionsView from "@/components/PredictionsView";

export async function generateMetadata({ params }: PageProps<"/[book]/tipps">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Tipps · ${book.title}` };
}

export default async function TippsPage({ params }: PageProps<"/[book]/tipps">) {
  const book = await bookFromParams(params);
  return (
    <>
      <h1 className="font-serif text-3xl">Tipps</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Dein Vorhersage-Tagebuch: erst raten, dann lesen.</p>
      <PredictionsView book={book} />
    </>
  );
}
