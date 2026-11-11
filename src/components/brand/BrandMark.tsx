import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types/content";

type Variant = "header" | "hero" | "footer";

const sizes: Record<Variant, string> = {
  header: "text-[1.375rem] md:text-[1.5rem]",
  hero: "text-h1",
  footer: "text-[1.75rem]",
};

/**
 * Wordmark tipográfico PROVISIONAL (no es un logotipo).
 * Cuando exista el SVG oficial, se define `brand.logo` en config/brands.ts
 * y este componente lo usa automáticamente.
 */
export function BrandMark({
  brand,
  variant = "header",
  className,
}: {
  /** Sin marca = Manta Group. */
  brand?: Brand;
  variant?: Variant;
  className?: string;
}) {
  if (brand?.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- SVG oficial, sin optimización necesaria
      <img src={brand.logo.src} alt={brand.logo.alt} className={cn("h-8 w-auto", className)} />
    );
  }

  const name = brand?.name ?? SITE.name;
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      {brand?.eyebrow && variant !== "header" && (
        <span className="mb-2 text-eyebrow text-accent-text">{brand.eyebrow}</span>
      )}
      <span className={cn("font-serif font-normal tracking-[-0.01em]", sizes[variant])}>
        {name}
      </span>
    </span>
  );
}
