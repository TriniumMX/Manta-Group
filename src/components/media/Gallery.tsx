"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { getMedia } from "@/config/media";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";
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

/**
 * Galería con visor a pantalla completa. Cada foto abre el visor (<dialog>
 * nativo): flechas del teclado o botones para avanzar, Esc o el botón para
 * cerrar, y el foco vuelve a la miniatura que lo abrió.
 */
export function Gallery({ items, label }: { items: MediaSlot[]; label: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const cells = LAYOUTS[items.length] ?? LAYOUTS[3];
  const open = index !== null;

  useLockBody(open);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) {
      d.close();
      opener.current?.focus();
    }
  }, [open]);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-12 md:gap-6" aria-label={label}>
        {items.map((slot, i) => (
          <li key={slot.id} className={cells[i]}>
            <button
              type="button"
              aria-label={`Ampliar foto: ${slot.alt}`}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] bg-sand md:rounded-[2rem]"
            >
              <SmartImage
                slot={slot}
                sizes="(min-width: 768px) 42vw, 100vw"
                className="absolute inset-0"
                imageClassName="transition-transform duration-[1.2s] ease-(--ease-editorial) group-hover:scale-[1.04]"
              />
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

      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-label={label}
        onCancel={(e) => {
          e.preventDefault();
          setIndex(null);
        }}
        onKeyDown={onKey}
        className="tone-ink m-0 h-dvh max-h-none w-full max-w-none bg-ink/96 p-0 text-cream backdrop:bg-ink/80"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-4 md:px-8">
              <p className="text-small text-sand" aria-live="polite">
                {index! + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Cerrar visor"
                className="inline-flex size-12 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 md:px-24">
              <div
                key={current.id}
                className="relative h-full max-h-[78dvh] w-full max-w-5xl animate-dialog-in"
              >
                {getMedia(current.id).src && (
                  <SmartImage
                    slot={current}
                    sizes="90vw"
                    className="absolute inset-0"
                    imageClassName="object-contain"
                  />
                )}
              </div>
              <figcaption className="mt-4 max-w-[60ch] text-center text-small text-sand">
                {current.alt}
              </figcaption>
            </figure>
            <div className="flex justify-center gap-3 px-4 pt-2 pb-6 md:pb-8">
              {(
                [
                  { dir: -1, label: "Foto anterior", Icon: ArrowLeft },
                  { dir: 1, label: "Foto siguiente", Icon: ArrowRight },
                ] as const
              ).map(({ dir, label: l, Icon }) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => go(dir)}
                  aria-label={l}
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-full bg-cream text-ink transition-colors hover:bg-sand",
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
