"use client";

import { useEffect } from "react";

// Contador compartido para soportar diálogos anidados (ficha → WhatsApp).
let locks = 0;
let previousOverflow = "";
let previousPaddingRight = "";

/** Bloquea el scroll del documento mientras `active` sea true. */
export function useLockBody(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    if (locks === 0) {
      const scrollbar = window.innerWidth - documentElement.clientWidth;
      previousOverflow = body.style.overflow;
      previousPaddingRight = body.style.paddingRight;
      body.style.overflow = "hidden";
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [active]);
}
