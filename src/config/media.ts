// Manifiesto de imágenes: slot con nombre → archivo en /public/media o placeholder.
//
// Para reemplazar una fotografía: copia el archivo a /public/media/<marca>/ y
// añade `src` (y `credit` si aplica) al slot correspondiente. Sin `src`, el slot
// muestra un MediaPlaceholder con el tono indicado. Registra los créditos en
// docs/CREDITS.md.

export type PlaceholderTone = "sand" | "accent" | "soft" | "ink";

export interface MediaEntry {
  /** Ruta pública, ej. "/media/la-trufa/hero.jpg". */
  src?: string;
  /** object-position del recorte, ej. "50% 30%". */
  position?: string;
  /** Tono del placeholder mientras no haya imagen. */
  tone?: PlaceholderTone;
  /** Texto de la etiqueta discreta del placeholder. */
  label?: string;
  credit?: string;
}

export const MEDIA: Record<string, MediaEntry> = {
  // Manta Group
  "mg.hero": { tone: "ink", label: "Fotografía principal · pendiente" },
  "mg.experiencias": { tone: "sand", label: "Experiencia gastronómica · pendiente" },
  "mg.restaurantes": { tone: "sand", label: "Restaurante · pendiente" },
  "mg.artesanal": { tone: "sand", label: "Producto artesanal · pendiente" },
  "mg.formacion": { tone: "sand", label: "Formación · pendiente" },

  // Tarjetas del Universo MG (usan el acento de cada marca)
  "cesar-fuentes.card": { tone: "accent" },
  "la-trufa.card": { tone: "accent" },
  "hoja-santa.card": { tone: "accent" },
  "black-pimienta.card": { tone: "accent" },
  "camelia.card": { tone: "accent" },
  "agatha.card": { tone: "accent" },
};

export function getMedia(id: string): MediaEntry {
  return MEDIA[id] ?? {};
}
