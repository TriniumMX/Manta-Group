import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { HOME_CONTACT } from "@/content/home";
import { Section } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

/** Cierre de Inicio con dos caminos: escribir al grupo o explorar una marca. */
export function ContactInvite() {
  const c = HOME_CONTACT;
  return (
    <Section tone="ivory" labelledBy="contacto-title">
      <Reveal>
        <Eyebrow tone="accent">{c.eyebrow}</Eyebrow>
        <Heading id="contacto-title" level="h2" className="mt-4">
          {c.title}
        </Heading>
      </Reveal>

      <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-12">
        <Reveal className="flex flex-col rounded-[12px] bg-olive-deep p-7 text-cream md:p-10 lg:col-span-5 tone-ink">
          <span
            aria-hidden
            className="inline-flex size-12 items-center justify-center rounded-full bg-cream/10"
          >
            <MessageCircle className="size-5 text-sand" />
          </span>
          <h3 className="mt-8 text-h2">{c.group.title}</h3>
          <p className="mt-4 max-w-[40ch] text-body text-sand">{c.group.description}</p>
          <div className="mt-10 lg:mt-auto lg:pt-10">
            <WhatsAppButton brand="mg" intent="general" variant="inverse" size="lg">
              {c.group.cta}
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal
          delay={80}
          className="rounded-[12px] border border-ink/10 bg-cream p-7 md:p-10 lg:col-span-7"
        >
          <h3 className="text-h2">{c.brands.title}</h3>
          <p className="mt-4 max-w-[48ch] text-body text-ink-soft">{c.brands.description}</p>
          <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">
            {BRANDS.map((brand) => (
              <li key={brand.slug} data-brand={brand.slug} className="border-t border-ink/10">
                <Link
                  href={brandHref(brand.slug)}
                  className="group flex min-h-16 items-center gap-3 py-3"
                >
                  <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-accent" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[1.25rem] leading-tight">
                      {brand.name}
                    </span>
                    <span className="block truncate text-small text-ink-muted">
                      {brand.category}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 text-accent-text transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
