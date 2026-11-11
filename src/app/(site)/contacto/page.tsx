import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Container";
import { BrandLinkList } from "@/components/brand/BrandLinkList";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Contacto" };

// Bloque 2: contenido mínimo. El directorio con WhatsApp por marca llega en el bloque 9.
export default function ContactoPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
        eyebrow="Contacto"
        title="Hablemos"
        lead="Cada marca tendrá su propio canal de WhatsApp. Elige la marca con la que quieres conversar."
      >
        <Badge tone="demo">Datos de contacto pendientes de configuración</Badge>
      </PageHeader>
      <Section tone="cream">
        <BrandLinkList />
      </Section>
    </>
  );
}
