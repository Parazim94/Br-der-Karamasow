import type { Metadata } from "next";
import { bookFromParams } from "@/lib/route";
import NotesView from "@/components/NotesView";

export async function generateMetadata({ params }: PageProps<"/[book]/notizen">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Notizen · ${book.title}` };
}

export default async function NotizenPage({ params }: PageProps<"/[book]/notizen">) {
  const book = await bookFromParams(params);
  return (
    <>
      <h1 className="font-serif text-3xl">Notizen</h1>
      <p className="mb-5 mt-1 text-sm text-muted">Gedanken und Zitate, jeweils mit deinem Lesestand.</p>
      <NotesView book={book} />
    </>
  );
}
