import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { cn } from "@/lib/utils";
import type { BrandSlug } from "@/types/content";

/** Lista editorial compacta de las seis marcas (404, Nosotros, menús de apoyo). */
export function BrandLinkList({
  exclude,
  className,
  headingLevel: H = "h2",
}: {
  exclude?: BrandSlug;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-[12px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {BRANDS.filter((b) => b.slug !== exclude).map((brand) => (
        <li key={brand.slug} data-brand={brand.slug} className="bg-cream">
          <Link
            href={brandHref(brand.slug)}
            className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-accent-soft md:p-8"
          >
            <span
              aria-hidden
              className="h-1 w-10 bg-accent transition-[width] duration-500 group-hover:w-16"
            />
            <H className="text-h3">{brand.name}</H>
            <span className="text-small text-ink-muted">
              {brand.eyebrow ? `${brand.eyebrow} · ` : ""}
              {brand.category}
            </span>
            <span className="mt-auto inline-flex items-center gap-2 pt-2 text-small font-semibold text-accent-text">
              Explorar
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
