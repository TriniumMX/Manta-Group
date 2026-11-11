import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Nosotros" };

// Bloque 2: contenido mínimo. Texto provisional; sin historia, cifras ni valores no confirmados.
export default function NosotrosPage() {
  return (
    <PageHeader
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
      eyebrow="El grupo"
      title="Seis marcas. Una misma visión."
      lead="Manta Group reúne negocios gastronómicos y artesanales que comparten una forma de hacer las cosas: con cuidado, con oficio y pensando en quien los vive."
    >
      <Button href="/contacto" icon={ArrowRight}>
        Contacto
      </Button>
      <Badge tone="demo">Texto provisional</Badge>
    </PageHeader>
  );
}
