import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brandHref } from "@/config/brands";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";
import type { Brand, MediaSlot } from "@/types/content";
import { ViewTransition } from "react";

/**
 * Tarjeta de marca con fotografía. `compact` es la versión pequeña para
 * "Otras marcas"; la normal se usa en el listado de /marcas.
 */
export function BrandCard({
  brand,
  media,
  compact = false,
  sizes,
  className,
}: {
  brand: Brand;
  media?: MediaSlot;
  compact?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Link
      href={brandHref(brand.slug)}
      data-brand={brand.slug}
      className={cn("group block", className)}
    >
      <ViewTransition name={`marca-${brand.slug}`} share="morph" default="none">
        <div
          className={cn(
            "relative overflow-hidden bg-sand",
            compact
              ? "aspect-[4/5] rounded-[1.25rem]"
              : "aspect-[4/3] rounded-[1.75rem] md:rounded-[2rem]",
          )}
        >
          <SmartImage
            slot={{ ...(media ?? brand.cardSlot), alt: "" }}
            sizes={
              sizes ??
              (compact ? "(min-width: 1024px) 18vw, 45vw" : "(min-width: 768px) 46vw, 100vw")
            }
            className="absolute inset-0"
            imageClassName="transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:scale-[1.05]"
          />
          {!compact && (
            <span
              aria-hidden
              className="absolute right-4 bottom-4 inline-flex size-12 items-center justify-center rounded-full bg-cream text-ink transition-colors duration-300 group-hover:bg-accent-text group-hover:text-cream"
            >
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      </ViewTransition>
      <p
        className={cn(
          "flex items-center gap-2.5 text-small font-semibold text-accent-text",
          compact ? "mt-4" : "mt-6",
        )}
      >
        <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
        {brand.category}
      </p>
      <h3
        className={cn(
          "mt-2 font-serif leading-[1] font-light tracking-[-0.03em] [font-variation-settings:'SOFT'_100]",
          compact ? "text-[1.625rem]" : "text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)]",
        )}
      >
        <span className="link-underline group-hover:bg-size-[100%_1px]">{brand.name}</span>
      </h3>
      {!compact && <p className="mt-4 max-w-[46ch] text-body text-ink-soft">{brand.description}</p>}
    </Link>
  );
}
