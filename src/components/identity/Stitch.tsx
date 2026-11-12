import { cn } from "@/lib/utils";

/**
 * Punto estrella (de bordado): marcador propio de Manta Group, en lugar del punto genérico.
 * Toma el acento de la marca vía `text-accent`.
 */
export function Stitch({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={cn("size-3 shrink-0 text-accent", className)}
    >
      <path d="M6 1V11M1 6H11M2.5 2.5l7 7M9.5 2.5l-7 7" />
    </svg>
  );
}
