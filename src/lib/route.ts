import { notFound } from "next/navigation";
import { BOOKS, getBook } from "@/books/registry";
import type { Book } from "@/books/types";

/** Alle Buch-Adressen für generateStaticParams. */
export function allBookParams() {
  return BOOKS.map((b) => ({ book: b.slug }));
}

/** Das Buch zur Adresse; unbekannte Bücher führen zur 404-Seite. */
export async function bookFromParams(params: Promise<{ book: string }>): Promise<Book> {
  const { book } = await params;
  const found = getBook(book);
  if (!found) notFound();
  return found;
}
