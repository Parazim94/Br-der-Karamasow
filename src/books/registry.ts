import type { Book } from "./types";
import { karamasow } from "./karamasow";
import { wegDerKoenige } from "./weg-der-koenige";
import { validateBook } from "./validate";

export const BOOKS: Book[] = [karamasow, wegDerKoenige];

for (const book of BOOKS) validateBook(book);

export function getBook(slug: string): Book | undefined {
  return BOOKS.find((b) => b.slug === slug);
}
