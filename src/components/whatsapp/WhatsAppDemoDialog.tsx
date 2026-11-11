"use client";

import { CheckCheck, Info } from "lucide-react";
import { WhatsApp } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

/** Diálogo demostrativo: muestra, como en WhatsApp, el mensaje que se enviaría. */
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
      <div className="overflow-hidden rounded-[1.25rem] ring-1 ring-ink/10">
        {/* Encabezado tipo chat */}
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-white">
            <WhatsApp className="size-6" />
          </span>
          <span>
            <span className="block font-semibold leading-tight">{brandName}</span>
            <span className="block text-small text-white/90">WhatsApp Business</span>
          </span>
        </div>
        {/* Conversación */}
        <div className="bg-[#efeae2] px-4 py-6">
          <div className="ml-auto w-fit max-w-[88%] rounded-[0.75rem] rounded-tr-[0.25rem] bg-[#d9fdd3] px-3.5 pt-2.5 pb-1.5 text-[0.9375rem] text-[#111b21] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)]">
            <p>{message}</p>
            <p className="mt-1 flex items-center justify-end gap-1 text-[0.875rem] text-[#3b4a54]">
              ahora
              <CheckCheck aria-hidden className="size-4 text-[#1d8ad8]" />
            </p>
          </div>
        </div>
      </div>
      <p className="mt-5 flex gap-3 text-small text-ink-soft">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-ink-muted" />
        <span>
          Vista demostrativa: en la versión final este botón abrirá la conversación directamente en
          WhatsApp.
        </span>
      </p>
    </Dialog>
  );
}
