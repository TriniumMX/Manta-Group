"use client";

import { parseFigure } from "@/lib/figure";
import { AnimatedCounter } from "@/components/vendor/uiarc/animated-counter";

const nbsp = (s: string) => s.replace(/ /g, " ");

/**
 * Cifra que rueda como odómetro al entrar en pantalla (AnimatedCounter de Arc
 * UI). Si el texto no contiene una cifra se muestra tal cual. Los años (cuatro
 * dígitos) van sin separador de miles: 2019, no 2,019.
 */
export function AnimatedFigure({ text }: { text: string }) {
  const f = parseFigure(text);
  if (!f) return <>{text}</>;
  return (
    <AnimatedCounter
      value={f.value}
      prefix={nbsp(f.prefix)}
      suffix={nbsp(f.suffix)}
      grouping={f.digits !== 4}
      animateOnView
    />
  );
}
