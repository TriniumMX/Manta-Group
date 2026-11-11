"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "full-mobile" | "full";

const sizes: Record<Size, string> = {
  sm: "w-[calc(100%-2rem)] max-w-md rounded-[12px]",
  md: "w-[calc(100%-2rem)] max-w-2xl rounded-[12px]",
  lg: "w-[calc(100%-2rem)] max-w-4xl rounded-[12px]",
  // Pantalla completa en móvil, centrado desde md.
  "full-mobile":
    "h-dvh max-h-dvh w-full max-w-none rounded-none md:h-auto md:max-h-[calc(100dvh-4rem)] md:w-[calc(100%-4rem)] md:max-w-3xl md:rounded-[12px]",
  full: "h-dvh max-h-dvh w-full max-w-none rounded-none",
};

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Título accesible (aria-labelledby). Se puede ocultar visualmente con `hideTitle`. */
  title: React.ReactNode;
  hideTitle?: boolean;
  description?: React.ReactNode;
  size?: Size;
  className?: string;
  /** Pie fijo (CTA) que no hace scroll con el contenido. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Diálogo sobre <dialog> nativo: foco atrapado por el navegador, Esc y clic en
 * el fondo cierran, bloqueo de scroll y retorno del foco al elemento que lo abrió.
 */
export function Dialog({
  open,
  onClose,
  title,
  hideTitle = false,
  description,
  size = "md",
  className,
  footer,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  useLockBody(open);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Si se desmonta abierto, devuelve el foco igualmente.
  useEffect(() => {
    return () => {
      returnFocus.current?.focus?.();
    };
  }, []);

  function handleClose() {
    const target = returnFocus.current;
    returnFocus.current = null;
    if (open) onClose();
    // Tras cerrar, el foco vuelve al disparador (también en diálogos anidados).
    requestAnimationFrame(() => target?.focus?.());
  }

  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={handleClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] overflow-hidden bg-cream p-0 text-ink shadow-2xl backdrop:backdrop-blur-[2px] open:flex open:animate-dialog-in open:flex-col",
        sizes[size],
        className,
      )}
    >
      <header
        className={cn(
          "flex items-start justify-between gap-4 px-5 pt-5 md:px-8 md:pt-7",
          hideTitle && "absolute top-0 right-0 z-10 px-3 pt-3 md:px-4 md:pt-4",
        )}
      >
        <div className={cn(hideTitle && "sr-only")}>
          <h2 id={titleId} className="text-h3">
            {title}
          </h2>
          {description && (
            <p id={descId} className="mt-2 text-small text-ink-muted">
              {description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mt-1 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-cream/90 text-ink transition-colors hover:bg-sand"
        >
          <X aria-hidden className="size-5" />
          <span className="sr-only">Cerrar</span>
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-6 md:px-8 md:pb-8">
        {children}
      </div>
      {footer && <div className="border-t border-ink/10 bg-cream px-5 py-4 md:px-8">{footer}</div>}
    </dialog>
  );
}
