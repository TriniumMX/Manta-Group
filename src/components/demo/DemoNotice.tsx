import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Aviso discreto de contenido provisional (uno por sitio, en el footer). */
export function DemoNotice({ className }: { className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-small", className)}>
      <Info aria-hidden className="size-4 shrink-0" />
      Demo · contenido, imágenes y datos provisionales
    </p>
  );
}
