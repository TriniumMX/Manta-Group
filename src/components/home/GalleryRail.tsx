"use client";

import { useRef } from "react";
import { getBrandBySlug } from "@/config/brands";
import { HOME_GALLERY, type GalleryShot } from "@/content/home";
import { SmartImage } from "@/components/media/SmartImage";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { RevealTitle } from "@/components/experience/RevealTitle";

const shapes: Record<GalleryShot["shape"], string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

/** Arranque alineado con el contenedor de 1440 px. */
const lead =
  "pl-4 md:pl-6 lg:pl-10 min-[90rem]:pl-[calc((100vw-90rem)/2+2.5rem)] scroll-pl-4 md:scroll-pl-6";

/**
 * Recorrido horizontal: en escritorio, el scroll vertical desplaza la tira de
 * fotos (sección fijada). En móvil, tableta o con movimiento reducido es una
 * tira con desplazamiento nativo y snap.
 */
export function GalleryRail() {
  const g = HOME_GALLERY;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION}`, () => {
        const track = root.current!.querySelector<HTMLElement>("[data-rail]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.to("[data-rail-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="mesa-title"
      className="relative flex flex-col justify-center overflow-hidden bg-ivory py-20 lg:h-svh lg:py-0"
    >
      <div
        data-rail
        className={cn(
          "scrollbar-none flex snap-x snap-mandatory items-end gap-4 overflow-x-auto pr-4 md:gap-6 lg:snap-none lg:gap-10 lg:overflow-visible lg:pr-[12vw] motion-reduce:lg:overflow-x-auto",
          lead,
        )}
      >
        <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-end pb-14 sm:w-[24rem] lg:w-[30rem]">
          <RevealTitle
            id="mesa-title"
            className="font-serif text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] leading-[0.98] font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]"
          >
            {g.title}
          </RevealTitle>
        </div>
        {g.items.map((shot) => {
          const brand = getBrandBySlug(shot.brand);
          return (
            <figure key={shot.media.id} data-brand={shot.brand} className="shrink-0 snap-start">
              <SmartImage
                slot={shot.media}
                sizes="(min-width: 1024px) 50vw, 80vw"
                className={cn(
                  "h-[22rem] rounded-[1.5rem] bg-sand md:h-[30rem] lg:h-[min(62svh,40rem)] lg:rounded-[2rem]",
                  shapes[shot.shape],
                )}
              />
              <figcaption className="mt-4 text-small">
                <span className="font-semibold text-accent-text">{brand?.name}</span>
                <span className="block text-ink-muted">{shot.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div
        aria-hidden
        className="absolute inset-x-10 bottom-10 hidden h-px bg-ink/10 lg:block motion-reduce:hidden"
      >
        <div data-rail-progress className="h-full origin-left scale-x-0 bg-ink" />
      </div>
    </section>
  );
}
