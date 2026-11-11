"use client";

import { useRef } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * Envoltorio que acerca su contenido mientras cruza la pantalla: arranca
 * reducido y con esquinas más redondas, y termina a tamaño completo.
 */
export function ScrollZoom({
  from = 0.86,
  className,
  children,
}: {
  from?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.fromTo(
          ref.current,
          { scale: from },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "center 55%",
              scrub: 0.6,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ transformOrigin: "50% 100%" }}>
      {children}
    </div>
  );
}
