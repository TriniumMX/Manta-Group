"use client";

import { motion, useReducedMotion } from "motion/react";
import { SPRING_LAYOUT } from "@/components/vendor/beui/ease";
import { cn } from "@/lib/utils";

/**
 * Indicador de selección que se desliza entre opciones (técnica de beUI:
 * layout compartido con resorte). Se coloca dentro del elemento activo, que
 * debe ser `relative isolate`; todos los indicadores del mismo grupo comparten
 * `layoutId`. Con movimiento reducido salta sin animar.
 */
export function GlidePill({ layoutId, className }: { layoutId: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      layoutId={layoutId}
      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
      className={cn("absolute inset-0 -z-10 rounded-full", className)}
    />
  );
}
