"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Botones magnéticos: los elementos con `data-magnetic` se acercan un poco al
 * puntero y vuelven a su sitio al salir. Solo con ratón y movimiento permitido.
 */
export function Magnetic() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    if (!mq.matches) return;

    let magnet: HTMLElement | null = null;
    const release = () => {
      if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      magnet = null;
    };
    const move = (e: PointerEvent) => {
      const m = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) release();
      if (!m) return;
      magnet = m;
      const r = m.getBoundingClientRect();
      gsap.to(m, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.28,
        y: (e.clientY - (r.top + r.height / 2)) * 0.4,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", release);
    };
  }, []);

  return null;
}
