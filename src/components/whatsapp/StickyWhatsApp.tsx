"use client";

import { useEffect, useState } from "react";
import type { WhatsAppIntent } from "@/config/whatsapp";
import { cn } from "@/lib/utils";
import type { WhatsAppTarget } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Barra fija inferior (solo móvil) que aparece cuando la portada sale de
 * pantalla y se oculta al llegar al llamado final, para no duplicarlo.
 * `afterId` es la portada; `beforeId`, la sección del llamado final.
 */
export function StickyWhatsApp({
  brand,
  brandName,
  intent,
  label,
  afterId,
  beforeId,
}: {
  brand: WhatsAppTarget;
  brandName: string;
  intent: WhatsAppIntent;
  label: string;
  afterId: string;
  beforeId: string;
}) {
  const [past, setPast] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(afterId);
    const end = document.getElementById(beforeId);
    if (!hero || !end) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPast(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === end) setAtEnd(e.isIntersecting || e.boundingClientRect.top < 0);
      }
    });
    io.observe(hero);
    io.observe(end);
    return () => io.disconnect();
  }, [afterId, beforeId]);

  const visible = past && !atEnd;

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-full bg-ink/90 py-2 pr-2 pl-5 text-cream shadow-[0_20px_40px_-12px_rgb(30_28_25/0.5)] backdrop-blur-xl transition-[translate,opacity] duration-500 ease-(--ease-editorial) md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[150%] opacity-0",
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <span className="truncate font-serif text-[1.125rem]">{brandName}</span>
      <WhatsAppButton brand={brand} intent={intent} variant="inverse" size="sm">
        {label}
      </WhatsAppButton>
    </div>
  );
}
