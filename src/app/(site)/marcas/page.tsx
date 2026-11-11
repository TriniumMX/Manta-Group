import type { Metadata } from "next";
import { BRANDS } from "@/config/brands";
import { BrandCard } from "@/components/brand/BrandCard";
import { Closing } from "@/components/home/Closing";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Nuestras marcas" };

export default function MarcasPage() {
  return (
    <>
      <section aria-labelledby="marcas-title" className="bg-ivory">
        <Container className="pt-4 pb-16 md:pt-6 md:pb-24">
          <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Nuestras marcas" }]} />
          <div className="mt-12 grid gap-6 md:mt-20 lg:grid-cols-12 lg:items-end">
            <h1
              id="marcas-title"
              className="font-serif text-[clamp(3.25rem,1.6rem+7vw,8rem)] leading-[0.9] font-light tracking-[-0.04em] [font-variation-settings:'SOFT'_100,'opsz'_144] lg:col-span-8"
            >
              <span className="block overflow-hidden pb-[0.12em]">
                <span className="block animate-cover-line">Nuestras marcas</span>
              </span>
            </h1>
            <p className="max-w-[40ch] animate-cover-fade text-body text-ink-soft [animation-delay:300ms] lg:col-span-4 lg:pb-4">
              Seis negocios con identidad propia: gastronomía, restaurante, formación y producto
              artesanal.
            </p>
          </div>

          <ul className="mt-16 grid gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 lg:gap-x-12 lg:gap-y-24">
            {BRANDS.map((brand, i) => (
              <li key={brand.slug} className={cn(i % 2 === 1 && "md:mt-28")}>
                <Reveal delay={(i % 2) * 90}>
                  <BrandCard brand={brand} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Closing />
    </>
  );
}
