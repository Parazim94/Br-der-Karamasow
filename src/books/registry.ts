import type { Book } from "./types";
import { karamasow } from "./karamasow";

export const BOOKS: Book[] = [karamasow];

export function getBook(slug: string): Book | undefined {
  return BOOKS.find((b) => b.slug === slug);
}
