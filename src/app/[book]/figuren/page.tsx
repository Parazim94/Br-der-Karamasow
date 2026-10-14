import type { Metadata } from "next";
import { bookFromParams } from "@/lib/route";
import Link from "next/link";
import CharacterList from "@/components/CharacterList";

export async function generateMetadata({ params }: PageProps<"/[book]/figuren">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Figuren · ${book.title}` };
}

export default async function FigurenPage({ params }: PageProps<"/[book]/figuren">) {
  const book = await bookFromParams(params);
  return (
    <>
      <h1 className="font-serif text-3xl">Figuren</h1>
      <p className="mt-1 text-sm text-muted">Nur das, was du bis jetzt gelesen hast.</p>
      <Link href={`/${book.slug}/beziehungen`} className="mb-5 mt-3 flex min-h-12 items-center justify-between rounded-xl border border-line bg-card px-4 text-sm font-semibold text-accent">
        Beziehungskarte <span aria-hidden>→</span>
      </Link>
      <CharacterList book={book} />
    </>
  );
}
