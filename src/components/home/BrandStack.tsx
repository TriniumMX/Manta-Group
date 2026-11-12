"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { HOME_BRANDS } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { RevealTitle } from "@/components/experience/RevealTitle";
import { ViewTransition } from "react";

/**
 * Seis tarjetas que se apilan al hacer scroll (position: sticky). Cuando la
 * siguiente marca llega, la anterior retrocede y se oscurece ligeramente, como
 * hojas que se colocan una sobre otra. Cada tarjeta adopta el acento de su marca.
 */
export function BrandStack() {
  const b = HOME_BRANDS;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector("[data-stack-inner]"), {
            scale: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          });
          gsap.to(card.querySelector("[data-stack-shade]"), {
            opacity: 0.1,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 70%", end: "top 20%", scrub: true },
          });
        });
        // Parallax suave de la foto dentro de su marco.
        gsap.utils.toArray<HTMLElement>("[data-stack-photo]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="marcas"
      aria-labelledby="marcas-title"
      className="bg-ivory pt-12 pb-16 md:pt-16 md:pb-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <RevealTitle
            id="marcas-title"
            className="font-serif text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] leading-[0.98] font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]"
          >
            {b.title}
          </RevealTitle>
          <p className="mx-auto mt-6 max-w-[40ch] text-body text-ink-soft">{b.lead}</p>
        </div>

        <ol className="mt-16 md:mt-24">
          {BRANDS.map((brand, i) => {
            const photos = b.photos[brand.slug];
            return (
              <li
                key={brand.slug}
                data-stack-card
                data-brand={brand.slug}
                className="sticky mb-6 last:mb-0 md:mb-10"
                style={{ top: `calc(5rem + ${i * 0.75}rem)` }}
              >
                <article
                  data-stack-inner
                  aria-labelledby={`marca-${brand.slug}`}
                  className="relative origin-top overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_1px_0_rgb(30_28_25/0.04),0_40px_80px_-40px_rgb(30_28_25/0.35)] ring-1 ring-ink/8 will-change-transform md:rounded-[2.25rem]"
                >
                  <div className="grid h-[calc(100svh-7rem)] max-h-[48rem] min-h-[34rem] grid-rows-[44%_1fr] lg:grid-cols-12 lg:grid-rows-1">
                    {/* Fotografías */}
                    {/* Las fotos también llevan a la marca (enlace duplicado fuera del orden de tabulación). */}
                    <Link
                      href={brandHref(brand.slug)}
                      tabIndex={-1}
                      aria-hidden
                      className="relative block p-2.5 md:p-3 lg:order-2 lg:col-span-7"
                    >
                      <ViewTransition name={`marca-${brand.slug}`} share="morph" default="none">
                        <div className="relative h-full overflow-hidden rounded-[1.25rem] bg-sand md:rounded-[1.75rem]">
                          <div data-stack-photo className="absolute -inset-y-[8%] inset-x-0">
                            <SmartImage
                              slot={photos.main}
                              sizes="(min-width: 1024px) 56vw, 100vw"
                              className="absolute inset-0"
                            />
                          </div>
                        </div>
                      </ViewTransition>
                      <div className="absolute bottom-6 left-6 hidden w-[24%] max-w-[15rem] lg:w-[30%] overflow-hidden rounded-[1.25rem] shadow-[0_24px_48px_-16px_rgb(30_28_25/0.5)] ring-[6px] ring-cream md:block lg:bottom-10 lg:-left-10">
                        <SmartImage slot={photos.inset} sizes="240px" className="aspect-[4/5]" />
                      </div>
                    </Link>

                    {/* Texto */}
                    <div className="flex min-h-0 flex-col justify-between gap-6 px-6 pt-5 pb-6 md:px-10 md:pb-10 lg:order-1 lg:col-span-5 lg:py-10 lg:pr-14 lg:pl-10 xl:py-14 xl:pr-16 xl:pl-14">
                      <div className="flex items-center gap-2.5 text-small font-semibold text-accent-text">
                        <span aria-hidden className="size-2 rounded-full bg-accent" />
                        {brand.eyebrow
                          ? `${brand.eyebrow}, ${brand.category.toLowerCase()}`
                          : brand.category}
                      </div>
                      <div>
                        <h3
                          id={`marca-${brand.slug}`}
                          className="font-serif text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] leading-[0.95] font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100] xl:text-[clamp(3.5rem,1rem+3.6vw,5.25rem)]"
                        >
                          {brand.name}
                        </h3>
                        <p className="mt-4 max-w-[40ch] text-small text-ink-soft md:text-body lg:mt-6">
                          {brand.description}
                        </p>
                      </div>
                      <Link
                        href={brandHref(brand.slug)}
                        className="group inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-accent-text py-2 pr-2 pl-6 text-[0.9375rem] font-semibold text-cream transition-colors duration-300 hover:bg-ink"
                      >
                        Explorar {brand.name}
                        <span className="inline-flex size-8 items-center justify-center rounded-full bg-cream/15">
                          <ArrowUpRight
                            aria-hidden
                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div
                    data-stack-shade
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-ink opacity-0"
                  />
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
