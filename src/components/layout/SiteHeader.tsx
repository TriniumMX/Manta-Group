"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBrandBySlug } from "@/config/brands";
import { HEADER_CTA, MAIN_NAV } from "@/config/site";
import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/Button";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { SharedLayoutBg } from "@/components/vendor/beui/shared-layout-bg";
import { BrandSwitcher } from "./BrandSwitcher";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";

/**
 * Header global sticky. Se compacta (80 → 64 px) y pasa a marfil translúcido al
 * hacer scroll. Dentro de una marca muestra franja de acento y su BrandMark.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const scrolled = useScrolled();

  const brandSlug = pathname.match(/^\/marcas\/([^/]+)/)?.[1];
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-brand={brand?.slug}
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-ivory/72 shadow-[0_1px_0_rgb(30_28_25/0.08)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-ivory",
      )}
    >
      {brand && <div aria-hidden className="h-1 bg-accent" />}
      {/* Progreso de lectura (CSS: animation-timeline). */}
      <div
        aria-hidden
        className="scroll-progress thread-ribbon thread-ribbon--woven absolute inset-x-0 bottom-0 origin-left [--thread:1.5px]"
      />
      <Container
        className={cn(
          "flex items-center justify-between gap-6 transition-[height] duration-300",
          "h-16 lg:h-20",
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center"
            aria-label={brand ? "Manta Group, ir al inicio" : undefined}
          >
            {brand ? (
              <>
                {/* En móvil, dentro de una marca, MG se abrevia para dar espacio. */}
                <span aria-hidden className="font-serif text-[1.375rem] leading-none sm:hidden">
                  MG
                </span>
                <BrandMark variant="header" className="hidden sm:inline-flex" />
              </>
            ) : (
              <BrandMark variant="header" />
            )}
          </Link>
          {brand && (
            <>
              <span aria-hidden className="h-6 w-px bg-ink/20" />
              <Link
                href={`/marcas/${brand.slug}`}
                className="inline-flex min-h-11 min-w-0 items-center text-accent-text"
              >
                <BrandMark brand={brand} variant="header" className="truncate" />
              </Link>
            </>
          )}
        </div>

        <nav aria-label="Principal" className="hidden lg:block">
          <SharedLayoutBg
            as="ul"
            inset={0}
            className="flex-row items-center gap-1"
            pillClassName="rounded-full bg-ink/6"
          >
            {MAIN_NAV.map((item) =>
              item.href === "/marcas" ? (
                <li key={item.href}>
                  <BrandSwitcher active={isActive("/marcas")} currentBrand={brand?.slug} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-semibold transition-colors",
                      isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    <span className={cn(isActive(item.href) && "border-b-2 border-accent pb-0.5")}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ),
            )}
          </SharedLayoutBg>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={HEADER_CTA.href} size="sm" className="hidden md:inline-flex">
            {HEADER_CTA.label}
          </Button>
          <MobileNav isActive={isActive} currentBrand={brand?.slug} />
        </div>
      </Container>
    </header>
  );
}
