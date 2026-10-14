import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookFromParams } from "@/lib/route";
import RelationsView from "@/components/RelationsView";

export async function generateMetadata({ params }: PageProps<"/[book]/beziehungen">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Beziehungen · ${book.title}` };
}

export default async function BeziehungenPage({ params }: PageProps<"/[book]/beziehungen">) {
  const book = await bookFromParams(params);
  if (book.relations.length === 0) notFound();
  return (
    <>
      <h1 className="font-serif text-3xl">Beziehungen</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Die Karte wächst mit deinem Lesestand.</p>
      <RelationsView book={book} />
    </>
  );
}
