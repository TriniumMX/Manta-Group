import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBrandBySlug } from "@/config/brands";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Typography";
import { BrandLinkList } from "./BrandLinkList";
import type { BrandSlug } from "@/types/content";

/**
 * TEMPORAL (bloque 2): página mínima de marca con tema, breadcrumb y navegación.
 * Se reemplaza por BrandPage + composición propia en los bloques 4 y 5.
 */
export function BrandPlaceholderPage({ slug }: { slug: BrandSlug }) {
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  return (
    <div data-brand={brand.slug}>
      <div className="bg-surface-tint">
        <PageHeader
          breadcrumb={[
            { label: "Inicio", href: "/" },
            { label: "Nuestras marcas", href: "/marcas" },
            { label: brand.name },
          ]}
          eyebrow={brand.eyebrow ? `${brand.eyebrow} · ${brand.category}` : brand.category}
          title={brand.name}
          lead={`${brand.tagline} ${brand.description}`}
        >
          <Button href="/marcas" variant="secondary" iconLeft={ArrowLeft}>
            Todas las marcas
          </Button>
          <Badge tone="demo">Página en construcción · demo</Badge>
        </PageHeader>
      </div>
      <Section tone="ivory" labelledBy="otras-marcas">
        <Heading id="otras-marcas" level="h2">
          Otras marcas del grupo
        </Heading>
        <BrandLinkList exclude={brand.slug} className="mt-10" headingLevel="h3" />
      </Section>
    </div>
  );
}
