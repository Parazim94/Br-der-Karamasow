import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookFromParams } from "@/lib/route";
import GlossaryView from "@/components/GlossaryView";

export async function generateMetadata({ params }: PageProps<"/[book]/glossar">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Glossar · ${book.title}` };
}

export default async function GlossarPage({ params }: PageProps<"/[book]/glossar">) {
  const book = await bookFromParams(params);
  if (!book.glossary?.length) notFound();
  return (
    <>
      <h1 className="font-serif text-3xl">Glossar</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Nur Begriffe, die dir schon begegnet sind.</p>
      <GlossaryView book={book} />
    </>
  );
}
