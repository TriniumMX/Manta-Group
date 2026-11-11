import type { Metadata } from "next";
import { BrandSpecs } from "@/components/home/BrandSpecs";
import { Closing } from "@/components/home/Closing";
import { Manifesto } from "@/components/home/Manifesto";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { HOME_HERO } from "@/content/home";

export const metadata: Metadata = { title: "Nosotros" };

// Texto de concepto provisional: sin historia, cifras ni valores del grupo no confirmados.
export default function NosotrosPage() {
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
              Manta Group reúne negocios gastronómicos y artesanales de Querétaro que comparten una
              forma de hacer las cosas: con cuidado, con oficio y pensando en quien los vive.
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
      <Manifesto />
      <BrandSpecs />
      <Closing />
    </>
  );
}
