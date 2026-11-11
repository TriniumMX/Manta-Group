import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { SITE } from "@/config/site";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export const metadata: Metadata = { title: "Contacto" };

const display = "font-serif font-light tracking-[-0.035em] [font-variation-settings:'SOFT'_100]";

/** Datos aún no proporcionados por Manta Group: no se inventan (PLAN_MG §1.3). */
const PENDING = ["Correo", "Dirección", "Horarios", "Redes sociales"];

export default function ContactoPage() {
  return (
    <section aria-labelledby="contacto-title" className="bg-ivory">
      <Container className="pt-4 pb-24 md:pt-6 md:pb-32">
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />
        <div className="mt-12 grid gap-6 md:mt-20 lg:grid-cols-12 lg:items-end">
          <h1
            id="contacto-title"
            className={`${display} text-[clamp(3.5rem,1.6rem+8vw,9rem)] leading-[0.9] lg:col-span-8`}
          >
            <span className="block overflow-hidden pb-[0.14em]">
              <span className="block animate-cover-line">Hablemos</span>
            </span>
          </h1>
          <p className="max-w-[40ch] animate-cover-fade text-body text-ink-soft [animation-delay:300ms] lg:col-span-4 lg:pb-4">
            Cada marca atiende por su propio WhatsApp. Elige con quién quieres conversar, o escribe
            al grupo para propuestas y colaboraciones.
          </p>
        </div>

        <ul className="mt-14 border-t border-ink/15 md:mt-20">
          <li className="border-b border-ink/15">
            <Reveal className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between md:py-9">
              <div>
                <h2 className={`${display} text-[clamp(2rem,1.4rem+2.6vw,3.75rem)] leading-[1]`}>
                  {SITE.name}
                </h2>
                <p className="mt-2 text-small font-semibold text-accent-text">
                  Propuestas, colaboraciones y consultas generales
                </p>
              </div>
              <WhatsAppButton brand="mg" intent="general" size="lg">
                Escribir al grupo
              </WhatsAppButton>
            </Reveal>
          </li>
          {BRANDS.map((brand) => (
            <li key={brand.slug} data-brand={brand.slug} className="border-b border-ink/15">
              <Reveal className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between md:py-9">
                <div>
                  <h2 className={`${display} text-[clamp(2rem,1.4rem+2.6vw,3.75rem)] leading-[1]`}>
                    {brand.name}
                  </h2>
                  <p className="mt-2 flex items-center gap-2.5 text-small font-semibold text-accent-text">
                    <span aria-hidden className="size-2 rounded-full bg-accent" />
                    {brand.category}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <WhatsAppButton brand={brand.slug} intent="general" variant="secondary" size="lg">
                    Escribir por WhatsApp
                  </WhatsAppButton>
                  <Link
                    href={brandHref(brand.slug)}
                    aria-label={`Ver ${brand.name}`}
                    className="inline-flex size-14 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-accent-text hover:bg-accent-text hover:text-cream"
                  >
                    <ArrowUpRight aria-hidden className="size-5" />
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-[1.75rem] bg-cream p-7 ring-1 ring-ink/8 md:mt-24 md:p-10">
          <h2 className={`${display} text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-[1.05]`}>
            Datos por confirmar
          </h2>
          <p className="mt-3 max-w-[56ch] text-body text-ink-soft">
            Esta es una versión de demostración. Los números de WhatsApp abren un mensaje de ejemplo
            y estos datos se publicarán cuando Manta Group los confirme.
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {PENDING.map((label) => (
              <div key={label} className="border-t border-ink/12 pt-4">
                <dt className="text-small font-semibold text-ink">{label}</dt>
                <dd className="mt-1 text-small text-ink-muted">Pendiente de configuración</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
