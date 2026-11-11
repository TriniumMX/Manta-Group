import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface ServiceCardItem {
  icon: LucideIcon;
  title: string;
  text: string;
  featured?: boolean;
}

/**
 * Tarjetas de servicio no uniformes: la destacada ocupa dos columnas y va
 * sobre el acento de la marca (crema sobre accent-text ≥ 5.5:1).
 */
export function ServiceCards({ items }: { items: ServiceCardItem[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
      {items.map(({ icon: Icon, title, text, featured }, i) => (
        <li
          key={title}
          className={cn(
            featured && "md:col-span-2 lg:row-span-2",
            // La última tarjeta completa la retícula junto a la destacada.
            !featured && i === items.length - 1 && "lg:col-span-2",
          )}
        >
          <Reveal
            delay={(i % 4) * 70}
            className={cn(
              "flex h-full flex-col justify-between gap-10 rounded-[1.75rem] p-7 md:p-9",
              featured
                ? "tone-ink min-h-[22rem] bg-accent-text text-cream"
                : "min-h-[15rem] bg-cream ring-1 ring-ink/8",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "inline-flex size-14 items-center justify-center rounded-full",
                featured ? "bg-cream/12 text-cream" : "bg-accent-soft text-accent-text",
              )}
            >
              <Icon className="size-6" strokeWidth={1.5} />
            </span>
            <div>
              <h3
                className={cn(
                  "font-serif font-light tracking-[-0.03em] [font-variation-settings:'SOFT'_100]",
                  featured
                    ? "text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] leading-[0.98]"
                    : "text-[1.875rem] leading-[1.05]",
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "mt-3 max-w-[38ch]",
                  featured ? "text-body text-sand" : "text-small text-ink-soft",
                )}
              >
                {text}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
