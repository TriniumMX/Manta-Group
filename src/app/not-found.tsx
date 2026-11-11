import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PublicShell } from "@/components/layout/PublicShell";
import { Container } from "@/components/layout/Container";
import { BrandLinkList } from "@/components/brand/BrandLinkList";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata: Metadata = { title: "Página no encontrada" };

// 404 público. El layout raíz es mínimo, así que se usa el shell público de forma explícita.
export default function NotFound() {
  return (
    <PublicShell>
      <Container className="py-16 md:py-24">
        <Eyebrow tone="accent">Error 404</Eyebrow>
        <Heading level="h1" className="mt-4 max-w-3xl">
          Esta página no está en la mesa.
        </Heading>
        <p className="mt-6 max-w-[55ch] text-body text-ink-soft">
          La dirección no existe o cambió. Puedes volver al inicio o explorar alguna de nuestras
          marcas.
        </p>
        <div className="mt-8">
          <Button href="/" variant="secondary" iconLeft={ArrowLeft}>
            Volver al inicio
          </Button>
        </div>
        <BrandLinkList className="mt-16" />
      </Container>
    </PublicShell>
  );
}
