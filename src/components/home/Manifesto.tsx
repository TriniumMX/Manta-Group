"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_MANIFESTO } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { Greca } from "@/components/identity/Greca";

/**
 * Manifiesto que se "enciende" palabra por palabra al avanzar el scroll.
 * El texto completo está en el DOM desde el inicio (lectores de pantalla y
 * movimiento reducido lo reciben íntegro y con contraste pleno).
 */
export function Manifesto() {
  const m = HOME_MANIFESTO;
  const root = useRef<HTMLElement>(null);
  const words = m.text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: "[data-manifesto]",
              start: "top 78%",
              end: "bottom 42%",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Manifiesto" className="bg-ivory py-24 md:py-36 lg:py-44">
      <Container>
        <p
          data-manifesto
          className="mx-auto max-w-[24ch] text-center font-serif text-[clamp(2rem,1.1rem+3.6vw,4.5rem)] leading-[1.08] font-light tracking-[-0.025em] text-ink [font-variation-settings:'SOFT'_100]"
        >
          {words.map((w, i) => (
            <span key={i} data-word className="inline">
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <Greca className="mx-auto mt-20 max-w-md text-ink/25 md:mt-28" />
        <div className="mt-12 flex justify-center">
          <Link
            href={m.link.href}
            className="group inline-flex min-h-11 items-center gap-2 text-small font-semibold text-accent-text"
          >
            <span className="link-underline group-hover:bg-size-[100%_1px]">{m.link.label}</span>
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
