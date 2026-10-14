import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NAV } from "@/lib/nav";
import { bookFromParams } from "@/lib/route";

export async function generateMetadata({ params }: PageProps<"/[book]/mehr">): Promise<Metadata> {
  const book = await bookFromParams(params);
  return { title: `Mehr · ${book.title}` };
}

export default async function MehrPage({ params }: PageProps<"/[book]/mehr">) {
  const book = await bookFromParams(params);
  const more = book.nav.more ?? [];
  if (more.length === 0) notFound();

  return (
    <>
      <h1 className="font-serif text-3xl">Mehr</h1>
      <ul className="mt-5 space-y-3">
        {more.map((id) => (
          <li key={id}>
            <Link
              href={`/${book.slug}${NAV[id].path}`}
              className="flex min-h-16 items-center gap-4 rounded-2xl border border-line bg-card p-4 active:bg-line"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-accent">
                <path d={NAV[id].icon} />
              </svg>
              <span>
                <span className="block font-serif text-lg leading-snug">{NAV[id].label}</span>
                <span className="block text-sm text-muted">{NAV[id].desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
