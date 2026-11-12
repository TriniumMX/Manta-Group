import type { BrandModuleBlock } from "@/content/brand-pages";
import { RevealTitle } from "@/components/experience/RevealTitle";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { Collections } from "./Collections";
import { AnimatedFigure } from "@/components/motion/AnimatedFigure";
import { Stitch } from "@/components/identity/Stitch";

const display = "font-serif font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]";
const h2 = cn(display, "max-w-[20ch] text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)] leading-[1]");

function Lead({ children, dark }: { children?: React.ReactNode; dark?: boolean }) {
  if (!children) return null;
  return (
    <p className={cn("mt-5 max-w-[52ch] text-body", dark ? "text-sand" : "text-ink-soft")}>
      {children}
    </p>
  );
}

/** Un módulo de contenido de marca. Cada tipo tiene su propia composición. */
function Block({ block, index }: { block: BrandModuleBlock; index: number }) {
  const id = `modulo-${index}`;

  switch (block.kind) {
    /* Frases grandes en columnas (misión, visión, filosofía). */
    case "statements":
      return (
        <section aria-labelledby={id} className="bg-surface-tint py-20 md:py-32">
          <Container>
            <RevealTitle id={id} className={h2}>
              {block.title}
            </RevealTitle>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] bg-ink/10 md:mt-16 md:grid-cols-3">
              {block.items.map((item, i) => (
                <Reveal
                  key={item.label}
                  delay={i * 90}
                  className="flex flex-col bg-cream p-8 md:p-10"
                >
                  <dt className="flex items-center gap-2.5 text-small font-semibold text-accent-text">
                    <Stitch className="size-3.5" />
                    {item.label}
                  </dt>
                  <dd
                    className={cn(
                      display,
                      "mt-10 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.02] md:mt-16",
                    )}
                  >
                    {item.text}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </Container>
        </section>
      );

    /* Ficha técnica oscura con cifras grandes (orígenes del cacao). */
    case "specs":
      return (
        <section
          aria-labelledby={id}
          className="tone-ink relative overflow-hidden bg-[#1f130f] py-20 text-cream md:py-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-60 -left-40 size-[40rem] rounded-full bg-[#4a2e25] opacity-50 blur-[120px]"
          />
          <Container className="relative">
            <RevealTitle id={id} className={h2}>
              {block.title}
            </RevealTitle>
            <Lead dark>{block.lead}</Lead>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] bg-cream/12 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
              {block.items.map((item, i) => (
                <Reveal
                  key={item.label}
                  delay={i * 80}
                  className="flex flex-col bg-[#1f130f] p-7 md:p-9"
                >
                  <p
                    className={cn(
                      display,
                      "text-[clamp(4rem,2.4rem+5vw,6.5rem)] leading-[0.9] text-copper",
                    )}
                  >
                    <AnimatedFigure text={item.value} />
                  </p>
                  <p className="mt-6 text-[1.25rem] font-semibold text-cream">{item.label}</p>
                  <p className="mt-2 text-small text-sand">{item.note}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      );

    /* Mapa de origen: producto ··· lugar, como un índice. */
    case "origins":
      return (
        <section aria-labelledby={id} className="bg-ivory py-20 md:py-32">
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <RevealTitle id={id} className={h2}>
                  {block.title}
                </RevealTitle>
                <Lead>{block.lead}</Lead>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ul className="border-t border-ink/15">
                {block.items.map((item, i) => (
                  <li key={item.product} className="group border-b border-ink/15">
                    <Reveal
                      delay={(i % 4) * 60}
                      className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-4 md:py-6"
                    >
                      {item.image && (
                        <SmartImage
                          slot={{ id: item.image, alt: "" }}
                          sizes="64px"
                          className="mb-2 size-14 shrink-0 rounded-full bg-sand sm:mb-0 md:size-16"
                        />
                      )}
                      <span
                        className={cn(
                          display,
                          "text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-[1.05]",
                        )}
                      >
                        {item.product}
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-px min-w-8 flex-1 translate-y-[-0.35em] border-b border-dotted border-ink/30 sm:block"
                      />
                      <span className="inline-flex shrink-0 items-center gap-2 text-small font-semibold text-accent-text">
                        <Stitch className="size-3.5" />
                        {item.place}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
              {block.note && <p className="mt-6 text-body text-ink-soft">{block.note}</p>}
              {block.items.some((i) => i.image) && (
                <p className="mt-3 text-small text-ink-muted">
                  Fotos de referencia: no representan los productos reales.
                </p>
              )}
            </div>
          </Container>
        </section>
      );

    /* Colecciones con selector segmentado. */
    case "collections":
      return (
        <section aria-labelledby={id} className="bg-surface-tint py-20 md:py-32">
          <Container>
            <RevealTitle id={id} className={h2}>
              {block.title}
            </RevealTitle>
            <Lead>{block.lead}</Lead>
            <div className="mt-10 md:mt-14">
              <Collections items={block.items} label={block.title} />
            </div>
          </Container>
        </section>
      );

    /* Carta impresa de platillos de la casa. */
    case "dishes":
      return (
        <section aria-labelledby={id} className="bg-ivory py-20 md:py-32">
          <Container>
            <div className="relative mx-auto max-w-3xl rounded-[2rem] bg-cream px-6 py-14 text-center shadow-[0_40px_80px_-50px_rgb(30_28_25/0.45)] ring-1 ring-ink/8 md:rounded-[2.5rem] md:px-16 md:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-accent/30 md:inset-4 md:rounded-[2rem]"
              />
              <RevealTitle
                id={id}
                className={cn(
                  display,
                  "mx-auto max-w-[16ch] text-[clamp(2.25rem,1.4rem+3vw,4rem)] leading-[1]",
                )}
              >
                {block.title}
              </RevealTitle>
              {block.lead && (
                <p className="mx-auto mt-5 max-w-[44ch] text-body text-ink-soft">{block.lead}</p>
              )}
              <span aria-hidden className="mx-auto mt-10 block h-px w-16 bg-accent" />
              <ul className="mt-10 space-y-5 md:space-y-6">
                {block.items.map((dish, i) => (
                  <Reveal key={dish} delay={i * 50}>
                    <li
                      className={cn(
                        display,
                        "text-[clamp(1.625rem,1.3rem+1.3vw,2.375rem)] leading-[1.1]",
                      )}
                    >
                      {dish}
                    </li>
                  </Reveal>
                ))}
              </ul>
              {block.note && (
                <p className="mx-auto mt-12 max-w-[44ch] text-small text-ink-muted">{block.note}</p>
              )}
            </div>
          </Container>
        </section>
      );

    /* Retrato: foto + nombre + texto. */
    case "person":
      return (
        <section aria-labelledby={id} className="bg-ivory py-20 md:py-32">
          <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SmartImage
                slot={block.media}
                useAspect
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] rounded-[1.75rem] bg-sand md:rounded-[2.25rem]"
              />
            </Reveal>
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2.5 text-small font-semibold text-accent-text">
                <Stitch className="size-3.5" />
                {block.role}
              </p>
              <RevealTitle
                id={id}
                className={cn(
                  display,
                  "mt-5 text-[clamp(2.75rem,1.6rem+4.4vw,5.5rem)] leading-[0.95]",
                )}
              >
                {block.name}
              </RevealTitle>
              <div className="mt-8 max-w-[58ch] space-y-5">
                {block.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-body text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </section>
      );

    /* Cita destacada a todo el ancho. */
    case "quote":
      return (
        <section aria-label="Cita" className="bg-ivory py-20 md:py-28">
          <Container>
            <figure className="mx-auto max-w-5xl text-center">
              <span
                aria-hidden
                className={cn(display, "block text-[7rem] leading-[0.6] text-accent")}
              >
                “
              </span>
              <RevealTitle
                as="p"
                className={cn(
                  display,
                  "mt-4 text-[clamp(2rem,1.2rem+3.4vw,4.25rem)] leading-[1.08]",
                )}
              >
                {block.text}
              </RevealTitle>
              {block.cite && (
                <figcaption className="mt-8 text-small font-semibold text-accent-text">
                  {block.cite}
                </figcaption>
              )}
            </figure>
          </Container>
        </section>
      );

    /* Clientes (imagen de logotipos del documento de la marca). */
    case "clients":
      return (
        <section aria-labelledby={id} className="bg-ivory py-20 md:py-32">
          <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealTitle id={id} className={h2}>
                {block.title}
              </RevealTitle>
              <Lead>{block.lead}</Lead>
            </div>
            <Reveal className="lg:col-span-7">
              <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgb(30_28_25/0.45)] ring-1 ring-ink/8 md:rounded-[2.25rem] md:p-10">
                <SmartImage
                  slot={block.media}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[548/710] max-h-[38rem] w-full"
                  imageClassName="object-contain"
                />
              </div>
            </Reveal>
          </Container>
        </section>
      );
  }
}

/** Módulos de contenido propios de cada marca, en el orden del contenido. */
export function BrandModules({ blocks }: { blocks: BrandModuleBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={`${block.kind}-${i}`} block={block} index={i} />
      ))}
    </>
  );
}
