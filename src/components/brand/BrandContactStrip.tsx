import { Clock, MapPin } from "lucide-react";
import { BRAND_CONTACT } from "@/config/contact";
import type { WhatsAppIntent } from "@/config/whatsapp";
import { SocialIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/layout/Container";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import type { BrandSlug } from "@/types/content";

const label = "flex items-center gap-2 text-small font-semibold text-accent-text";

/**
 * Barra de contacto inmediatamente después de la portada: dónde está la marca,
 * horario, redes y WhatsApp, sin tener que bajar hasta el final.
 */
export function BrandContactStrip({
  slug,
  intent,
  ctaLabel,
}: {
  slug: BrandSlug;
  intent: WhatsAppIntent;
  ctaLabel: string;
}) {
  const c = BRAND_CONTACT[slug];

  return (
    <section id="contacto-rapido" aria-label="Contacto" className="bg-ivory pt-6 md:pt-8">
      <Container>
        <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-ink/8 ring-1 ring-ink/8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] md:rounded-[1.75rem]">
          <div className="flex flex-col gap-1.5 bg-cream p-5 md:p-6">
            <p className={label}>
              <MapPin aria-hidden className="size-4" />
              {c.address ? "Ubicación" : "Puntos de venta"}
            </p>
            {c.address ? (
              <a
                href={c.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-small text-ink"
              >
                <span className="link-underline font-semibold group-hover:bg-size-[100%_1px]">
                  {c.address.street}, {c.address.area}
                </span>
                <span className="block text-ink-soft">{c.address.city}</span>
                <span className="sr-only"> (abre Google Maps en una pestaña nueva)</span>
              </a>
            ) : (
              <p className="text-small font-semibold text-ink">{c.locations?.join(" · ")}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 bg-cream p-5 md:p-6">
            <p className={label}>
              <Clock aria-hidden className="size-4" />
              Horario
            </p>
            <p className="text-small text-ink-soft">Pendiente de configuración</p>
          </div>

          <div className="flex flex-col gap-1.5 bg-cream p-5 md:p-6">
            <p className={label}>Redes sociales</p>
            <ul className="flex flex-wrap gap-x-4">
              {c.social.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 text-small font-semibold text-ink"
                  >
                    <SocialIcon
                      network={s.network}
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="link-underline group-hover:bg-size-[100%_1px]">
                      {s.network}
                    </span>
                    <span className="sr-only"> (se abre en una pestaña nueva)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center bg-cream p-5 sm:col-span-2 lg:col-span-1 md:p-6">
            <WhatsAppButton brand={slug} intent={intent} size="md" className="w-full lg:w-auto">
              {ctaLabel}
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
