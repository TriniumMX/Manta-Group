import { ArrowDown } from "lucide-react";
import { HOME_HERO } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/Button";

/**
 * Hero de Inicio (layout `full`): imagen a sangre con velo inferior y texto
 * alineado abajo, sobre la zona menos ocupada de la imagen. Texto crema/arena
 * sobre el velo de carbón (≥ 4.5:1 en la zona del texto).
 */
export function Hero() {
  const h = HOME_HERO;
  return (
    <section
      aria-labelledby="hero-title"
      className="tone-ink relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-ink text-cream lg:min-h-[calc(100svh-5rem)] lg:max-h-[58rem]"
    >
      <SmartImage slot={h.media} preload sizes="100vw" className="absolute inset-0 -z-20" />
      {/* Velo de legibilidad: única excepción permitida a "sin gradientes" (§6.2). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/45 to-ink/5"
      />

      <Container className="pt-40 pb-12 md:pb-20 lg:pb-24">
        <p className="text-eyebrow text-sand">{h.eyebrow}</p>
        <h1 id="hero-title" className="mt-6 max-w-5xl text-display">
          {h.title} <em className="font-light text-sand">{h.titleAccent}</em>
        </h1>
        <p className="mt-6 max-w-[52ch] text-body text-sand md:mt-8">{h.subtitle}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <Button href={h.primaryCta.href} variant="inverse" size="lg" icon={ArrowDown}>
            {h.primaryCta.label}
          </Button>
          <Button
            href={h.secondaryCta.href}
            variant="secondary"
            size="lg"
            className="border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
          >
            {h.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
