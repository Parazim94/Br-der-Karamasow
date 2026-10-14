import type { Metadata } from "next";
import { bookFromParams } from "@/lib/route";
import { notFound } from "next/navigation";
import ThinkView from "@/components/ThinkView";

export async function generateMetadata({ params }: PageProps<"/[book]/denken">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Philosophieren · ${book.title}` };
}

export default async function DenkenPage({ params }: PageProps<"/[book]/denken">) {
  const book = await bookFromParams(params);
  if (!book.ai) notFound();
  return (
    <>
      <h1 className="font-serif text-3xl">Philosophieren</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Denk laut mit einer KI, die dir nichts verrät.</p>
      <ThinkView book={book} />
    </>
  );
}
