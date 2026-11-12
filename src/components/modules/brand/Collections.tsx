"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { GlidePill } from "@/components/motion/GlidePill";

export interface Collection {
  name: string;
  entries: string[];
}

/**
 * Colecciones con selector segmentado (pestañas accesibles, ←/→/Inicio/Fin).
 * La píldora activa se desliza al elemento elegido y las entradas aparecen
 * escalonadas.
 */
export function Collections({ items, label }: { items: Collection[]; label: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key]);
    }
  };

  const current = items[active];

  return (
    <div>
      {items.length > 1 && (
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:inline-flex md:rounded-full md:bg-cream md:p-1.5 md:ring-1 md:ring-ink/8"
        >
          {items.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.name}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "relative isolate min-h-11 shrink-0 rounded-full px-5 text-small font-semibold whitespace-nowrap transition-colors duration-300",
                  selected
                    ? "text-cream"
                    : "bg-cream text-ink-soft ring-1 ring-ink/8 hover:text-ink md:bg-transparent md:ring-0",
                )}
              >
                {selected && (
                  <GlidePill
                    layoutId={`${baseId}-pill`}
                    className="bg-accent-text shadow-[0_8px_20px_-8px_rgb(30_28_25/0.4)]"
                  />
                )}
                {c.name}
              </button>
            );
          })}
        </div>
      )}

      <div
        role={items.length > 1 ? "tabpanel" : undefined}
        id={`${baseId}-panel`}
        aria-labelledby={items.length > 1 ? `${baseId}-tab-${active}` : undefined}
        className="mt-8 md:mt-10"
      >
        <ul key={current.name} className="flex flex-wrap gap-2.5 md:gap-3">
          {current.entries.map((entry, i) => (
            <li
              key={entry}
              className="animate-toast-in"
              style={{ animationDelay: `${i * 45}ms`, animationFillMode: "both" }}
            >
              <span className="inline-flex min-h-14 items-center gap-3 rounded-full bg-cream px-6 font-serif text-[1.375rem] font-light tracking-[-0.01em] ring-1 ring-ink/8 [font-variation-settings:'SOFT'_100] md:min-h-16 md:px-7 md:text-[1.75rem]">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
                {entry}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
