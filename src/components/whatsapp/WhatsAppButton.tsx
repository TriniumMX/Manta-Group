"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import type { WhatsAppIntent } from "@/config/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  whatsappBrandName,
  type WhatsAppTarget,
} from "@/lib/whatsapp";
import { WhatsAppDemoDialog } from "./WhatsAppDemoDialog";

/**
 * CTA de WhatsApp. Con número configurado abre wa.me en una pestaña nueva;
 * sin número (demo) abre un diálogo con el mensaje que se enviaría.
 */
export function WhatsAppButton({
  brand,
  intent = "general",
  item,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  brand: WhatsAppTarget;
  intent?: WhatsAppIntent;
  /** Nombre del producto o curso (intents product/course). */
  item?: string;
  variant?: "primary" | "secondary" | "inverse" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const url = buildWhatsAppUrl(brand, intent, item);
  const classes = buttonClasses({ variant, size, className });
  const icon = <MessageCircle aria-hidden className="size-4 shrink-0" />;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={classes}>
        {icon}
        <span>{children}</span>
        <span className="sr-only"> (se abre WhatsApp en una pestaña nueva)</span>
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={classes}
      >
        {icon}
        <span>{children}</span>
      </button>
      <WhatsAppDemoDialog
        open={open}
        onClose={() => setOpen(false)}
        brandName={whatsappBrandName(brand)}
        message={buildWhatsAppMessage(brand, intent, item)}
      />
    </>
  );
}
