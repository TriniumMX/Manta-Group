import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { HOME_UNIVERSE } from "@/content/home";
import { Section } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types/content";

/**
 * Composición asimétrica por posición (orden editorial de config/brands.ts):
 * escritorio: una 2×2, dos verticales y tres apaisadas; tablet: 2 columnas con
 * piezas a todo el ancho; móvil: alternancia de alturas.
 */
const LAYOUT = [
  {
    cell: "aspect-[4/5] md:col-span-2 md:aspect-[16/9] lg:col-span-6 lg:row-span-2",
    sizes: "(min-width: 1024px) 50vw, 100vw",
    big: true,
  },
  {
    cell: "aspect-[3/2] md:aspect-[4/5] lg:col-span-3 lg:row-span-2",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    cell: "aspect-[4/5] lg:col-span-3 lg:row-span-2",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    cell: "aspect-[3/2] md:aspect-[4/5] lg:col-span-4",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    cell: "aspect-[4/5] lg:col-span-4",
    sizes: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    cell: "aspect-[3/2] md:col-span-2 md:aspect-[16/9] lg:col-span-4",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
];

function UniverseCard({ brand, index }: { brand: Brand; index: number }) {
  const layout = LAYOUT[index % LAYOUT.length];
  return (
    <li data-brand={brand.slug} className={cn("lg:aspect-auto", layout.cell)}>
      <Reveal delay={(index % 3) * 80} className="h-full">
        <Link
          href={brandHref(brand.slug)}
          className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-[4px] bg-ink text-cream"
        >
          <SmartImage
            slot={brand.cardSlot}
            sizes={layout.sizes}
            showLabel={false}
            className="absolute inset-0 -z-20 transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/50 to-ink/0"
          />
          <div className="p-5 md:p-6 lg:p-7">
            {brand.eyebrow && <p className="mb-2 text-eyebrow text-sand">{brand.eyebrow}</p>}
            <h3
              className={cn(
                "font-serif leading-[1.05] tracking-[-0.01em]",
                layout.big ? "text-h1" : "text-h3",
              )}
            >
              {brand.name}
            </h3>
            <p className="mt-2 text-small font-semibold text-sand">{brand.category}</p>
            <p
              className={cn(
                "mt-2 max-w-[42ch] text-small text-sand",
                layout.big ? "md:text-body" : "line-clamp-2",
              )}
            >
              {brand.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-cream">
              <span className="link-underline group-hover:bg-size-[100%_1px]">Explorar</span>
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
          {/* La tarjeta adopta el acento de su marca en hover/focus. */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
        </Link>
      </Reveal>
    </li>
  );
}

export function BrandUniverse() {
  const u = HOME_UNIVERSE;
  return (
    <Section id="universo" tone="ivory" labelledBy="universo-title">
      <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow tone="accent">{u.eyebrow}</Eyebrow>
          <Heading id="universo-title" level="h2" className="mt-4">
            {u.title}
          </Heading>
        </div>
        <div className="space-y-4 lg:col-span-5">
          <p className="max-w-[48ch] text-body text-ink-soft">{u.lead}</p>
          <Badge tone="demo">Fotografías pendientes · demo</Badge>
        </div>
      </Reveal>

      <ul className="mt-10 grid grid-cols-1 gap-3 md:mt-14 md:grid-cols-2 md:gap-4 lg:auto-rows-[15rem] lg:grid-cols-12 xl:auto-rows-[17rem]">
        {BRANDS.map((brand, i) => (
          <UniverseCard key={brand.slug} brand={brand} index={i} />
        ))}
      </ul>
    </Section>
  );
}
