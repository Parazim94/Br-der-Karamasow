import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { bookFromParams } from "@/lib/route";

export async function generateMetadata({ params }: PageProps<"/[book]">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: book.title };
}

export default async function BookHome({ params }: PageProps<"/[book]">) {
  return <HomeView book={await bookFromParams(params)} />;
}
