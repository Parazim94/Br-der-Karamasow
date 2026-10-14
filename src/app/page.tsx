import { BOOKS } from "@/books/registry";
import LibraryView from "@/components/LibraryView";

export default function Library() {
  // Nur das Nötige für die Karten übergeben, nicht den ganzen Buchinhalt.
  const shelf = BOOKS.map(({ slug, title, author, sections }) => ({ slug, title, author, sections }));
  return <LibraryView books={shelf} />;
}
