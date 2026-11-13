"use client";

import { useEffect, useRef } from "react";

export interface SequenceCaption {
  /** Rango de progreso (0–1) en el que el texto está visible. */
  from: number;
  to: number;
  node: React.ReactNode;
  className?: string;
}

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, progress: number) => void;

/**
 * Escena a pantalla completa cuyo avance depende del scroll (estilo "producto que se abre").
 * - `frames`: URLs de una secuencia de imágenes (WebP extraídas de un video). Es la versión final.
 * - `draw`: dibujo procedural en canvas. Sirve de marcador de posición mientras no hay frames.
 * El texto real vive en HTML (`captions`) y el canvas es decorativo (aria-hidden).
 */
export function ScrollSequence({
  frames,
  draw,
  captions,
  scrollLength = 4,
  label,
}: {
  frames?: string[];
  draw?: DrawFn;
  captions: SequenceCaption[];
  /** Alto del recorrido en pantallas (4 = 400vh). */
  scrollLength?: number;
  /** Descripción para lectores de pantalla. */
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let target = reduced ? 0.5 : 0;
    let current = target;
    let raf = 0;
    const images: HTMLImageElement[] = [];

    if (frames?.length) {
      frames.forEach((src, i) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        images[i] = img;
      });
    }

    const drawFrame = (p: number) => {
      ctx.clearRect(0, 0, w, h);
      if (images.length) {
        const img = images[Math.min(images.length - 1, Math.round(p * (images.length - 1)))];
        if (img?.complete && img.naturalWidth) {
          const s = Math.max(w / img.naturalWidth, h / img.naturalHeight); // cover
          const dw = img.naturalWidth * s;
          const dh = img.naturalHeight * s;
          ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        }
      } else {
        draw?.(ctx, w, h, p);
      }
    };

    const updateCaptions = (p: number) => {
      captions.forEach((c, i) => {
        const el = capRefs.current[i];
        if (!el) return;
        const fade = 0.06;
        const a = Math.min(1, Math.max(0, Math.min((p - c.from) / fade, (c.to - p) / fade)));
        el.style.opacity = String(a);
        el.style.transform = `translateY(${(1 - a) * 16}px)`;
        el.style.visibility = a > 0 ? "visible" : "hidden";
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(current);
    };

    const readScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      target = reduced ? 0.5 : Math.min(1, Math.max(0, -rect.top / total));
    };

    const tick = () => {
      current += (target - current) * 0.12; // suavizado
      if (Math.abs(target - current) < 0.0005) current = target;
      drawFrame(current);
      updateCaptions(current);
      raf = requestAnimationFrame(tick);
    };

    resize();
    readScroll();
    current = target;
    updateCaptions(current);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", resize);
    if (!reduced) raf = requestAnimationFrame(tick);
    else drawFrame(current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", resize);
    };
  }, [frames, draw, captions]);

  return (
    <div ref={wrapRef} style={{ height: `${scrollLength * 100}vh` }} className="relative">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />
        <p className="sr-only">{label}</p>
        <div className="pointer-events-none absolute inset-0 flex items-center">
          {captions.map((c, i) => (
            <div
              key={i}
              ref={(el) => {
                capRefs.current[i] = el;
              }}
              className={c.className ?? "absolute inset-x-0 px-6 text-center"}
              style={{ opacity: 0, visibility: "hidden" }}
            >
              {c.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
