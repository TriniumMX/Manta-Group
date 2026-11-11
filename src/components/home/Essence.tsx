import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_ESSENCE } from "@/content/home";
import { Section } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Sección oscura de contrapunto. Sobre ink: cream (titular), sand (texto), stone (eyebrow). */
export function Essence() {
  const e = HOME_ESSENCE;
  return (
    <Section tone="ink" labelledBy="esencia-title">
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <span aria-hidden className="block h-px w-16 bg-copper" />
          <p className="mt-6 text-eyebrow text-stone">{e.eyebrow}</p>
          <h2 id="esencia-title" className="mt-4 text-h1 text-cream">
            {e.title}
          </h2>
        </div>
        <div className="space-y-5 lg:col-span-5 lg:col-start-8 lg:pt-14">
          {e.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-[56ch] text-body text-sand">
              {p}
            </p>
          ))}
          <Link
            href={e.link.href}
            className="group inline-flex min-h-11 items-center gap-2 pt-2 text-small font-semibold text-cream"
          >
            <span className="link-underline group-hover:bg-size-[100%_1px]">{e.link.label}</span>
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
