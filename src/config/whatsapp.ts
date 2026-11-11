import type { BrandSlug } from "@/types/content";

/**
 * Números de WhatsApp por marca, en formato internacional sin "+" ni espacios
 * (ej. "5214420000000"). `null` = pendiente de configuración: el botón abre un
 * diálogo demostrativo en lugar de una conversación real.
 */
export const WHATSAPP_NUMBERS: Record<BrandSlug | "mg", string | null> = {
  mg: null,
  "cesar-fuentes": null,
  "la-trufa": null,
  "hoja-santa": null,
  "black-pimienta": null,
  camelia: null,
  agatha: null,
};

export type WhatsAppIntent =
  "general" | "services" | "product" | "menu" | "course" | "quote" | "special";

/** Plantillas de mensaje prellenado. `item` = nombre de producto o curso. */
export const WHATSAPP_TEMPLATES: Record<WhatsAppIntent, (brand: string, item?: string) => string> =
  {
    general: (brand) => `Hola, quiero información sobre ${brand}.`,
    services: (brand) => `Hola, quiero información sobre los servicios de ${brand}.`,
    product: (brand, item) => `Hola, me interesa ${item ?? "un producto"} de ${brand}.`,
    menu: (brand) => `Hola, quisiera consultar el menú de ${brand}.`,
    course: (_brand, item) => `Hola, deseo información sobre el curso ${item ?? ""}.`.trim(),
    quote: (brand) => `Hola, quiero cotizar una experiencia con ${brand}.`,
    special: (brand) => `Hola, quiero hacer un pedido especial con ${brand}.`,
  };
