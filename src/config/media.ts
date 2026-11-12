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
  // Manta Group · fotografías reales de las marcas (MantaGroup2026.pdf, mejoradas)
  "mg.founder": { src: "/media/products/p03-09-415x354.webp", position: "65% 50%" },
  "mg.hero": { src: "/media/products/p06-03-477x357.webp", position: "50% 45%", tone: "ink" },

  // Pila de marcas (Inicio): foto principal + inserto por marca
  "mg.stack.cesar-fuentes": { src: "/media/products/p03-09-415x354.webp", position: "50% 60%" },
  "mg.stack.cesar-fuentes.inset": { src: "/media/products/p03-08-445x344.webp" },
  "mg.stack.la-trufa": { src: "/media/products/p04-10-589x442.webp" },
  "mg.stack.la-trufa.inset": { src: "/media/products/p04-13-411x308.webp" },
  "mg.stack.hoja-santa": { src: "/media/products/p07-05-438x503.webp", position: "50% 60%" },
  "mg.stack.hoja-santa.inset": { src: "/media/products/p07-08-529x397.webp" },
  "mg.stack.black-pimienta": { src: "/media/products/p05-09-418x558.webp", position: "50% 35%" },
  "mg.stack.black-pimienta.inset": { src: "/media/products/p05-12-555x456.webp" },
  "mg.stack.camelia": { src: "/media/products/p08-12-383x452.webp" },
  "mg.stack.camelia.inset": { src: "/media/products/p09-09-526x633.webp" },
  "mg.stack.agatha": { src: "/media/products/p10-10-662x389.webp" },
  "mg.stack.agatha.inset": { src: "/media/products/p10-11-735x993.webp" },

  // Bento de experiencias
  "mg.experiencias": { src: "/media/products/p03-10-400x347.webp", position: "45% 50%" },
  "mg.restaurantes": { src: "/media/products/p06-02-565x358.webp", position: "35% 45%" },
  "mg.artesanal": { src: "/media/products/p08-10-300x383.webp" },
  "mg.formacion": { src: "/media/products/p05-10-398x302.webp" },

  // Galería horizontal
  "mg.mesa.canape": { src: "/media/products/p03-11-397x354.webp" },
  "mg.mesa.chocolates": { src: "/media/products/p04-12-432x559.webp" },
  "mg.mesa.ensaladas": { src: "/media/products/p07-07-414x345.webp" },
  "mg.mesa.bordado": { src: "/media/products/p08-13-668x485.webp" },
  "mg.mesa.queretha": { src: "/media/products/p09-10-512x743.webp" },

  // Tarjetas del Universo MG (usan el acento de cada marca)
  "cesar-fuentes.card": { src: "/media/products/p03-08-445x344.webp", tone: "accent" },
  "la-trufa.card": { src: "/media/products/p04-10-589x442.webp", tone: "accent" },
  "hoja-santa.card": { src: "/media/products/p07-05-438x503.webp", tone: "accent" },
  "black-pimienta.card": { src: "/media/products/p05-09-418x558.webp", tone: "accent" },
  "camelia.card": { src: "/media/products/p08-13-668x485.webp", tone: "accent" },
  // Heros de marca (provisionales, fotos del PDF mejoradas)
  "cesar-fuentes.hero": { src: "/media/products/p03-09-415x354.webp" },
  "la-trufa.hero": { src: "/media/products/p04-13-411x308.webp" },
  "hoja-santa.hero": { src: "/media/products/p06-03-477x357.webp" },
  "black-pimienta.hero": { src: "/media/products/p05-12-555x456.webp" },
  "camelia.hero": { src: "/media/products/p08-12-383x452.webp" },
  "agatha.hero": { src: "/media/products/p10-10-662x389.webp" },
  "camelia.queretha": { src: "/media/products/p09-09-526x633.webp" },
  "agatha.card": { src: "/media/products/p10-11-735x993.webp", tone: "accent" },
  // Módulos de marca
  "cesar-fuentes.clients": { src: "/media/products/p03-12-548x710.webp" },
  "hoja-santa.chef": { src: "/media/products/p06-02-565x358.webp", position: "30% 50%" },
  // Galerías de las páginas de marca
  "cesar-fuentes.g1": { src: "/media/products/p03-10-400x347.webp" },
  "cesar-fuentes.g2": { src: "/media/products/p03-08-445x344.webp" },
  "cesar-fuentes.g3": { src: "/media/products/p03-11-397x354.webp" },
  "la-trufa.g1": { src: "/media/products/p04-10-589x442.webp" },
  "la-trufa.g2": { src: "/media/products/p04-12-432x559.webp" },
  "la-trufa.g3": { src: "/media/products/p04-13-411x308.webp" },
  "hoja-santa.g1": { src: "/media/products/p07-05-438x503.webp" },
  "hoja-santa.g2": { src: "/media/products/p07-07-414x345.webp" },
  "hoja-santa.g3": { src: "/media/products/p07-08-529x397.webp" },
  "black-pimienta.g1": { src: "/media/products/p05-12-555x456.webp" },
  "black-pimienta.g2": { src: "/media/products/p05-10-398x302.webp" },
  "black-pimienta.g3": { src: "/media/products/p05-09-418x558.webp" },
  "camelia.g1": { src: "/media/products/p08-13-668x485.webp" },
  "camelia.g2": { src: "/media/products/p08-10-300x383.webp" },
  "camelia.g3": { src: "/media/products/p09-10-512x743.webp" },
  "agatha.g1": { src: "/media/products/p10-11-735x993.webp" },
  "agatha.g2": { src: "/media/products/p10-10-662x389.webp" },

  // Fotos de REFERENCIA (Unsplash, licencia libre): solo para que la demo se sienta
  // con contenido. No representan los productos reales de Manta Group (ver docs/CREDITS.md).
  "ref.macarrones": { src: "/media/ref/macarrones.webp", credit: "Babs Gorniak / Unsplash" },
  "ref.macarrones-colores": { src: "/media/ref/macarrones-colores.webp", credit: "Baher Khairy / Unsplash" },
  "ref.macarrones-pastel": { src: "/media/ref/macarrones-pastel.webp", credit: "Holly Stratton / Unsplash" },
  "ref.trufas": { src: "/media/ref/trufas.webp", credit: "Merve Aydin / Unsplash" },
  "ref.trufas-pistache": { src: "/media/ref/trufas-pistache.webp", credit: "Monika Grabkowska / Unsplash" },
  "ref.bombones": { src: "/media/ref/bombones.webp", credit: "Monique Carrati / Unsplash" },
  "ref.chocolate-amargo": { src: "/media/ref/chocolate-amargo.webp", credit: "Amit Singh / Unsplash" },
  "ref.cacao": { src: "/media/ref/cacao.webp", credit: "Tetiana Bykovets / Unsplash" },
  "ref.chocolate-caliente": { src: "/media/ref/chocolate-caliente.webp", credit: "Hannah Pemberton / Unsplash" },
  "ref.queso": { src: "/media/ref/queso.webp", credit: "Farhad Ibrahimzade / Unsplash" },
  "ref.queso-tabla": { src: "/media/ref/queso-tabla.webp", credit: "Andra C Taylor Jr / Unsplash" },
  "ref.cerveza": { src: "/media/ref/cerveza.webp", credit: "Eddi Aguirre / Unsplash" },
  "ref.conservas": { src: "/media/ref/conservas.webp", credit: "Olia Gozha / Unsplash" },
  "ref.mermelada": { src: "/media/ref/mermelada.webp", credit: "Rob Wicks / Unsplash" },
  "ref.miel": { src: "/media/ref/miel.webp", credit: "Rob Wicks / Unsplash" },
  "ref.frascos": { src: "/media/ref/frascos.webp", credit: "Maxim Tolchinskiy / Unsplash" },
  "ref.pan": { src: "/media/ref/pan.webp", credit: "Nathan Dumlao / Unsplash" },
  "ref.cafe": { src: "/media/ref/cafe.webp", credit: "Sergey Kotenev / Unsplash" },
  "ref.cafe-taza": { src: "/media/ref/cafe-taza.webp", credit: "Mike Kenneally / Unsplash" },
  "ref.galletas-mantequilla": { src: "/media/ref/galletas-mantequilla.webp", credit: "Orva Studio / Unsplash" },
  "ref.galletas-temporada": { src: "/media/ref/galletas-temporada.webp", credit: "Monika Grabkowska / Unsplash" },
  "ref.galletas-chocolate": { src: "/media/ref/galletas-chocolate.webp", credit: "Jennifer Pallian / Unsplash" },
  "ref.dulces": { src: "/media/ref/dulces.webp", credit: "Girl with red hat / Unsplash" },
  "ref.mercado": { src: "/media/ref/mercado.webp", credit: "Tobias Schäfer / Unsplash" },
};

export function getMedia(id: string): MediaEntry {
  return MEDIA[id] ?? {};
}
