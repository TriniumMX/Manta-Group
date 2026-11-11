// Datos de contacto reales, tomados de MantaGroup2026.pdf.
// Pendientes (no se inventan): correos, horarios y redes de Manta Group como grupo.
// Los números de WhatsApp están en config/whatsapp.ts (en `null` mientras sea demo).
import type { BrandSlug } from "@/types/content";

export const ADDRESS = {
  street: "Av. Benito Juárez Pte. #47",
  area: "Centro Histórico",
  city: "San Juan del Río, Qro.",
  /** Búsqueda en Google Maps (no requiere API). */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Benito+Ju%C3%A1rez+Pte.+47,+Centro+Hist%C3%B3rico,+San+Juan+del+R%C3%ADo,+Qro.",
} as const;

export interface SocialLink {
  network: "Facebook" | "Instagram";
  handle: string;
  url: string;
}

const fb = (handle: string): SocialLink => ({
  network: "Facebook",
  handle,
  url: `https://www.facebook.com/${handle}`,
});
const ig = (handle: string): SocialLink => ({
  network: "Instagram",
  handle,
  url: `https://www.instagram.com/${handle}`,
});

export interface BrandContact {
  /** Dirección física; `null` si la marca no tiene punto propio. */
  address: typeof ADDRESS | null;
  /** Para marcas con varios puntos de venta. */
  locations?: string[];
  social: SocialLink[];
}

export const BRAND_CONTACT: Record<BrandSlug, BrandContact> = {
  "cesar-fuentes": {
    address: ADDRESS,
    social: [fb("Cesarfuenteschefathome"), ig("chefcesarfuentes")],
  },
  "la-trufa": {
    address: null,
    locations: ["San Juan del Río", "Bernal", "Querétaro"],
    social: [fb("Chocolateslatrufaoficial"), ig("chocolateslatrufasjr")],
  },
  "hoja-santa": {
    address: ADDRESS,
    social: [fb("Restaurantehojasanta"), ig("hojasantaexperiencias")],
  },
  "black-pimienta": {
    address: ADDRESS,
    social: [fb("Blackpimientaoficial"), ig("blackpimientagl")],
  },
  camelia: { address: ADDRESS, social: [fb("CameliaSJR")] },
  agatha: { address: ADDRESS, social: [fb("AgathaSJR"), ig("agathasjr")] },
};
