// Contenido de las páginas de marca. Fuente: MantaGroup2026.pdf (textos
// condensados, sin añadir datos). Pendientes: precios, horarios y correos.
import { Coffee, GlassWater, UtensilsCrossed, Wine } from "lucide-react";
import type { WhatsAppIntent } from "@/config/whatsapp";
import type { Collection } from "@/components/modules/brand/Collections";
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

/** Módulos de contenido propios de cada marca (components/modules/brand). */
export type BrandModuleBlock =
  | { kind: "statements"; title: string; items: { label: string; text: string }[] }
  | {
      kind: "specs";
      title: string;
      lead?: string;
      items: { value: string; label: string; note: string }[];
    }
  | {
      kind: "origins";
      title: string;
      lead?: string;
      items: { product: string; place: string }[];
      note?: string;
    }
  | { kind: "collections"; title: string; lead?: string; items: Collection[] }
  | { kind: "dishes"; title: string; lead?: string; items: string[]; note?: string }
  | {
      kind: "person";
      name: string;
      role: string;
      paragraphs: string[];
      media: MediaSlot;
    }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "clients"; title: string; lead?: string; media: MediaSlot };

export interface BrandPageContent {
  hero: BrandHeroLayout;
  /** Servicios en tarjetas (sustituyen a la lista de oferta). */
  services?: ServiceCardItem[];
  offerTitle: string;
  offers: string[];
  /** Módulos que siguen a la oferta. */
  modules: BrandModuleBlock[];
  gallery: MediaSlot[];
  /** Dato protagonista (palabra grande + frase). */
  fact: { highlight: string; text: string };
  cta: { title: string; label: string; intent: WhatsAppIntent };
}

export const BRAND_PAGES: Record<BrandSlug, BrandPageContent> = {
  "cesar-fuentes": {
    hero: "panorama",
    offerTitle: "Alimentos y bebidas para tus eventos",
    services: [
      {
        icon: UtensilsCrossed,
        title: "Catering",
        text: "Alimentos y bebidas para eventos empresariales y sociales en el estado de Querétaro.",
        featured: true,
      },
      { icon: Wine, title: "Banquetes", text: "Para aniversarios, festivos y posadas." },
      {
        icon: Coffee,
        title: "Coffee break y brunch",
        text: "Para juntas, desayunos y visitas corporativas.",
      },
      {
        icon: GlassWater,
        title: "Bocadillos, canapés y catas",
        text: "Para cocteles y catas de vinos, destilados y fermentados.",
      },
    ],
    offers: [],
    modules: [
      {
        kind: "statements",
        title: "Lo que nos mueve",
        items: [
          { label: "Misión", text: "Deleitar tu paladar." },
          { label: "Visión", text: "Con nuestro servicio, permitirte disfrutar." },
          { label: "Filosofía", text: "Calidad en experiencia." },
        ],
      },
      {
        kind: "collections",
        title: "Para cada ocasión",
        lead: "También podemos ayudarte con mobiliario, manteles, flores y meseros.",
        items: [
          {
            name: "Empresas",
            entries: [
              "Eventos empresariales",
              "Juntas",
              "Desayunos",
              "Visitas corporativas",
              "Box lunch",
              "Regalos corporativos",
            ],
          },
          {
            name: "Celebraciones",
            entries: ["Cocteles", "Aniversarios", "Festivos", "Posadas", "Canastas de fin de año"],
          },
          {
            name: "Experiencias",
            entries: [
              "Catas de vinos",
              "Destilados y fermentados",
              "Talleres y cursos para niños",
              "Productos de ultramarinos",
            ],
          },
        ],
      },
      {
        kind: "clients",
        title: "Han confiado en nosotros",
        lead: "Empresas e instituciones para las que hemos servido eventos.",
        media: {
          id: "cesar-fuentes.clients",
          alt: "Logotipos de clientes: Aeroclúster Querétaro, Boeing, Universidad Anáhuac, Ingredion, Rassini, Liverpool, Business France y otros",
        },
      },
    ],
    gallery: [
      { id: "cesar-fuentes.g1", alt: "Mesa de banquete con copas y servilletas" },
      { id: "cesar-fuentes.g2", alt: "Canapés servidos en platos sobre madera" },
      { id: "cesar-fuentes.g3", alt: "Canapé sobre tabla de madera con flores" },
    ],
    fact: {
      highlight: "2019",
      text: "Creando experiencias gastronómicas en Querétaro desde ese año.",
    },
    cta: { title: "Cuéntanos de tu evento", label: "Cotizar por WhatsApp", intent: "quote" },
  },

  "la-trufa": {
    hero: "cacao",
    offerTitle: "Piezas de chocolate artesanal",
    offers: ["Trufas", "Enjambres", "Macizos", "Chocolate amargo", "Chocolate sin azúcar", "Catas"],
    modules: [
      {
        kind: "specs",
        title: "Cuatro orígenes de cacao",
        lead: "Cacao de especialidad, libre de grasas trans y con antioxidantes por la pureza de su origen.",
        items: [
          {
            value: "70%",
            label: "Tabasco, México",
            note: "Notas afrutadas, especiadas y ácidas. Con almendras, pasitas o café.",
          },
          { value: "80%", label: "Bélgica", note: "Notas amargas, ahumadas y tostadas." },
          { value: "85%", label: "África", note: "Notas amargas, ahumadas y tostadas." },
          { value: "60%", label: "Suiza", note: "Para trufas, enjambres, macizos y más." },
        ],
      },
      {
        kind: "quote",
        text: "Piezas clásicas que nos evocan momentos memorables: para compartir o simplemente para consentir tu paladar.",
      },
    ],
    gallery: [
      { id: "la-trufa.g1", alt: "Cubos de chocolate con salpicaduras de color" },
      { id: "la-trufa.g2", alt: "Discos de chocolate con nueces y almendras" },
      { id: "la-trufa.g3", alt: "Bombones rojos con motas doradas" },
    ],
    fact: {
      highlight: "Desde 2020",
      text: "Chocolate artesanal en San Juan del Río, Bernal y Querétaro.",
    },
    cta: { title: "Haz tu pedido", label: "Pedir por WhatsApp", intent: "special" },
  },

  "hoja-santa": {
    hero: "poster",
    offerTitle: "Tipos de servicio",
    offers: [
      "Desayunos",
      "Comidas del día",
      "Cenas",
      "Menús degustación",
      "Menús de temporada",
      "Cenas guiadas",
      "Celebraciones",
    ],
    modules: [
      {
        kind: "quote",
        text: "Que cada visita se sienta como un regreso a la mesa familiar.",
      },
      {
        kind: "dishes",
        title: "Sabores de San Juan del Río",
        lead: "Platillos con ingredientes de productores de la zona y recetas que han pasado de generación en generación.",
        items: [
          "Mole de nopal",
          "Mole de huitlacoche",
          "Mole de flor de calabaza",
          "Agua de quelites",
          "Agua de verdolagas",
          "Crema de garambullo",
          "Ceviche de nopal, tuna y xoconostle",
        ],
        note: "Cada mes, menús temáticos inspirados en personajes históricos, artistas y festividades del mundo.",
      },
      {
        kind: "person",
        name: "Chef Adolfo Gonzaga",
        role: "A cargo de la cocina",
        paragraphs: [
          "Originario de Querétaro y licenciado en gastronomía, con nueve años de experiencia como chef ejecutivo en restaurantes, hoteles y viñedos, especializado en vino y café.",
          "Ha sido docente en Black Pimienta Gastro Lab y juez en concursos de mole y chiles en nogada.",
          "En 2024 inició Hoja Santa para trabajar con productores de la región y mostrar todo lo que San Juan del Río tiene para cocinar.",
        ],
        media: { id: "hoja-santa.chef", alt: "En la cocina de Hoja Santa" },
      },
    ],
    gallery: [
      { id: "hoja-santa.g1", alt: "Platillo con mole, ajonjolí, rábano y puré" },
      { id: "hoja-santa.g2", alt: "Platos de ensalada con frutos y brotes vistos desde arriba" },
      { id: "hoja-santa.g3", alt: "Tostada con láminas de aguacate y brotes" },
    ],
    fact: {
      highlight: "Desde 2024",
      text: "Comida casera con ingredientes frescos y locales, en el Centro Histórico de San Juan del Río.",
    },
    cta: { title: "Reserva tu mesa", label: "Escribir por WhatsApp", intent: "menu" },
  },

  "black-pimienta": {
    hero: "lab",
    offerTitle: "Temas de nuestros cursos",
    offers: [
      "Cocina internacional",
      "Repostería",
      "Pastelería y panadería",
      "Bebidas",
      "Barismo",
      "Coctelería",
    ],
    modules: [
      {
        kind: "quote",
        text: "Tú elaboras las recetas y nosotros somos tu guía.",
      },
      {
        kind: "collections",
        title: "Más formas de aprender",
        lead: "Para que disfrutes, aprendas y pases un rato ameno y único en nuestra cocina.",
        items: [
          { name: "Para niños", entries: ["Cursos para niños", "Campamentos"] },
          {
            name: "Ocasiones",
            entries: [
              "Cursos personalizados",
              "Decoración",
              "Festivos",
              "Dinámicas familiares, sociales o de pareja",
            ],
          },
          {
            name: "Empresas",
            entries: [
              "Capacitación de personal",
              "Integración laboral",
              "Asesoría para conceptos gastronómicos",
              "Costos y estandarización de recetas",
            ],
          },
          {
            name: "Otros temas",
            entries: [
              "Cocina vegana",
              "Orgánico",
              "Sin gluten",
              "Tés y tisanas",
              "Quesos",
              "Floristería",
              "Pasteles",
            ],
          },
        ],
      },
    ],
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
    offerTitle: "Lo más genuino del campo y el arte de Querétaro",
    offers: ["Queso", "Miel", "Café", "Conservas", "Chocolate", "Pan", "Cerveza", "Arte"],
    modules: [
      {
        kind: "origins",
        title: "Cada producto, con su origen",
        lead: "Trabajamos con productores de los municipios del estado para garantizar el origen y la calidad de sus materias primas.",
        items: [
          { product: "Queso de oveja", place: "Amealco" },
          { product: "Cerveza artesanal", place: "San Juan del Río" },
          { product: "Rompope y productos gourmet", place: "Tequisquiapan" },
          { product: "Deshidratados", place: "Tequisquiapan" },
          { product: "Dulces", place: "Bernal" },
          { product: "Pan artesanal", place: "San Juan del Río" },
          { product: "Chocolate", place: "Corregidora" },
          { product: "Piezas de mármol", place: "Tolimán" },
        ],
        note: "También bolsas, compostas, plantas y café.",
      },
      {
        kind: "collections",
        title: "Un espacio para el arte",
        lead: "Conoce la Caja Queretana, una pieza que muestra la geografía de nuestro estado.",
        items: [
          {
            name: "Arte",
            entries: ["Caja Queretana", "Joyería artesanal", "Bolsas", "Muñecas", "Pintura"],
          },
        ],
      },
    ],
    gallery: [
      { id: "camelia.g1", alt: "Textil azul bordado con flor y aves" },
      { id: "camelia.g2", alt: "Canasta con frascos de conserva y moño" },
      { id: "camelia.g3", alt: "Botella de cerveza Queretha sobre una mesa" },
    ],
    fact: {
      highlight: "Querétaro",
      text: "Productores de Amealco, Tequisquiapan, Bernal, Corregidora, Tolimán y San Juan del Río.",
    },
    cta: { title: "Pregunta por un producto", label: "Escribir por WhatsApp", intent: "general" },
  },

  agatha: {
    hero: "light",
    offerTitle: "Galletas para cada momento",
    offers: ["Tradicionales", "De temporada", "Personalizadas", "Para eventos", "Edición especial"],
    modules: [
      {
        kind: "collections",
        title: "Nuestras galletas",
        lead: "Hechas con ingredientes de calidad genuina, como nuestra mantequilla, jaleas y mermeladas.",
        items: [
          {
            name: "Tradicionales",
            entries: [
              "Pastas de mantequilla",
              "Linzer",
              "Lunette",
              "Besitos de nuez",
              "Canelitas",
              "Pasticetas",
              "Sándwich",
            ],
          },
          {
            name: "De temporada",
            entries: [
              "Alfajores",
              "Macarrones",
              "Tejas de almendra",
              "Suecas",
              "Suizas",
              "Alemanas",
              "Vienesas",
            ],
          },
          { name: "Personalizadas", entries: ["De personajes", "Cumpleaños", "Profesiones"] },
          {
            name: "Eventos",
            entries: ["XV años", "Bodas", "Baby shower", "Graduación", "Corporativas"],
          },
          {
            name: "Edición especial",
            entries: ["San Valentín", "Pascua", "Día de las Madres", "Halloween", "Navidad"],
          },
        ],
      },
    ],
    gallery: [
      { id: "agatha.g1", alt: "Plato de galletas de mantequilla sobre mantel de flores" },
      { id: "agatha.g2", alt: "Galletas linzer con centro de mermelada" },
    ],
    fact: {
      highlight: "Hecho en casa",
      text: "Nuestra mantequilla, jaleas y mermeladas son propias.",
    },
    cta: { title: "Encarga tus galletas", label: "Pedir por WhatsApp", intent: "special" },
  },
};
