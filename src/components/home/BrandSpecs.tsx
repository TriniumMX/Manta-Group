"use client";

import { useRef } from "react";
import Link from "next/link";
import { brandHref, getBrandBySlug } from "@/config/brands";
import { HOME_SPECS } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { RevealTitle } from "@/components/experience/RevealTitle";

/**
 * Ficha de datos reales por marca, en la sección oscura de contrapunto.
 * La palabra protagonista va en cobre (permitido sobre carbón solo en texto
 * grande, §6.2); el resto en crema y arena.
 */
export function BrandSpecs() {
  const s = HOME_SPECS;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from("[data-spec]", {
          autoAlpha: 0,
          y: 48,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-specs]", start: "top 78%", once: true },
        });
      });
      // Foco de luz que sigue al puntero dentro de la ficha.
      mm.add("(pointer: fine)", () => {
        const grid = root.current!.querySelector<HTMLElement>("[data-specs]")!;
        const move = (e: PointerEvent) => {
          const r = grid.getBoundingClientRect();
          grid.style.setProperty("--mx", `${e.clientX - r.left}px`);
          grid.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        grid.addEventListener("pointermove", move);
        return () => grid.removeEventListener("pointermove", move);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="specs-title"
      className="tone-ink bg-ink py-24 text-cream md:py-32 lg:py-40"
    >
      <Container>
        <RevealTitle
          id="specs-title"
          className="font-serif text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] leading-[0.98] font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]"
        >
          {s.title}
        </RevealTitle>

        <ul
          data-specs
          className="group/specs relative mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-cream/12 md:mt-20 md:grid-cols-2 lg:grid-cols-3"
        >
          {s.items.map(({ brand: slug, highlight, fact }) => {
            const brand = getBrandBySlug(slug);
            if (!brand) return null;
            return (
              <li
                key={slug}
                data-spec
                data-brand={slug}
                className="flex flex-col bg-ink p-7 md:p-9 lg:p-10"
              >
                <p className="font-serif text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] leading-none font-light tracking-[-0.03em] text-copper [font-variation-settings:'SOFT'_100]">
                  {highlight}
                </p>
                <p className="mt-5 max-w-[30ch] text-body text-sand">{fact}</p>
                <Link
                  href={brandHref(slug)}
                  className="group mt-auto inline-flex min-h-11 items-center gap-2.5 self-start pt-6 text-small font-semibold text-cream"
                >
                  <span
                    aria-hidden
                    className="size-2 rounded-full bg-accent ring-1 ring-cream/30"
                  />
                  <span className="link-underline group-hover:bg-size-[100%_1px]">
                    {brand.name}
                  </span>
                </Link>
              </li>
            );
          })}
          <li
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/specs:opacity-100 [background:radial-gradient(28rem_circle_at_var(--mx,50%)_var(--my,50%),rgb(251_248_242/0.09),transparent_70%)]"
          />
        </ul>
      </Container>
    </section>
  );
}
