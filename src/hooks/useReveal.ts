"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Revela el elemento al entrar en viewport, una sola vez (§6.7).
 * - Lo que ya está visible al montar no se oculta (sin parpadeo).
 * - Sin JS el contenido queda visible: el estado oculto se aplica en cliente.
 * - `prefers-reduced-motion` se respeta en CSS (sin desplazamiento).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.dataset.reveal = "hidden";
    if (delayMs) el.style.transitionDelay = `${delayMs}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "visible";
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return ref;
}
