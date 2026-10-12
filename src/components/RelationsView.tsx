"use client";

import Link from "next/link";
import { useState } from "react";
import { CHARACTERS, isUnlocked } from "@/lib/characters";
import { LAYOUT, RELATIONS, currentLabel } from "@/lib/relations";
import { useProgress } from "@/lib/progress";

export default function RelationsView() {
  const [progress] = useProgress();
  const [selected, setSelected] = useState<string | null>(null);

  const nodes = CHARACTERS.filter((c) => LAYOUT[c.id] && isUnlocked(c.unlockAt, progress));
  const visibleIds = new Set(nodes.map((n) => n.id));

  const edges = RELATIONS.flatMap((r) => {
    const label = currentLabel(r, progress);
    return label && visibleIds.has(r.a) && visibleIds.has(r.b) ? [{ r, label }] : [];
  });

  // Ist die Auswahl nach einem Rücksetzen des Fortschritts nicht mehr sichtbar, gilt sie als aufgehoben.
  const active = selected && visibleIds.has(selected) ? selected : null;
  const activeChar = nodes.find((n) => n.id === active);
  const activeEdges = edges.filter(({ r }) => r.a === active || r.b === active);

  if (nodes.length === 0) {
    return (
      <p className="text-sm text-muted">
        Noch keine Figuren bekannt. Sobald du die ersten Kapitel abgehakt hast, erscheint hier die Familie.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <svg viewBox="0 0 360 450" className="h-auto w-full" role="group" aria-label="Beziehungskarte">
        {[...edges]
          .sort((e1, e2) => Number(isActive(e1.r, active)) - Number(isActive(e2.r, active)))
          .map(({ r }) => {
            const a = LAYOUT[r.a];
            const b = LAYOUT[r.b];
            const hl = isActive(r, active);
            return (
              <line
                key={`${r.a}-${r.b}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={hl ? "stroke-accent" : "stroke-muted"}
                strokeWidth={hl ? 3 : 1.5}
                strokeOpacity={hl || !active ? 0.9 : 0.35}
              />
            );
          })}

        {nodes.map((c) => {
          const { x, y, short } = LAYOUT[c.id];
          const isSel = c.id === active;
          return (
            <g
              key={c.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSel}
              aria-label={c.name}
              onClick={() => setSelected(isSel ? null : c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(isSel ? null : c.id);
                }
              }}
              className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-accent"
            >
              <circle cx={x} cy={y} r={28} className={isSel ? "fill-accent stroke-accent" : "fill-card stroke-line"} strokeWidth={2} />
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                fontSize={18}
                className={`font-serif ${isSel ? "fill-accent-ink" : "fill-ink"}`}
              >
                {short[0]}
              </text>
              <text x={x} y={y + 46} textAnchor="middle" fontSize={12} className="fill-ink">
                {short}
              </text>
            </g>
          );
        })}
      </svg>

      <section className="rounded-2xl border border-line bg-card p-4">
        {activeChar ? (
          <>
            <p className="font-serif text-xl">{activeChar.name}</p>
            {activeEdges.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Bisher sind dir keine Beziehungen zu anderen bekannt.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {activeEdges.map(({ r, label }) => {
                  const otherId = r.a === active ? r.b : r.a;
                  const role = r.a === active ? label.bIs : label.aIs;
                  return (
                    <li key={otherId} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-muted">{role}:</span>
                      <span className="text-right font-medium">{CHARACTERS.find((c) => c.id === otherId)?.name}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            <Link href={`/figuren/${activeChar.id}`} className="mt-4 inline-block text-sm font-semibold text-accent">
              Zur Figurenkarte →
            </Link>
          </>
        ) : (
          <p className="text-sm text-muted">Tippe auf eine Figur, um ihre Beziehungen zu sehen.</p>
        )}
      </section>
    </div>
  );
}

function isActive(r: { a: string; b: string }, active: string | null) {
  return active !== null && (r.a === active || r.b === active);
}
