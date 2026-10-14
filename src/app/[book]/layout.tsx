import BottomNav from "@/components/BottomNav";
import RememberBook from "@/components/RememberBook";
import { allBookParams, bookFromParams } from "@/lib/route";

export function generateStaticParams() {
  return allBookParams();
}

export default async function BookLayout({ children, params }: LayoutProps<"/[book]">) {
  const book = await bookFromParams(params);
  return (
    <>
      {children}
      <RememberBook slug={book.slug} />
      <BottomNav slug={book.slug} tabs={book.nav.tabs} more={book.nav.more ?? []} />
    </>
  );
}
