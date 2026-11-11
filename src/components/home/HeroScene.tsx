"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { HOME_HERO } from "@/content/home";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/Button";
import { gsap, MOTION, REDUCED, useGSAP } from "@/lib/gsap";

/**
 * Escena de apertura. La fotografía arranca enmarcada bajo el titular y, al
 * hacer scroll, se abre hasta ocupar toda la pantalla mientras el titular se
 * retira (sección fijada con ScrollTrigger). Con movimiento reducido no hay
 * fijado: la foto queda enmarcada con su texto visible.
 */
export function HeroScene() {
  const h = HOME_HERO;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const copy = section.querySelector<HTMLElement>("[data-hero-copy]")!;
      const frame = section.querySelector<HTMLElement>("[data-hero-frame]")!;

      /** Recorte inicial: debajo del bloque de texto, con margen lateral. */
      const framed = () => {
        const w = section.clientWidth;
        const hgt = section.clientHeight;
        const top = Math.min(copy.offsetTop + copy.offsetHeight + 28, hgt * 0.72);
        const side = w < 768 ? 16 : w < 1024 ? 24 : Math.max(40, (w - 1360) / 2);
        const bottom = w < 768 ? 16 : 24;
        const r = w < 768 ? 24 : 32;
        return `inset(${top}px ${side}px ${bottom}px ${side}px round ${r}px)`;
      };

      const mm = gsap.matchMedia();

      mm.add(REDUCED, () => {
        gsap.set(frame, { clipPath: framed() });
      });

      mm.add(MOTION, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          frame,
          { clipPath: framed },
          { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 1 },
          0,
        )
          .fromTo("[data-hero-zoom]", { scale: 1.18 }, { scale: 1, duration: 1 }, 0)
          .to(copy, { yPercent: -40, autoAlpha: 0, duration: 0.32 }, 0)
          .fromTo("[data-hero-veil]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0.45)
          .fromTo(
            "[data-hero-statement]",
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.35 },
            0.62,
          )
          .to({}, { duration: 0.15 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    // El margen negativo vive en un envoltorio: el elemento fijado no debe tenerlo.
    <div className="-mt-16 lg:-mt-20">
      <section
        ref={root}
        aria-labelledby="hero-title"
        className="relative h-svh min-h-[40rem] overflow-hidden bg-ivory"
      >
        {/* Capa de imagen a pantalla completa, recortada por clip-path. */}
        <div
          data-hero-frame
          className="tone-ink absolute inset-0 overflow-hidden bg-ink text-cream [clip-path:inset(58%_16px_16px_16px_round_24px)] md:[clip-path:inset(56%_24px_24px_24px_round_32px)] lg:[clip-path:inset(54%_40px_24px_40px_round_32px)]"
        >
          <div data-hero-zoom className="absolute inset-0 will-change-transform">
            <SmartImage
              slot={h.media}
              preload
              sizes="100vw"
              className="absolute inset-0"
              imageClassName="animate-cover-settle [animation-delay:var(--intro-delay)]"
            />
          </div>
          <div
            data-hero-veil
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/40 to-ink/10 opacity-0 motion-reduce:opacity-100"
          />
          <div
            data-hero-statement
            className="absolute inset-x-0 bottom-0 mx-auto max-w-site px-6 pb-10 opacity-0 md:px-10 md:pb-16 motion-reduce:opacity-100"
          >
            <p className="max-w-[22ch] font-serif text-[clamp(1.75rem,1rem+3vw,3.75rem)] leading-[1.05] font-light tracking-[-0.02em] text-cream [font-variation-settings:'SOFT'_100]">
              {h.statement}
            </p>
            <p className="mt-5 text-small text-sand">{h.caption}</p>
          </div>
        </div>

        {/* Titular y llamados a la acción. */}
        <div
          data-hero-copy
          className="relative mx-auto flex max-w-site flex-col items-center px-4 pt-28 text-center md:px-6 lg:pt-32"
        >
          <p className="max-w-[44ch] animate-cover-fade text-small text-ink-muted [animation-delay:var(--intro-delay)]">
            {h.kicker}
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-serif text-[clamp(3rem,1rem+6.4vw,7.75rem)] leading-[0.92] font-light tracking-[-0.04em] text-ink [font-variation-settings:'SOFT'_100,'opsz'_144]"
          >
            {h.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  className="block animate-cover-line"
                  style={{ animationDelay: `calc(var(--intro-delay) + ${120 + i * 150}ms)` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="mt-7 flex animate-cover-fade flex-wrap justify-center gap-3 [animation-delay:calc(var(--intro-delay)+520ms)]">
            <span className="inline-flex">
              <Button href={h.primaryCta.href} size="md" icon={ArrowDown}>
                {h.primaryCta.label}
              </Button>
            </span>
            <span className="inline-flex max-sm:hidden">
              <Button href={h.secondaryCta.href} variant="secondary" size="md">
                {h.secondaryCta.label}
              </Button>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
