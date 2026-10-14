import type { Metadata } from "next";
import { bookFromParams } from "@/lib/route";
import ChapterList from "@/components/ChapterList";

export async function generateMetadata({ params }: PageProps<"/[book]/kapitel">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Kapitel · ${book.title}` };
}

export default async function KapitelPage({ params }: PageProps<"/[book]/kapitel">) {
  const book = await bookFromParams(params);
  return (
    <>
      <h1 className="font-serif text-3xl">Kapitel</h1>
      <p className="mb-6 mt-1 text-sm text-muted">
        Tippe auf das Kapitel, das du zuletzt gelesen hast. Alles davor gilt als gelesen. Ein erneuter Tipp auf das
        aktuelle Kapitel macht es rückgängig.
      </p>
      <ChapterList book={book} />
    </>
  );
}
