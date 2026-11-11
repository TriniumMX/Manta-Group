"use client";

import { Info } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

/** Diálogo demostrativo: muestra el mensaje que se enviaría por WhatsApp. */
export function WhatsAppDemoDialog({
  open,
  onClose,
  brandName,
  message,
}: {
  open: boolean;
  onClose: () => void;
  brandName: string;
  message: string;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="sm"
      title={`Conversación con ${brandName}`}
      description="Así se vería el mensaje prellenado."
      footer={
        <Button onClick={onClose} variant="secondary" className="w-full">
          Entendido
        </Button>
      }
    >
      <div className="rounded-[12px] bg-sand/60 p-4">
        <p className="ml-auto w-fit max-w-[90%] rounded-[12px] rounded-br-[4px] bg-cream px-4 py-3 text-[0.9375rem] text-ink shadow-sm">
          {message}
        </p>
      </div>
      <p className="mt-5 flex gap-3 text-small text-ink-soft">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-ink-muted" />
        <span>
          Número de WhatsApp pendiente de configuración. En la versión final este botón abrirá la
          conversación directamente.
        </span>
      </p>
    </Dialog>
  );
}
