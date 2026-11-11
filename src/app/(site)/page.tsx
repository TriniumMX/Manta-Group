import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/layout/Container";
import { BrandLinkList } from "@/components/brand/BrandLinkList";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { SITE } from "@/config/site";

// Bloque 2: inicio mínimo para validar el sistema visual. La página completa llega en el bloque 3.
export default function HomePage() {
  return (
    <>
      <Container className="pt-16 pb-20 md:pt-24 md:pb-32">
        <Eyebrow tone="accent">Manta Group</Eyebrow>
        <Heading level="display" className="mt-6 max-w-5xl">
          Experiencias que inspiran.{" "}
          <em className="font-light text-accent-text">Marcas que cuentan historias.</em>
        </Heading>
        <p className="mt-8 max-w-[52ch] text-body text-ink-soft">{SITE.concept}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/marcas" icon={ArrowRight} size="lg">
            Descubre nuestras marcas
          </Button>
          <Button href="/nosotros" variant="secondary" size="lg">
            Conoce al grupo
          </Button>
        </div>
      </Container>
      <Section tone="cream" labelledBy="universo">
        <Eyebrow>Universo MG</Eyebrow>
        <Heading id="universo" level="h2" className="mt-4">
          Seis marcas, una misma mesa
        </Heading>
        <BrandLinkList className="mt-10" headingLevel="h3" />
      </Section>
    </>
  );
}
