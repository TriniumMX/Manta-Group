import Link from "next/link";
import { BRANDS, brandHref } from "@/config/brands";
import { ADDRESS } from "@/config/contact";
import { ADMIN_LINK, FOOTER_GROUP_LINKS, SITE } from "@/config/site";
import { BrandMark } from "@/components/brand/BrandMark";
import { DemoNotice } from "@/components/demo/DemoNotice";
import { Container } from "./Container";

const linkClass = "link-underline inline-flex min-h-11 items-center text-sand hover:text-cream";

/** Footer corporativo (sección oscura). Combinaciones sobre ink: cream, sand, stone. */
export function SiteFooter() {
  return (
    <footer className="tone-ink bg-ink text-cream">
      <Container className="pt-16 pb-10 md:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <BrandMark variant="footer" />
            <p className="mt-5 max-w-sm font-serif text-[1.5rem] leading-snug text-sand italic">
              {SITE.concept}
            </p>
          </div>

          <nav aria-label="Marcas del grupo" className="md:col-span-3">
            <h2 className="text-eyebrow text-stone">Marcas</h2>
            <ul className="mt-4">
              {BRANDS.map((b) => (
                <li key={b.slug}>
                  <Link href={brandHref(b.slug)} className={linkClass}>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Grupo" className="md:col-span-2">
            <h2 className="text-eyebrow text-stone">Grupo</h2>
            <ul className="mt-4">
              {FOOTER_GROUP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-2">
            <h2 className="text-eyebrow text-stone">Visítanos</h2>
            <address className="mt-4 text-small text-sand not-italic">
              <a
                href={ADDRESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-cream"
              >
                {ADDRESS.street}, {ADDRESS.area}, {ADDRESS.city}
                <span className="sr-only"> (abre Google Maps en una pestaña nueva)</span>
              </a>
            </address>
            <Link href="/contacto" className={`${linkClass} mt-3`}>
              WhatsApp y redes por marca
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-6 text-small text-stone md:flex-row md:items-center md:justify-between">
          <DemoNotice />
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
            <Link
              href={ADMIN_LINK.href}
              className="link-underline inline-flex min-h-11 items-center hover:text-sand"
            >
              {ADMIN_LINK.label}
            </Link>
            <p>
              Diseño y desarrollo: <span className="text-sand">{SITE.credit.label}</span> ·{" "}
              {SITE.credit.tagline}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
