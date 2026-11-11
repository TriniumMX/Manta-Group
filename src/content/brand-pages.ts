// Contenido de las páginas de marca. Datos tomados de MantaGroup2026.pdf
// (lo que ofrece cada marca). Sin precios, horarios ni direcciones: pendientes.
import { Coffee, GlassWater, UtensilsCrossed, Wine } from "lucide-react";
import type { WhatsAppIntent } from "@/config/whatsapp";
import type { ServiceCardItem } from "@/components/modules/services/ServiceCards";
import type { BrandSlug, MediaSlot } from "@/types/content";

/**
 * Composición de la portada de cada marca (PLAN_MG §7.3):
 * panorama: ceremoniosa, foto ancha que se acerca al hacer scroll.
 * cacao:    oscura, el producto como joya.
 * poster:   titular sobre la foto y submenú de anclas.
 * lab:      carbón con retícula técnica.
 * split:    dividida, texto y foto con textura artesanal.
 * light:    luminosa, centrada, tono miel.
 */
export type BrandHeroLayout = "panorama" | "cacao" | "poster" | "lab" | "split" | "light";

export interface BrandPageContent {
  hero: BrandHeroLayout;
  /** Servicios en tarjetas (sustituyen a la lista de oferta). */
  services?: ServiceCardItem[];
  /** Título de la lista de oferta. */
  offerTitle: string;
  offers: string[];
  gallery: MediaSlot[];
  /** Dato protagonista (palabra grande + frase). */
  fact: { highlight: string; text: string };
  cta: { title: string; label: string; intent: WhatsAppIntent };
}

export const BRAND_PAGES: Record<BrandSlug, BrandPageContent> = {
  "cesar-fuentes": {
    hero: "panorama",
    services: [
      {
        icon: UtensilsCrossed,
        title: "Catering",
        text: "Servicio de alimentos para eventos empresariales y sociales.",
        featured: true,
      },
      { icon: Wine, title: "Banquetes", text: "Para celebraciones y reuniones." },
      {
        icon: Coffee,
        title: "Coffee breaks y brunch",
        text: "Para jornadas de trabajo, juntas y encuentros.",
      },
      {
        icon: GlassWater,
        title: "Canapés y catas",
        text: "Bocados y catas para cocteles y presentaciones.",
      },
    ],
    offerTitle: "Para eventos empresariales y sociales",
    offers: ["Catering", "Banquetes", "Coffee breaks", "Brunch", "Canapés", "Catas"],
    gallery: [
      { id: "cesar-fuentes.g1", alt: "Mesa de banquete con copas y servilletas" },
      { id: "cesar-fuentes.g2", alt: "Canapés servidos en platos sobre madera" },
      { id: "cesar-fuentes.g3", alt: "Canapé sobre tabla de madera con flores" },
    ],
    fact: { highlight: "2019", text: "Sirviendo eventos en Querétaro desde ese año." },
    cta: { title: "Cuéntanos de tu evento", label: "Cotizar por WhatsApp", intent: "quote" },
  },
  "la-trufa": {
    hero: "cacao",
    offerTitle: "Chocolate hecho a mano",
    offers: ["Trufas", "Enjambres", "Macizos", "Pedidos especiales"],
    gallery: [
      { id: "la-trufa.g1", alt: "Cubos de chocolate con salpicaduras de color" },
      { id: "la-trufa.g2", alt: "Discos de chocolate con nueces y almendras" },
      { id: "la-trufa.g3", alt: "Bombones rojos con motas doradas" },
    ],
    fact: {
      highlight: "Tabasco",
      text: "Cacao mexicano, junto a cacaos de Bélgica, África y Suiza. Desde 2020.",
    },
    cta: { title: "Haz tu pedido", label: "Pedir por WhatsApp", intent: "special" },
  },
  "hoja-santa": {
    hero: "poster",
    offerTitle: "Cocina de casa, todos los días",
    offers: ["Desayunos", "Comidas", "Menús temáticos", "Cenas guiadas"],
    gallery: [
      { id: "hoja-santa.g1", alt: "Platillo con mole, ajonjolí, rábano y puré" },
      { id: "hoja-santa.g2", alt: "Cocinero emplatando en la cocina" },
      { id: "hoja-santa.g3", alt: "Tostada con láminas de aguacate y brotes" },
    ],
    fact: {
      highlight: "San Juan del Río",
      text: "Ingredientes locales en la cocina del Chef Adolfo Gonzaga.",
    },
    cta: { title: "Consulta el menú", label: "Preguntar por WhatsApp", intent: "menu" },
  },
  "black-pimienta": {
    hero: "lab",
    offerTitle: "Cursos para adultos, niños y grupos",
    offers: ["Cocina internacional", "Repostería", "Pan", "Barismo", "Coctelería"],
    gallery: [
      { id: "black-pimienta.g1", alt: "Pastel con glaseado espejo y frutos rojos" },
      { id: "black-pimienta.g2", alt: "Galletas decoradas con mermelada" },
      { id: "black-pimienta.g3", alt: "Alumna extendiendo masa con rodillo" },
    ],
    fact: { highlight: "Cada mes", text: "Un calendario nuevo de cursos y talleres." },
    cta: { title: "Aparta tu lugar", label: "Preguntar por cursos", intent: "general" },
  },
  camelia: {
    hero: "split",
    offerTitle: "De productores de Querétaro",
    offers: ["Queso", "Miel", "Café", "Conservas", "Chocolate", "Pan", "Arte", "Cerveza Queretha"],
    gallery: [
      { id: "camelia.g1", alt: "Textil azul bordado con flor y aves" },
      { id: "camelia.g2", alt: "Canasta con frascos de conserva y moño" },
      { id: "camelia.g3", alt: "Botella de cerveza Queretha sobre una mesa" },
    ],
    fact: {
      highlight: "Querétaro",
      text: "Productos de distintos municipios del estado, en un solo lugar.",
    },
    cta: { title: "Pregunta por un producto", label: "Escribir por WhatsApp", intent: "general" },
  },
  agatha: {
    hero: "light",
    offerTitle: "Galletas con mantequilla y mermeladas propias",
    offers: ["De mantequilla", "Linzer", "De temporada", "Personalizadas", "Para eventos"],
    gallery: [
      { id: "agatha.g1", alt: "Plato de galletas de mantequilla sobre mantel de flores" },
      { id: "agatha.g2", alt: "Galletas linzer con centro de mermelada" },
    ],
    fact: { highlight: "Hecho en casa", text: "La mantequilla y las mermeladas son propias." },
    cta: { title: "Encarga tus galletas", label: "Pedir por WhatsApp", intent: "special" },
  },
};
