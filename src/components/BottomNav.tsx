"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavId } from "@/books/types";
import { MORE_ICON, NAV } from "@/lib/nav";

type Tab = { href: string; label: string; icon: string; active: (pathname: string) => boolean };

export default function BottomNav({ slug, tabs, more }: { slug: string; tabs: NavId[]; more: NavId[] }) {
  const pathname = usePathname();
  const base = `/${slug}`;

  const items: Tab[] = tabs.map((id) => {
    const href = base + NAV[id].path;
    return {
      href,
      label: NAV[id].label,
      icon: NAV[id].icon,
      active: (p) => (id === "heute" ? p === href : p.startsWith(href)),
    };
  });

  if (more.length > 0) {
    const moreHrefs = more.map((id) => base + NAV[id].path);
    items.push({
      href: `${base}/mehr`,
      label: "Mehr",
      icon: MORE_ICON,
      // „Mehr“ leuchtet auch auf den Seiten, die sich dahinter verbergen.
      active: (p) => p.startsWith(`${base}/mehr`) || moreHrefs.some((h) => p.startsWith(h)),
    });
  }

  return (
    <nav
      aria-label="Hauptnavigation"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md">
        {items.map((t) => {
          const active = t.active(pathname);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs ${
                  active ? "font-semibold text-accent" : "text-muted"
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={t.icon} />
                </svg>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
