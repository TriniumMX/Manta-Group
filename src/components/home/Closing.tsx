"use client";

import { useRef } from "react";
import Link from "next/link";
import { BRANDS, brandHref } from "@/config/brands";
import { HOME_CONTACT } from "@/content/home";
import { RevealTitle } from "@/components/experience/RevealTitle";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { Stitch } from "@/components/identity/Stitch";

/**
 * Cierre: un panel olivo que entra enmarcado y se expande hasta ocupar todo el
 * ancho al hacer scroll (espejo de la apertura). Crema sobre olivo profundo:
 * 8.9:1 (§6.2).
 */
export function Closing() {
  const c = HOME_CONTACT;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const side = () => (window.innerWidth < 768 ? 16 : 40);
        gsap.fromTo(
          "[data-closing-panel]",
          { clipPath: () => `inset(64px ${side()}px 0px ${side()}px round 36px)` },
          {
            clipPath: "inset(0px 0px 0px 0px round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "top 15%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
        gsap.from("[data-closing-item]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-closing-items]", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="cierre-title" className="bg-ivory">
      <div
        data-closing-panel
        className="tone-ink weave flex min-h-[min(100svh,56rem)] flex-col items-center justify-center bg-olive-deep px-4 py-28 text-center text-cream md:px-6 md:py-36"
      >
        <RevealTitle
          id="cierre-title"
          className="max-w-[16ch] font-serif text-[clamp(2.75rem,1.4rem+5.4vw,6.5rem)] leading-[0.95] font-light tracking-[-0.04em] [font-variation-settings:'SOFT'_100]"
        >
          {c.title}
        </RevealTitle>
        <div data-closing-items className="flex flex-col items-center">
          <p data-closing-item className="mt-6 max-w-[46ch] text-body text-sand">
            {c.lead}
          </p>
          <div data-closing-item className="mt-10 flex flex-wrap justify-center gap-3">
            <span className="inline-flex">
              <WhatsAppButton brand="mg" intent="general" variant="inverse" size="lg">
                {c.cta}
              </WhatsAppButton>
            </span>
            <span className="inline-flex">
              <Button
                href={c.secondary.href}
                variant="secondary"
                size="lg"
                className="border-cream/35 text-cream hover:border-cream hover:bg-cream/10"
              >
                {c.secondary.label}
              </Button>
            </span>
          </div>

          <ul
            data-closing-item
            className="mt-16 flex max-w-4xl flex-wrap justify-center gap-2.5"
            aria-label="Marcas"
          >
            {BRANDS.map((brand) => (
              <li key={brand.slug} data-brand={brand.slug}>
                <Link
                  href={brandHref(brand.slug)}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-cream/10 px-5 text-small font-semibold text-cream ring-1 ring-cream/20 transition-colors duration-300 hover:bg-cream hover:text-ink"
                >
                  <Stitch className="size-3.5 text-sand" />
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
