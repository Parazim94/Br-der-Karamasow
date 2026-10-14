import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookFromParams } from "@/lib/route";
import PerspectivesView from "@/components/PerspectivesView";

export async function generateMetadata({ params }: PageProps<"/[book]/perspektiven">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Perspektiven · ${book.title}` };
}

export default async function PerspektivenPage({ params }: PageProps<"/[book]/perspektiven">) {
  const book = await bookFromParams(params);
  if (!book.sections.some((s) => s.units?.some((u) => u.pov))) notFound();
  return (
    <>
      <h1 className="font-serif text-3xl">Perspektiven</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Wer erzählt gerade? Nur, was du schon gehört hast.</p>
      <PerspectivesView book={book} />
    </>
  );
}
