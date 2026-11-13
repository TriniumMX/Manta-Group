import type { Metadata } from "next";
import { PrototypeTruffle } from "./PrototypeTruffle";

// Prototipo interno: no se indexa ni se enlaza desde la navegación.
export const metadata: Metadata = {
  title: "Prototipo · Scroll",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div data-brand="la-trufa" className="bg-ink text-cream">
      <PrototypeTruffle />
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-h2">Aquí sigue el resto de la página</h2>
        <p className="mt-4 text-body text-cream/85">
          Prototipo con animación procedural como marcador de posición. Cuando haya una secuencia de
          imágenes real, solo se pasa la lista de archivos a la escena.
        </p>
      </section>
    </div>
  );
}
