import type { Metadata } from "next";
import { ABOUT } from "@/content/about";
import { HOME_HERO } from "@/content/home";
import { RevealTitle } from "@/components/experience/RevealTitle";
import { BrandSpecs } from "@/components/home/BrandSpecs";
import { Closing } from "@/components/home/Closing";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Manta Group: seis marcas gastronómicas y artesanales de San Juan del Río, Querétaro, fundadas por el Chef César Fuentes.",
};

const display = "font-serif font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]";

export default function NosotrosPage() {
  const f = ABOUT.founder;
  return (
    <>
      <section aria-labelledby="nosotros-title" className="bg-ivory">
        <Container className="pt-4 pb-10 md:pt-6 md:pb-16">
          <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]} />
          <div className="mt-12 grid gap-6 md:mt-20 lg:grid-cols-12 lg:items-end">
            <h1
              id="nosotros-title"
              className="font-serif text-[clamp(3.25rem,1.6rem+7vw,8rem)] leading-[0.9] font-light tracking-[-0.04em] [font-variation-settings:'SOFT'_100,'opsz'_144] lg:col-span-8"
            >
              {["Seis marcas.", "Una misma visión."].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <span
                    className="block animate-cover-line"
                    style={{ animationDelay: `${i * 140}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="max-w-[40ch] animate-cover-fade text-body text-ink-soft [animation-delay:400ms] lg:col-span-4 lg:pb-4">
              {ABOUT.lead}
            </p>
          </div>
          <figure className="mt-12 md:mt-20">
            <div className="relative aspect-[4/3] animate-cover-unveil overflow-hidden rounded-[1.75rem] bg-sand [animation-delay:250ms] md:aspect-[16/9] md:rounded-[2.25rem] lg:aspect-[2/1]">
              <SmartImage
                slot={HOME_HERO.media}
                preload
                sizes="(min-width: 1440px) 1360px, 100vw"
                className="absolute inset-0"
                imageClassName="animate-cover-settle [animation-delay:250ms]"
              />
            </div>
            <figcaption className="mt-3 text-small text-ink-muted">{HOME_HERO.caption}</figcaption>
          </figure>
        </Container>
      </section>

      {/* Fundador */}
      <section aria-labelledby="fundador-title" className="bg-ivory py-20 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SmartImage
                  slot={f.media}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[4/5] rounded-[1.75rem] bg-sand md:rounded-[2.25rem]"
                />
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 text-small font-semibold text-accent-text">
              <span aria-hidden className="size-2 rounded-full bg-accent" />
              {f.role}
            </p>
            <RevealTitle
              id="fundador-title"
              className={`${display} mt-5 text-[clamp(3rem,1.6rem+5vw,6rem)] leading-[0.95]`}
            >
              {f.name}
            </RevealTitle>
            <blockquote
              className={`${display} mt-10 border-l-2 border-accent pl-6 text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] leading-[1.2] text-ink md:pl-8`}
            >
              “{f.quote}”
            </blockquote>
            <div className="mt-10 max-w-[60ch] space-y-5">
              {f.paragraphs.map((p) => (
                <Reveal key={p.slice(0, 24)}>
                  <p className="text-body text-ink-soft">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Línea de tiempo */}
      <section aria-labelledby="historia-title" className="bg-surface-tint py-20 md:py-32">
        <Container>
          <RevealTitle
            id="historia-title"
            className={`${display} max-w-[16ch] text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)] leading-[1]`}
          >
            Cómo ha crecido el grupo
          </RevealTitle>
          <ol className="mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-6">
            {ABOUT.milestones.map((m, i) => (
              <li key={m.year} className="relative border-t border-ink/20 pt-8">
                <span
                  aria-hidden
                  className="absolute -top-[7px] left-0 size-3.5 rounded-full bg-accent ring-4 ring-surface-tint"
                />
                <Reveal delay={i * 100}>
                  <p
                    className={`${display} text-[clamp(3rem,2rem+3vw,5rem)] leading-none text-copper-deep`}
                  >
                    {m.year}
                  </p>
                  <p className="mt-4 max-w-[28ch] text-body text-ink-soft">{m.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <BrandSpecs />
      <Closing />
    </>
  );
}
