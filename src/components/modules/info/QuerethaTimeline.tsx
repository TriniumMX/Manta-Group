import { Section } from "@/components/layout/Container";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { QUERETHA, QUERETHA_BEERS } from "@/content/brands/camelia";

/** Línea de tiempo de Queretha (cerveza de Camelia): una cerveza por época. */
export function QuerethaTimeline() {
  return (
    <Section tone="cream" id="queretha" labelledBy="queretha-titulo">
      <div className="max-w-3xl">
        <Eyebrow tone="accent">{QUERETHA.eyebrow}</Eyebrow>
        <Heading id="queretha-titulo" level="h2" className="mt-4">
          {QUERETHA.name}: {QUERETHA.title.toLowerCase()}
        </Heading>
        <p className="mt-6 max-w-[60ch] text-body text-ink-soft">{QUERETHA.lead}</p>
      </div>

      <ol className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-3">
        {QUERETHA_BEERS.map((beer, i) => (
          <li key={beer.year}>
            <Reveal delay={i * 80} className="h-full">
              <article
                style={{ backgroundColor: beer.color }}
                className="flex h-full flex-col rounded-[4px] p-6 text-cream md:p-8"
              >
                <p className="font-serif text-6xl leading-none md:text-7xl">{beer.year}</p>
                <Heading level="h3" className="mt-6">
                  {beer.name}
                </Heading>
                <p className="mt-1 text-eyebrow uppercase text-cream/85">{beer.style}</p>
                <p className="mt-4 text-body text-cream/95">{beer.notes}</p>
                <p className="mt-4 text-body text-cream/85">{beer.story}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <WhatsAppButton brand="camelia" intent="product" item="cerveza Queretha">
          Consultar por Queretha
        </WhatsAppButton>
      </div>
    </Section>
  );
}
