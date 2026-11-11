import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Heading } from "@/components/ui/Typography";

// 404 administrativo: se renderiza dentro del layout del admin, nunca el público.
export default function AdminNotFound() {
  return (
    <section className="px-4 py-16 md:px-10">
      <Eyebrow>Administrador · 404</Eyebrow>
      <Heading level="h2" as="h1" className="mt-4">
        Módulo no encontrado
      </Heading>
      <p className="mt-4 max-w-[55ch] text-ink-soft">
        Este módulo no existe en la vista demostrativa del administrador.
      </p>
      <div className="mt-8">
        <Button href="/demo/admin" variant="secondary" iconLeft={ArrowLeft}>
          Volver al dashboard
        </Button>
      </div>
    </section>
  );
}
