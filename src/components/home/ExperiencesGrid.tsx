import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRANDS, brandHref } from "@/config/brands";
import { HOME_EXPERIENCES } from "@/content/home";
import { Section } from "@/components/layout/Container";
import { SmartImage } from "@/components/media/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Heading } from "@/components/ui/Typography";

/** Lista editorial numerada: cuatro universos con sus marcas relacionadas. */
export function ExperiencesGrid() {
  const e = HOME_EXPERIENCES;
  return (
    <Section tone="cream" labelledBy="experiencias-title">
      <Reveal>
        <Eyebrow tone="accent">{e.eyebrow}</Eyebrow>
        <Heading id="experiencias-title" level="h2" className="mt-4 max-w-3xl">
          {e.title}
        </Heading>
      </Reveal>

      <ol className="mt-12 border-b border-ink/12 md:mt-16">
        {e.items.map((item, i) => {
          const related = BRANDS.filter((b) => b.experienceCategories.includes(item.id));
          return (
            <li key={item.id} className="border-t border-ink/12">
              <Reveal className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14 lg:py-16">
                <span
                  aria-hidden
                  className="font-serif text-[2.5rem] leading-none font-light text-copper md:col-span-1 md:text-[3rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="md:col-span-6 lg:col-span-5">
                  <h3 className="text-h2">{item.title}</h3>
                  <p className="mt-4 max-w-[48ch] text-body text-ink-soft">{item.description}</p>

                  <p className="mt-6 text-eyebrow text-ink-muted">
                    {related.length === 1 ? "Marca" : "Marcas"}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {related.map((brand) => (
                      <li key={brand.slug} data-brand={brand.slug}>
                        <Link
                          href={brandHref(brand.slug)}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 bg-ivory px-4 text-small font-semibold text-ink transition-colors hover:border-accent-text hover:bg-accent-soft"
                        >
                          <span aria-hidden className="size-2 rounded-full bg-accent" />
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/marcas?categoria=${item.id}`}
                    className="group mt-6 inline-flex min-h-11 items-center gap-2 text-small font-semibold text-accent-text"
                  >
                    <span className="link-underline group-hover:bg-size-[100%_1px]">
                      Ver en Nuestras marcas
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <SmartImage
                  slot={item.media}
                  useAspect
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 40vw, 100vw"
                  labelPosition="bottom"
                  className="rounded-[4px] md:col-span-5 md:self-start lg:col-span-5 lg:col-start-8"
                />
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
