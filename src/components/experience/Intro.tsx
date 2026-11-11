import { BRANDS } from "@/config/brands";
import { SITE } from "@/config/site";

/**
 * Cortina de bienvenida (solo la primera visita de la sesión a Inicio): el
 * nombre del grupo sube letra por letra, aparecen los seis acentos de marca y
 * la cortina se levanta. Es CSS puro (globals.css, `.intro`): un script en el
 * layout raíz marca `html[data-intro="play"]` antes de pintar; sin esa marca,
 * con movimiento reducido o sin JS, no se muestra.
 */
export function Intro() {
  return (
    <div aria-hidden className="intro tone-ink fixed inset-0 z-[70] bg-ink text-cream">
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <p className="overflow-hidden pb-[0.1em] font-serif text-[clamp(3rem,1.5rem+6vw,7.5rem)] leading-none font-light tracking-[-0.04em] [font-variation-settings:'SOFT'_100,'opsz'_144]">
          {Array.from(SITE.name).map((char, i) => (
            <span
              key={i}
              className="intro-char inline-block"
              style={{ "--i": i } as React.CSSProperties}
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </p>
        <ul className="flex gap-3">
          {BRANDS.map((brand, i) => (
            <li
              key={brand.slug}
              data-brand={brand.slug}
              className="intro-dot size-2.5 rounded-full bg-accent ring-1 ring-cream/25"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
