"use client";

import { useCallback, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_LAYOUT } from "@/components/vendor/beui/ease";
import { useFocusTrap } from "@/components/vendor/beui/use-focus-trap";
import type { MediaSlot } from "@/types/content";
import { SmartImage } from "./SmartImage";

/** Composición escalonada según el número de fotos. */
const LAYOUTS: Record<number, string[]> = {
  2: ["md:col-span-7 aspect-[4/3]", "md:col-span-5 aspect-[4/5] md:mt-20"],
  3: [
    "md:col-span-5 aspect-[4/5]",
    "md:col-span-4 aspect-[4/5] md:mt-20",
    "md:col-span-3 aspect-[3/4] md:mt-40",
  ],
};

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 400;

/**
 * Galería con visor a pantalla completa:
 * - la miniatura crece hasta el visor y vuelve a su sitio al cerrar (layout compartido);
 * - se cambia de foto arrastrando, con las flechas del teclado o con los botones;
 * - doble clic / doble toque o el botón de lupa acercan al doble, y con zoom se recorre la foto.
 * Esc cierra y el foco vuelve a la miniatura (trampa de foco de beUI).
 */
export function Gallery({ items, label }: { items: MediaSlot[]; label: string }) {
  const uid = useId();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState<number | null>(null);
  const [openedFrom, setOpenedFrom] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [zoom, setZoom] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const cells = LAYOUTS[items.length] ?? LAYOUTS[3];
  const open = index !== null;

  const close = useCallback(() => {
    setIndex(null);
    setZoom(false);
  }, []);

  useLockBody(open);
  useFocusTrap(open, panel, { onEscape: close });

  const go = useCallback(
    (dir: 1 | -1) => {
      setZoom(false);
      setDirection(dir);
      setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));
    },
    [items.length],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (zoom) return;
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const current = index === null ? null : items[index];
  // Solo la foto con la que se abrió el visor comparte forma con su miniatura.
  const sharedId = (i: number) => `${uid}-photo-${i}`;

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-12 md:gap-6" aria-label={label}>
        {items.map((slot, i) => (
          <li key={slot.id} className={cells[i]}>
            <button
              type="button"
              aria-label={`Ampliar foto: ${slot.alt}`}
              onClick={() => {
                setDirection(0);
                setOpenedFrom(i);
                setIndex(i);
              }}
              className="group relative block h-full w-full"
            >
              <motion.div
                layoutId={reduce ? undefined : sharedId(i)}
                transition={SPRING_LAYOUT}
                className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-sand md:rounded-[2rem]"
                style={{ opacity: index === i ? 0 : 1 }}
              >
                <SmartImage
                  slot={slot}
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="absolute inset-0"
                  imageClassName="transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:scale-[1.04]"
                />
              </motion.div>
              <span
                aria-hidden
                className="absolute right-4 bottom-4 inline-flex size-11 scale-90 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 backdrop-blur-md transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
              >
                <Expand className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            ref={panel}
            key="visor"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            data-lenis-prevent
            onKeyDown={onKey}
            className="tone-ink fixed inset-0 z-[90] flex flex-col text-cream outline-none"
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              onClick={close}
              className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative flex items-center justify-between px-4 py-4 md:px-8"
            >
              <p className="text-small text-sand tabular-nums" aria-live="polite">
                {index + 1} / {items.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => !z)}
                  aria-label={zoom ? "Alejar" : "Acercar"}
                  aria-pressed={zoom}
                  className="inline-flex size-12 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
                >
                  {zoom ? (
                    <ZoomOut aria-hidden className="size-5" />
                  ) : (
                    <ZoomIn aria-hidden className="size-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Cerrar visor"
                  className="inline-flex size-12 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
            </motion.div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 md:px-24">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current.id}
                  custom={direction}
                  layoutId={!reduce && index === openedFrom ? sharedId(index) : undefined}
                  transition={SPRING_LAYOUT}
                  initial={
                    index === openedFrom || reduce
                      ? false
                      : { opacity: 0, x: direction * 120, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, x: direction * -120, filter: "blur(6px)" }
                  }
                  drag={zoom ? true : "x"}
                  dragConstraints={
                    zoom
                      ? { left: -240, right: 240, top: -180, bottom: 180 }
                      : { left: 0, right: 0 }
                  }
                  dragElastic={zoom ? 0.15 : 0.6}
                  onDragEnd={onDragEnd}
                  onDoubleClick={() => setZoom((z) => !z)}
                  className={cn(
                    "relative h-full max-h-[76dvh] w-full max-w-5xl overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]",
                    zoom ? "cursor-grab active:cursor-grabbing" : "cursor-grab touch-pan-y",
                  )}
                >
                  <motion.div
                    animate={{ scale: zoom ? 2 : 1 }}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                    className="absolute inset-0"
                  >
                    <SmartImage
                      slot={current}
                      sizes="90vw"
                      className="absolute inset-0"
                      imageClassName="object-contain pointer-events-none select-none"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col items-center gap-4 px-4 pt-4 pb-6 md:pb-8"
            >
              <p className="max-w-[60ch] text-center text-small text-sand">{current.alt}</p>
              <div className="flex gap-3">
                {(
                  [
                    { dir: -1, text: "Foto anterior", Icon: ArrowLeft },
                    { dir: 1, text: "Foto siguiente", Icon: ArrowRight },
                  ] as const
                ).map(({ dir, text, Icon }) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => go(dir)}
                    aria-label={text}
                    className="inline-flex size-12 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-sand"
                  >
                    <Icon aria-hidden className="size-5" />
                  </button>
                ))}
              </div>
              <p className="text-small text-stone">
                Desliza para cambiar · doble toque para acercar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
