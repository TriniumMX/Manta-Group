"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
}

const ToastContext = createContext<((t: Omit<ToastMessage, "id">) => void) | null>(null);

/** Proveedor de avisos breves (p. ej. "Cambio simulado · no persistente"). */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (t: Omit<ToastMessage, "id">) => {
      const id = ++nextId.current;
      setToasts((list) => [...list.slice(-2), { ...t, id }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 md:inset-x-auto md:right-6 md:bottom-6 md:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-start gap-3 rounded-[8px] bg-ink px-4 py-3 text-cream shadow-lg"
          >
            <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-sand" />
            <div className="min-w-0 flex-1">
              <p className="text-small font-semibold">{t.title}</p>
              {t.description && <p className="text-small text-sand">{t.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="-m-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-sand hover:text-cream [--focus-ring:var(--color-cream)]"
            >
              <X aria-hidden className="size-4" />
              <span className="sr-only">Cerrar aviso</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>.");
  return ctx;
}
