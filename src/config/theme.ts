// Espejo en TS de los tokens de src/styles/globals.css (PLAN_MG §6.2–6.3).
// Útil para el admin, placeholders y utilidades. Si cambias un color aquí,
// cámbialo también en globals.css.
import type { BrandSlug, BrandTheme } from "@/types/content";

export const PALETTE = {
  ivory: "#F4EFE6",
  cream: "#FBF8F2",
  sand: "#E8DFD0",
  ink: "#1E1C19",
  inkSoft: "#4A463F",
  inkMuted: "#655E53",
  stone: "#8B8478",
  olive: "#5F6B45",
  oliveDeep: "#3F4A2E",
  copper: "#B5703E",
  copperDeep: "#8F5126",
  terracotta: "#A4503A",
} as const;

/** Acento corporativo de MG (fuera de páginas de marca). */
export const MG_THEME: BrandTheme = { accent: PALETTE.olive, accentText: PALETTE.oliveDeep };

/** Acento provisional por marca. `accentText` tiene contraste ≥ 4.5:1 sobre marfil. */
export const BRAND_THEMES: Record<BrandSlug, BrandTheme> = {
  "cesar-fuentes": { accent: "#3F4A2E", accentText: "#3F4A2E" },
  "la-trufa": { accent: "#4A2E25", accentText: "#4A2E25" },
  "hoja-santa": { accent: "#3E5A3C", accentText: "#3E5A3C" },
  "black-pimienta": { accent: "#C4853A", accentText: "#7D5119" },
  camelia: { accent: "#B9705E", accentText: "#8A4A3A" },
  agatha: { accent: "#C79A55", accentText: "#7A5A22" },
};
