"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { HEADER_CTA, MAIN_NAV } from "@/config/site";
import { Dialog } from "@/components/ui/Dialog";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BrandSlug } from "@/types/content";
import { Stitch } from "@/components/identity/Stitch";

/** Navegación móvil a pantalla completa con las marcas como lista principal. */
export function MobileNav({
  isActive,
  currentBrand,
}: {
  isActive: (href: string) => boolean;
  currentBrand?: BrandSlug;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="-mr-2 inline-flex size-12 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
      >
        <Menu aria-hidden className="size-6" />
        <span className="sr-only">Abrir menú</span>
      </button>

      <Dialog open={open} onClose={close} title="Menú" hideTitle size="full" className="bg-ivory">
        <nav aria-label="Menú principal" className="flex min-h-full flex-col pt-10">
          <p className="text-eyebrow text-ink-muted">Nuestras marcas</p>
          <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
            {BRANDS.map((brand) => {
              const current = brand.slug === currentBrand;
              return (
                <li key={brand.slug} data-brand={brand.slug}>
                  <Link
                    href={brandHref(brand.slug)}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className="flex min-h-14 items-center gap-3 py-3"
                  >
                    <Stitch className="size-3.5" />
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-serif text-[1.375rem] leading-tight",
                          current && "text-accent-text",
                        )}
                      >
                        {brand.name}
                      </span>
                      <span className="block text-small text-ink-muted">{brand.category}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 text-stone" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 space-y-1">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center text-[1.125rem] font-semibold",
                    isActive(item.href) ? "text-accent-text" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acciones en el tercio inferior: alcanzables con una mano. */}
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Link
              href={HEADER_CTA.href}
              onClick={close}
              className={buttonClasses({ size: "lg", className: "w-full" })}
            >
              {HEADER_CTA.label}
            </Link>
            <button
              type="button"
              onClick={close}
              className={buttonClasses({ variant: "secondary", size: "lg", className: "w-full" })}
            >
              <X aria-hidden className="size-4" />
              Cerrar menú
            </button>
          </div>
        </nav>
      </Dialog>
    </>
  );
}
