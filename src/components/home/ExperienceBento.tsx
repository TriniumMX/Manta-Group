"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { HOME_EXPERIENCES } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { RevealTitle } from "@/components/experience/RevealTitle";

/** Celdas del bento en escritorio: una grande, una ancha y dos cuadradas. */
const CELLS = [
  "lg:col-span-2 lg:row-span-2 aspect-[4/5] md:col-span-2 md:aspect-[16/10] lg:aspect-auto",
  "lg:col-span-2 aspect-[4/5] md:col-span-2 md:aspect-[16/9] lg:aspect-auto",
  "aspect-[4/5] md:aspect-[4/5] lg:aspect-auto",
  "aspect-[4/5] md:aspect-[4/5] lg:aspect-auto",
];

/**
 * Cuadrícula "bento" de los cuatro universos del grupo. Las piezas entran
 * escalonadas una sola vez; en cada pieza, la foto se acerca al pasar el
 * cursor y se listan las marcas relacionadas.
 */
export function ExperienceBento() {
  const e = HOME_EXPERIENCES;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from("[data-tile]", {
          autoAlpha: 0,
          y: 60,
          scale: 0.96,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-bento]", start: "top 80%", once: true },
        });
      });
      // Inclinación 3D sutil hacia el puntero (solo ratón).
      mm.add(`${MOTION} and (pointer: fine)`, () => {
        const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]");
        const cleanups = tiles.map((tile) => {
          gsap.set(tile, { transformPerspective: 1100 });
          const rx = gsap.quickTo(tile, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(tile, "rotationY", { duration: 0.6, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = tile.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 5);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          tile.addEventListener("pointermove", move);
          tile.addEventListener("pointerleave", leave);
          return () => {
            tile.removeEventListener("pointermove", move);
            tile.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((fn) => fn());
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="experiencias-title" className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealTitle
            id="experiencias-title"
            className="max-w-[14ch] font-serif text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] leading-[0.98] font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]"
          >
            {e.title}
          </RevealTitle>
          <Link
            href={e.link.href}
            className="group inline-flex min-h-11 items-center gap-2 self-start text-small font-semibold text-accent-text md:self-auto"
          >
            <span className="link-underline group-hover:bg-size-[100%_1px]">{e.link.label}</span>
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <ul
          data-bento
          className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 md:gap-4 lg:h-[max(40rem,min(52rem,calc(100svh-6rem)))] lg:grid-cols-4 lg:grid-rows-2"
        >
          {e.items.map((item, i) => {
            const related = BRANDS.filter((b) => b.experienceCategories.includes(item.id));
            return (
              <li
                key={item.id}
                data-tile
                className={cn(
                  "group stitched tone-ink relative isolate overflow-hidden rounded-[1.75rem] bg-ink text-cream",
                  CELLS[i],
                )}
              >
                <SmartImage
                  slot={item.media}
                  sizes={
                    i === 0
                      ? "(min-width: 1024px) 50vw, 100vw"
                      : "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className="absolute inset-0 -z-20"
                  imageClassName="transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/35 to-ink/0"
                />
                <div className="flex h-full flex-col justify-end p-6 md:p-7 lg:p-8">
                  <h3
                    className={cn(
                      "font-serif font-light tracking-[-0.02em] [font-variation-settings:'SOFT'_100]",
                      i === 0
                        ? "text-[clamp(2rem,1.3rem+2.4vw,3.5rem)] leading-[1.02]"
                        : "text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.05]",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-[40ch] text-small text-sand",
                      i === 0 && "md:text-body",
                    )}
                  >
                    {item.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Marcas de ${item.title}`}>
                    {related.map((brand) => (
                      <li key={brand.slug}>
                        <Link
                          href={brandHref(brand.slug)}
                          className="inline-flex min-h-11 items-center rounded-full bg-cream/12 px-4 text-small font-semibold text-cream ring-1 ring-cream/20 backdrop-blur-md transition-colors duration-300 hover:bg-cream hover:text-ink"
                        >
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
