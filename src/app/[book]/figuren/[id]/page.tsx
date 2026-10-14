import type { Metadata } from "next";
import CharacterView from "@/components/CharacterView";
import { BOOKS } from "@/books/registry";
import { bookFromParams } from "@/lib/route";

export function generateStaticParams() {
  return BOOKS.flatMap((b) => b.characters.map((c) => ({ book: b.slug, id: c.id })));
}

// Bewusst nur der Buchtitel: der Name einer noch gesperrten Figur darf nicht im Tab-Titel stehen.
export async function generateMetadata({ params }: PageProps<"/[book]/figuren/[id]">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Figur · ${book.title}` };
}

export default async function FigurPage({ params }: PageProps<"/[book]/figuren/[id]">) {
  const book = await bookFromParams(params);
  const { id } = await params;
  return <CharacterView book={book} id={id} />;
}
