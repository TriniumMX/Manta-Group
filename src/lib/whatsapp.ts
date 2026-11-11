import { getBrandBySlug } from "@/config/brands";
import { SITE } from "@/config/site";
import { WHATSAPP_NUMBERS, WHATSAPP_TEMPLATES, type WhatsAppIntent } from "@/config/whatsapp";
import type { BrandSlug } from "@/types/content";

export type WhatsAppTarget = BrandSlug | "mg";

export function whatsappBrandName(target: WhatsAppTarget) {
  return target === "mg" ? SITE.name : (getBrandBySlug(target)?.name ?? SITE.name);
}

/** Mensaje contextual que se enviaría por WhatsApp. */
export function buildWhatsAppMessage(
  target: WhatsAppTarget,
  intent: WhatsAppIntent,
  item?: string,
) {
  return WHATSAPP_TEMPLATES[intent](whatsappBrandName(target), item);
}

/** URL wa.me con el texto codificado, o `null` si el número no está configurado. */
export function buildWhatsAppUrl(target: WhatsAppTarget, intent: WhatsAppIntent, item?: string) {
  const number = WHATSAPP_NUMBERS[target];
  if (!number) return null;
  const text = encodeURIComponent(buildWhatsAppMessage(target, intent, item));
  return `https://wa.me/${number}?text=${text}`;
}
