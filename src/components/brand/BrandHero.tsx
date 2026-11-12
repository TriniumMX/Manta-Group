import { ArrowDown } from "lucide-react";
import type { BrandPageContent } from "@/content/brand-pages";
import { ScrollZoom } from "@/components/experience/ScrollZoom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types/content";
import { ViewTransition } from "react";

const display =
  "font-serif font-light tracking-[-0.04em] [font-variation-settings:'SOFT'_100,'opsz'_144]";

/** Nombre de la marca con entrada por líneas (una palabra por línea). */
function BrandTitle({
  brand,
  className,
  inline = false,
}: {
  brand: Brand;
  className?: string;
  /** En escritorio, las palabras van en una sola línea. */
  inline?: boolean;
}) {
  return (
    <h1 id="marca-title" className={cn(display, className, "leading-[0.9]")}>
      {brand.name.split(" ").map((word, i) => (
        <span
          key={word}
          className={cn(
            "block overflow-hidden pb-[0.12em]",
            inline && "lg:mr-[0.22em] lg:inline-block lg:last:mr-0",
          )}
        >
          <span
            className="block animate-cover-line"
            style={{ animationDelay: `${100 + i * 130}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}

function Pill({ brand, dark }: { brand: Brand; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex w-fit animate-cover-fade items-center gap-2.5 rounded-full px-4 py-2 text-small font-semibold",
        dark
          ? "bg-ink/45 text-cream ring-1 ring-cream/20 backdrop-blur-md"
          : "bg-cream text-accent-text ring-1 ring-ink/8",
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-accent ring-1 ring-cream/30" />
      {brand.eyebrow ? `${brand.eyebrow}, ${brand.category.toLowerCase()}` : brand.category}
    </p>
  );
}

function Actions({
  brand,
  page,
  dark,
  center,
}: {
  brand: Brand;
  page: BrandPageContent;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-8 flex animate-cover-fade flex-wrap gap-3 [animation-delay:540ms]",
        center && "justify-center",
      )}
    >
      <span className="inline-flex">
        <WhatsAppButton
          brand={brand.slug}
          intent={page.cta.intent}
          variant={dark ? "inverse" : "primary"}
          size="lg"
        >
          {page.cta.label}
        </WhatsAppButton>
      </span>
      <Button
        href="#oferta"
        variant="secondary"
        size="lg"
        icon={ArrowDown}
        className={
          dark ? "border-cream/35 text-cream hover:border-cream hover:bg-cream/10" : undefined
        }
      >
        Ver qué ofrece
      </Button>
    </div>
  );
}

function Copy({ brand, dark, center }: { brand: Brand; dark?: boolean; center?: boolean }) {
  return (
    <>
      <p
        className={cn(
          display,
          "mt-5 animate-cover-fade text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.1] [animation-delay:380ms]",
          center ? "mx-auto max-w-[28ch]" : "max-w-[24ch]",
          dark ? "text-sand" : "text-accent-text",
        )}
      >
        {brand.tagline}
      </p>
      <p
        className={cn(
          "mt-5 animate-cover-fade text-body [animation-delay:460ms]",
          center ? "mx-auto max-w-[52ch]" : "max-w-[48ch]",
          dark ? "text-sand" : "text-ink-soft",
        )}
      >
        {brand.description}
      </p>
    </>
  );
}

function Crumbs({ brand, dark }: { brand: Brand; dark?: boolean }) {
  return (
    <Breadcrumb
      className={dark ? "[&_a:hover]:text-cream [&_ol]:text-sand [&_span]:text-cream" : undefined}
      items={[
        { label: "Inicio", href: "/" },
        { label: "Nuestras marcas", href: "/marcas" },
        { label: brand.name },
      ]}
    />
  );
}

/** Foto principal con entrada de "telón". */
function HeroImage({
  brand,
  className,
  sizes,
}: {
  brand: Brand;
  className?: string;
  sizes: string;
}) {
  return (
    // Destino de la transición entre páginas: la foto de la tarjeta de la marca
    // se transforma en esta (mismo `name` en BrandCard y BrandStack).
    <ViewTransition name={`marca-${brand.slug}`} share="morph" default="none">
      <div className={cn("relative w-full overflow-hidden bg-sand", className)}>
        <SmartImage
          slot={brand.heroSlot}
          preload
          sizes={sizes}
          className="absolute inset-0"
          imageClassName="animate-cover-settle [animation-delay:200ms]"
        />
      </div>
    </ViewTransition>
  );
}

/**
 * Portada de marca con seis composiciones (PLAN_MG §7.3). Todas comparten
 * migas, categoría, nombre, frase, descripción y los dos llamados.
 */
export function BrandHero({ brand, page }: { brand: Brand; page: BrandPageContent }) {
  const [g1, g2, g3] = page.gallery;

  switch (page.hero) {
    /* César Fuentes: ceremoniosa y centrada; la foto panorámica se acerca. */
    case "panorama":
      return (
        <section
          id="portada"
          aria-labelledby="marca-title"
          className="bg-surface-tint pb-16 md:pb-24"
        >
          <Container className="pt-4 md:pt-6">
            <Crumbs brand={brand} />
            <div className="mx-auto mt-10 max-w-5xl text-center md:mt-16">
              <Pill brand={brand} />
              <BrandTitle
                brand={brand}
                inline
                className="mt-6 text-[clamp(3.5rem,1.4rem+7vw,8.5rem)]"
              />
              <Copy brand={brand} center />
              <Actions brand={brand} page={page} center />
            </div>
            <ScrollZoom from={0.84} className="mt-14 md:mt-20">
              <HeroImage
                brand={brand}
                sizes="(min-width: 1440px) 1360px, 100vw"
                className="aspect-[4/3] rounded-[1.75rem] md:aspect-[21/9] md:rounded-[2.5rem]"
              />
            </ScrollZoom>
          </Container>
        </section>
      );

    /* La Trufa: cacao oscuro, el producto como joya. */
    case "cacao":
      return (
        <section
          id="portada"
          aria-labelledby="marca-title"
          className="tone-ink relative overflow-hidden bg-[#1f130f] text-cream"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-[-10%] size-[44rem] rounded-full bg-[#4a2e25] opacity-60 blur-[120px]"
          />
          <Container className="relative pt-4 pb-20 md:pt-6 md:pb-28">
            <Crumbs brand={brand} dark />
            <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-6">
                <Pill brand={brand} dark />
                <BrandTitle brand={brand} className="mt-6 text-[clamp(3.5rem,1.4rem+8vw,9rem)]" />
                <Copy brand={brand} dark />
                <Actions brand={brand} page={page} dark />
              </div>
              <div className="relative lg:col-span-6">
                <HeroImage
                  brand={brand}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="mx-auto aspect-[4/5] max-w-[30rem] rounded-full shadow-[0_60px_120px_-40px_rgb(0_0_0/0.8)] ring-1 ring-cream/10"
                />
                {[g1, g2].filter(Boolean).map((slot, i) => (
                  <div
                    key={slot.id}
                    className={cn(
                      "absolute hidden aspect-square w-[34%] max-w-[12rem] animate-cover-unveil overflow-hidden rounded-full shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] ring-[6px] ring-[#1f130f] sm:block",
                      i === 0
                        ? "top-[6%] left-0 [animation-delay:420ms]"
                        : "right-0 bottom-[4%] [animation-delay:560ms]",
                    )}
                  >
                    <SmartImage
                      slot={{ ...slot, alt: "" }}
                      sizes="200px"
                      className="absolute inset-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      );

    /* Hoja Santa: titular sobre la foto y submenú de anclas. */
    case "poster":
      return (
        <section id="portada" aria-labelledby="marca-title" className="bg-ivory">
          <Container className="pt-4 md:pt-6">
            <Crumbs brand={brand} />
            <div className="tone-ink relative mt-6 overflow-hidden rounded-[1.75rem] text-cream md:mt-8 md:rounded-[2.5rem]">
              <HeroImage
                brand={brand}
                sizes="(min-width: 1440px) 1360px, 100vw"
                className="absolute inset-0 h-full"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/45 to-ink/10"
              />
              <div className="relative flex min-h-[min(88svh,52rem)] flex-col justify-end p-6 md:p-12 lg:p-16">
                <Pill brand={brand} dark />
                <BrandTitle
                  brand={brand}
                  className="mt-6 text-[clamp(3.5rem,1.4rem+9vw,10.5rem)]"
                />
                <div className="grid gap-x-10 lg:grid-cols-2 lg:items-end">
                  <Copy brand={brand} dark />
                  <Actions brand={brand} page={page} dark />
                </div>
              </div>
            </div>
            <nav
              aria-label="Secciones de la marca"
              className="scrollbar-none mt-4 flex gap-2 overflow-x-auto pb-2"
            >
              {[
                ["#oferta", "Lo que ofrece"],
                ["#galeria", "Galería"],
                ["#llamado", "Contacto"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-cream px-5 text-small font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-accent-text hover:text-cream"
                >
                  {label}
                </a>
              ))}
            </nav>
          </Container>
        </section>
      );

    /* Black Pimienta / Gastro Lab: carbón con retícula técnica. */
    case "lab":
      return (
        <section
          id="portada"
          aria-labelledby="marca-title"
          className="tone-ink relative overflow-hidden bg-ink text-cream"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(var(--color-cream)_1px,transparent_1px),linear-gradient(90deg,var(--color-cream)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_75%)]"
          />
          <Container className="relative pt-4 pb-20 md:pt-6 md:pb-28">
            <Crumbs brand={brand} dark />
            <div className="mt-10 md:mt-16">
              <Pill brand={brand} dark />
              <BrandTitle
                brand={brand}
                inline
                className="mt-6 text-[clamp(3.5rem,1rem+8.4vw,10.5rem)] text-cream"
              />
              <div className="grid gap-x-10 lg:grid-cols-2 lg:items-end">
                <div>
                  <p
                    className={cn(
                      display,
                      "mt-5 max-w-[24ch] animate-cover-fade text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.1] text-accent [animation-delay:380ms]",
                    )}
                  >
                    {brand.tagline}
                  </p>
                  <p className="mt-5 max-w-[48ch] animate-cover-fade text-body text-sand [animation-delay:460ms]">
                    {brand.description}
                  </p>
                </div>
                <Actions brand={brand} page={page} dark />
              </div>
            </div>
            <ul className="mt-14 grid grid-cols-3 gap-3 md:mt-20 md:gap-5">
              {[g1, g2, g3].filter(Boolean).map((slot, i) => (
                <li
                  key={slot.id}
                  className="relative aspect-[3/4] animate-cover-unveil overflow-hidden rounded-[1rem] bg-ink-soft md:aspect-[4/3] md:rounded-[1.5rem]"
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                >
                  <SmartImage
                    slot={{ ...slot, alt: "" }}
                    sizes="(min-width: 768px) 30vw, 33vw"
                    className="absolute inset-0"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      );

    /* Agatha: luminosa, centrada, tono miel. */
    case "light":
      return (
        <section id="portada" aria-labelledby="marca-title" className="bg-accent-soft">
          <Container className="pt-4 pb-16 md:pt-6 md:pb-24">
            <Crumbs brand={brand} />
            <div className="mx-auto mt-10 max-w-4xl text-center md:mt-16">
              <Pill brand={brand} />
              <BrandTitle brand={brand} className="mt-6 text-[clamp(4rem,1.4rem+11vw,12rem)]" />
              <Copy brand={brand} center />
              <Actions brand={brand} page={page} center />
            </div>
            <div className="relative mx-auto mt-14 max-w-5xl md:mt-20">
              <HeroImage
                brand={brand}
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="aspect-[4/3] rounded-[2.5rem] md:aspect-[16/9] md:rounded-[3.5rem]"
              />
              {g1 && (
                <div className="absolute -bottom-10 -left-2 hidden w-[24%] max-w-[13rem] animate-cover-unveil overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-20px_rgb(30_28_25/0.45)] ring-8 ring-cream [animation-delay:500ms] md:block lg:-left-12">
                  <SmartImage slot={{ ...g1, alt: "" }} sizes="220px" className="aspect-[4/5]" />
                </div>
              )}
            </div>
          </Container>
        </section>
      );

    /* Camelia (y por defecto): dividida, con textura de taller. */
    default:
      return (
        <section
          id="portada"
          aria-labelledby="marca-title"
          className="relative overflow-hidden bg-surface-tint"
        >
          <div aria-hidden className="grain pointer-events-none absolute inset-0" />
          <Container className="relative pt-4 pb-16 md:pt-6 md:pb-24">
            <Crumbs brand={brand} />
            <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-14">
              <div className="lg:col-span-6 lg:pb-8">
                <Pill brand={brand} />
                <BrandTitle brand={brand} className="mt-6 text-[clamp(3.25rem,1.6rem+7vw,8rem)]" />
                <Copy brand={brand} />
                <Actions brand={brand} page={page} />
              </div>
              <div className="grid grid-cols-5 gap-3 lg:col-span-6 md:gap-4">
                <HeroImage
                  brand={brand}
                  sizes="(min-width: 1024px) 28vw, 60vw"
                  className="col-span-3 aspect-[3/4] rounded-[1.75rem] md:rounded-[2.25rem]"
                />
                <div className="col-span-2 flex flex-col gap-3 pt-10 md:gap-4 md:pt-16">
                  {[g1, g3].filter(Boolean).map((slot, i) => (
                    <div
                      key={slot.id}
                      className="relative aspect-square animate-cover-unveil overflow-hidden rounded-[1.25rem] bg-sand md:rounded-[1.75rem]"
                      style={{ animationDelay: `${380 + i * 140}ms` }}
                    >
                      <SmartImage
                        slot={{ ...slot, alt: "" }}
                        sizes="(min-width: 1024px) 18vw, 40vw"
                        className="absolute inset-0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      );
  }
}
