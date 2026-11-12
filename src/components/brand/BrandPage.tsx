import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/config/brands";
import { BRAND_PAGES } from "@/content/brand-pages";
import { RevealTitle } from "@/components/experience/RevealTitle";
import { Container } from "@/components/layout/Container";
import { Gallery } from "@/components/media/Gallery";
import { BrandModules } from "@/components/modules/brand/BrandModules";
import { ServiceCards } from "@/components/modules/services/ServiceCards";
import { BrandContactStrip } from "./BrandContactStrip";
import { Reveal } from "@/components/ui/Reveal";
import { StickyWhatsApp } from "@/components/whatsapp/StickyWhatsApp";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { cn } from "@/lib/utils";
import { parseFigure } from "@/lib/figure";
import { AnimatedFigure } from "@/components/motion/AnimatedFigure";
import type { BrandSlug } from "@/types/content";
import { BrandCard } from "./BrandCard";
import { BrandHero } from "./BrandHero";

const display = "font-serif font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]";

/**
 * Página de marca: portada propia (BrandHero), lo que ofrece (servicios o
 * lista), galería con visor, dato protagonista, módulos propios (`children`),
 * llamado a WhatsApp (demo) y el resto de marcas. Todo adopta el acento de la
 * marca vía `data-brand`. En móvil, una barra de WhatsApp acompaña el recorrido.
 */
export function BrandPage({ slug, children }: { slug: BrandSlug; children?: React.ReactNode }) {
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();
  const page = BRAND_PAGES[slug];
  const others = BRANDS.filter((b) => b.slug !== brand.slug);

  return (
    <div data-brand={brand.slug}>
      <BrandHero brand={brand} page={page} />
      <BrandContactStrip slug={brand.slug} intent={page.cta.intent} ctaLabel={page.cta.label} />

      {/* Lo que ofrece */}
      <section id="oferta" aria-labelledby="oferta-title" className="bg-ivory py-20 md:py-32">
        {page.services ? (
          <Container>
            <RevealTitle
              id="oferta-title"
              className={cn(
                display,
                "max-w-[18ch] text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)] leading-[1]",
              )}
            >
              {page.offerTitle}
            </RevealTitle>
            <div className="mt-12 md:mt-16">
              <ServiceCards items={page.services} />
            </div>
          </Container>
        ) : (
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <RevealTitle
                id="oferta-title"
                className={cn(
                  display,
                  "text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.02] lg:sticky lg:top-28",
                )}
              >
                {page.offerTitle}
              </RevealTitle>
            </div>
            <ul className="border-t border-ink/15 lg:col-span-8">
              {page.offers.map((offer, i) => (
                <li key={offer} className="group border-b border-ink/15">
                  <Reveal
                    delay={(i % 4) * 60}
                    className="flex items-center justify-between gap-6 py-5 md:py-7"
                  >
                    <span
                      className={cn(
                        display,
                        "text-[clamp(2rem,1.3rem+3.2vw,4.25rem)] leading-[1] transition-transform duration-500 ease-(--ease-editorial) group-hover:translate-x-3",
                      )}
                    >
                      {offer}
                    </span>
                    <span
                      aria-hidden
                      className="size-3 shrink-0 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150"
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        )}
      </section>

      <BrandModules blocks={page.modules} />

      {/* Galería */}
      <section id="galeria" aria-labelledby="galeria-title" className="bg-ivory py-20 md:py-32">
        <Container>
          <h2 id="galeria-title" className="sr-only">
            Galería de {brand.name}
          </h2>
          <Gallery items={page.gallery} label={`Fotografías de ${brand.name}`} />
        </Container>
      </section>

      {/* Dato protagonista */}
      <section
        aria-label="Dato de la marca"
        className="tone-ink bg-ink py-24 text-center text-cream md:py-36"
      >
        <Container>
          {parseFigure(page.fact.highlight) ? (
            // Cifras: ruedan como odómetro al entrar en pantalla.
            <p
              className={cn(
                display,
                "text-[clamp(3.5rem,1.5rem+9vw,10rem)] leading-[0.92] text-copper",
              )}
            >
              <AnimatedFigure text={page.fact.highlight} />
            </p>
          ) : (
            <RevealTitle
              as="p"
              className={cn(
                display,
                "text-[clamp(3.5rem,1.5rem+9vw,10rem)] leading-[0.92] text-copper",
              )}
            >
              {page.fact.highlight}
            </RevealTitle>
          )}
          <p className="mx-auto mt-6 max-w-[40ch] text-body text-sand">{page.fact.text}</p>
        </Container>
      </section>

      {children}

      {/* Llamado a WhatsApp */}
      <section id="llamado" aria-labelledby="cta-title" className="bg-ivory py-16 md:py-24">
        <Container>
          <div className="tone-ink relative flex flex-col items-center overflow-hidden rounded-[2rem] bg-accent-text px-6 py-20 text-center text-cream md:rounded-[2.5rem] md:py-28">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-1/2 left-1/2 size-[48rem] -translate-x-1/2 rounded-full bg-cream/8 blur-[100px]"
            />
            <RevealTitle
              id="cta-title"
              className={cn(
                display,
                "relative max-w-[14ch] text-[clamp(2.5rem,1.4rem+4.6vw,5.5rem)] leading-[0.96]",
              )}
            >
              {page.cta.title}
            </RevealTitle>
            <span className="relative mt-10 inline-flex">
              <WhatsAppButton
                brand={brand.slug}
                intent={page.cta.intent}
                variant="inverse"
                size="lg"
              >
                {page.cta.label}
              </WhatsAppButton>
            </span>
            <p className="relative mt-6 max-w-[44ch] text-small text-cream">
              Demo: el número de WhatsApp de {brand.name} está pendiente de configurar.
            </p>
          </div>
        </Container>
      </section>

      {/* Otras marcas */}
      <section aria-labelledby="otras-marcas" className="bg-ivory pb-24 md:pb-32">
        <Container>
          <h2
            id="otras-marcas"
            className={cn(display, "text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.02]")}
          >
            Otras marcas del grupo
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug}>
                <BrandCard brand={other} compact />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <StickyWhatsApp
        brand={brand.slug}
        brandName={brand.name}
        intent={page.cta.intent}
        label="WhatsApp"
        afterId="contacto-rapido"
        beforeId="llamado"
      />
    </div>
  );
}
