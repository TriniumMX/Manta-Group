import { cn } from "@/lib/utils";

/** Franja de greca escalonada (decorativa). El color es el del texto: `text-ink/25`. */
export function Greca({ className }: { className?: string }) {
  return <div aria-hidden className={cn("greca w-full", className)} />;
}
