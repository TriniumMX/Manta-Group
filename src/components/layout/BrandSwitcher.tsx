"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { cn } from "@/lib/utils";
import type { BrandSlug } from "@/types/content";
import { Stitch } from "@/components/identity/Stitch";

/**
 * Desplegable "Nuestras marcas" del header (escritorio).
 * Disclosure accesible: Esc cierra y devuelve el foco, clic fuera cierra.
 */
export function BrandSwitcher({
  active,
  currentBrand,
}: {
  /** true si la ruta actual está bajo /marcas. */
  active: boolean;
  currentBrand?: BrandSlug;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 px-3 text-[0.9375rem] font-semibold transition-colors",
          active ? "text-ink" : "text-ink-soft hover:text-ink",
        )}
      >
        <span className={cn(active && "border-b-2 border-accent pb-0.5")}>Nuestras marcas</span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 z-50 mt-3 w-[min(44rem,calc(100vw-3rem))] -translate-x-1/2 animate-dialog-in rounded-[12px] border border-ink/10 bg-cream p-3 shadow-xl"
      >
        <ul className="grid grid-cols-2 gap-1">
          {BRANDS.map((brand) => {
            const current = brand.slug === currentBrand;
            return (
              <li key={brand.slug} data-brand={brand.slug}>
                <Link
                  href={brandHref(brand.slug)}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-start gap-3 rounded-[8px] p-3 transition-colors hover:bg-accent-soft",
                    current && "bg-accent-soft",
                  )}
                >
                  <Stitch className="mt-1.5 size-3.5" />
                  <span className="min-w-0">
                    <span className="block font-serif text-[1.1875rem] leading-tight text-ink">
                      {brand.name}
                      {brand.eyebrow && <span className="text-ink-muted"> · {brand.eyebrow}</span>}
                    </span>
                    <span className="mt-1 block text-small text-ink-muted">{brand.category}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 border-t border-ink/10 px-3 pt-3 pb-1">
          <Link
            href="/marcas"
            onClick={() => setOpen(false)}
            className="group inline-flex min-h-11 items-center gap-2 text-small font-semibold text-accent-text"
          >
            Ver todas las marcas
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
