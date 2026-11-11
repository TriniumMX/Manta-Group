import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Container";
import { BrandLinkList } from "@/components/brand/BrandLinkList";

export const metadata: Metadata = { title: "Nuestras marcas" };

// Bloque 2: contenido mínimo. La vista editorial con filtro por universo llega después.
export default function MarcasPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Nuestras marcas" }]}
        eyebrow="Manta Group"
        title="Nuestras marcas"
        lead="Seis negocios con identidad propia: gastronomía, restaurante, formación y producto artesanal."
      />
      <Section tone="cream" className="pt-0 md:pt-0 lg:pt-0" containerClassName="pt-16 md:pt-24">
        <BrandLinkList />
      </Section>
    </>
  );
}
