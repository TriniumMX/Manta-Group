import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { BRAND_CONTACT } from "@/config/contact";
import type { BrandSlug } from "@/types/content";

const cell = "flex flex-col gap-2 rounded-[1.5rem] bg-cream p-6 ring-1 ring-ink/8 md:p-7";
const label = "flex items-center gap-2 text-small font-semibold text-accent-text";

/** Dónde encontrar la marca: dirección o puntos de venta, redes y horario. */
export function BrandContactStrip({ slug }: { slug: BrandSlug }) {
  const c = BRAND_CONTACT[slug];

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-3">
      <div className={cell}>
        <p className={label}>
          <MapPin aria-hidden className="size-4" />
          {c.address ? "Visítanos" : "Encuéntranos en"}
        </p>
        {c.address ? (
          <a
            href={c.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-body text-ink"
          >
            <span className="link-underline group-hover:bg-size-[100%_1px]">
              {c.address.street}, {c.address.area}
            </span>
            <span className="block text-ink-soft">{c.address.city}</span>
            <span className="sr-only"> (abre Google Maps en una pestaña nueva)</span>
          </a>
        ) : (
          <p className="text-body text-ink">{c.locations?.join(" · ")}</p>
        )}
      </div>

      <div className={cell}>
        <p className={label}>Redes sociales</p>
        <ul className="flex flex-col gap-1">
          {c.social.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 text-body text-ink"
              >
                <span className="link-underline group-hover:bg-size-[100%_1px]">{s.network}</span>
                <span className="text-small text-ink-muted">/{s.handle}</span>
                <ArrowUpRight aria-hidden className="size-4 text-accent-text" />
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={cell}>
        <p className={label}>
          <Clock aria-hidden className="size-4" />
          Horario
        </p>
        <p className="text-body text-ink-soft">Pendiente de configuración</p>
      </div>
    </div>
  );
}
