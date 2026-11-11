"use client";

import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(SplitText);

/**
 * Titular que sube línea por línea desde una máscara al entrar en pantalla.
 * SplitText conserva el texto accesible (aria-label) y vuelve a partir las
 * líneas si cambia el ancho o terminan de cargar las fuentes.
 */
export function RevealTitle({
  as: Tag = "h2",
  id,
  className,
  children,
}: {
  as?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create(ref.current!, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
            }),
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
