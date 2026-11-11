"use client";

import { useId, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

/**
 * Tabs accesibles (role=tablist). Teclado: ←/→ cambian y enfocan, Home/End van
 * a los extremos. Controlado con `value` + `onChange`.
 */
export function Tabs({
  items,
  value,
  onChange,
  label,
  className,
  listClassName,
}: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Nombre accesible del grupo de pestañas. */
  label: string;
  className?: string;
  listClassName?: string;
}) {
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(
    0,
    items.findIndex((t) => t.id === value),
  );

  function select(index: number) {
    const next = (index + items.length) % items.length;
    onChange(items[next].id);
    refs.current[next]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const keys: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={cn(
          "flex gap-1 overflow-x-auto scrollbar-none border-b border-ink/12",
          listClassName,
        )}
      >
        {items.map((tab, i) => {
          const selected = i === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={cn(
                "-mb-px min-h-12 shrink-0 border-b-2 px-4 text-[0.9375rem] font-semibold transition-colors",
                selected
                  ? "border-accent-text text-accent-text"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {items.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={i !== activeIndex}
          tabIndex={0}
          className="pt-8 focus-visible:outline-offset-8"
        >
          {i === activeIndex && tab.content}
        </div>
      ))}
    </div>
  );
}
