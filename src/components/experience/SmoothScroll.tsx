"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll con inercia (Lenis) sincronizado con GSAP ScrollTrigger. Solo en
 * escritorio con movimiento permitido; en táctil y con movimiento reducido se
 * conserva el scroll nativo. Los enlaces a anclas (#id) se deslizan con el
 * mismo motor y respetan la altura del header.
 */
export function SmoothScroll() {
  useEffect(() => {
    const ok = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    if (!ok.matches) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: { offset: -88 } });
    lenis.on("scroll", ScrollTrigger.update);
    window.__lenis = lenis;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
