// Registro de las seis marcas (orden editorial). Textos PROVISIONALES:
// se reemplazan con la información oficial de Manta Group.
import type { Brand, BrandSlug } from "@/types/content";
import { BRAND_THEMES } from "./theme";

export const BRANDS: Brand[] = [
  {
    slug: "cesar-fuentes",
    name: "César Fuentes",
    category: "Gastronomía holística",
    tagline: "Cocina con intención, servida como experiencia.",
    description:
      "Catering, banquetes, coffee breaks, brunch, canapés y catas para eventos empresariales y sociales en Querétaro, desde 2019.",
    experienceCategories: ["experiencias"],
    theme: BRAND_THEMES["cesar-fuentes"],
    heroSlot: {
      id: "cesar-fuentes.hero",
      alt: "Mesa servida para una experiencia gastronómica",
      aspect: "21/9",
    },
    cardSlot: { id: "cesar-fuentes.card", alt: "Detalle de un platillo de autor", aspect: "4/5" },
    ctaLabel: "Cotiza tu experiencia",
    modules: ["services", "gallery"],
    isDemo: true,
  },
  {
    slug: "la-trufa",
    name: "La Trufa",
    category: "Chocolates artesanales",
    tagline: "Chocolate hecho a mano, pieza por pieza.",
    description:
      "Trufas, enjambres y macizos con cacao mexicano de Tabasco y cacaos de Bélgica, África y Suiza, desde 2020.",
    experienceCategories: ["artesanal"],
    theme: BRAND_THEMES["la-trufa"],
    heroSlot: {
      id: "la-trufa.hero",
      alt: "Chocolates artesanales sobre fondo oscuro",
      aspect: "4/5",
    },
    cardSlot: { id: "la-trufa.card", alt: "Trufas de chocolate", aspect: "4/5" },
    ctaLabel: "Consultar por WhatsApp",
    modules: ["catalog"],
    isDemo: true,
  },
  {
    slug: "hoja-santa",
    name: "Hoja Santa",
    category: "Restaurante",
    tagline: "Una mesa para volver.",
    description:
      "Cocina de casa del Chef Adolfo Gonzaga con ingredientes de San Juan del Río: desayunos, comidas, menús temáticos y cenas guiadas.",
    experienceCategories: ["restaurantes"],
    theme: BRAND_THEMES["hoja-santa"],
    heroSlot: {
      id: "hoja-santa.hero",
      alt: "Interior de restaurante con luz natural",
      aspect: "16/9",
    },
    cardSlot: { id: "hoja-santa.card", alt: "Platillo servido en mesa de madera", aspect: "4/5" },
    ctaLabel: "Escríbenos por WhatsApp",
    modules: ["menus", "gallery", "services"],
    isDemo: true,
  },
  {
    slug: "black-pimienta",
    name: "Black Pimienta",
    eyebrow: "Gastro Lab",
    category: "Formación gastronómica",
    tagline: "Un laboratorio para aprender cocina haciendo.",
    description:
      "Cursos de cocina internacional, repostería, pan, barismo y coctelería, para adultos, niños y grupos, con calendario mensual.",
    experienceCategories: ["formacion"],
    theme: BRAND_THEMES["black-pimienta"],
    heroSlot: {
      id: "black-pimienta.hero",
      alt: "Cocina de formación con estaciones de trabajo",
      aspect: "16/9",
    },
    cardSlot: { id: "black-pimienta.card", alt: "Manos preparando una masa", aspect: "4/5" },
    ctaLabel: "Solicitar información",
    modules: ["courses"],
    isDemo: true,
  },
  {
    slug: "camelia",
    name: "Camelia",
    category: "Productos artesanales de Querétaro",
    tagline: "Lo hecho a mano, con origen.",
    description:
      "Queso, miel, café, conservas, chocolate, pan, arte y la cerveza artesanal Queretha, de productores de distintos municipios de Querétaro.",
    experienceCategories: ["artesanal"],
    theme: BRAND_THEMES.camelia,
    heroSlot: { id: "camelia.hero", alt: "Productos artesanales sobre textil", aspect: "4/5" },
    cardSlot: { id: "camelia.card", alt: "Detalle de una pieza artesanal", aspect: "4/5" },
    ctaLabel: "Consultar por WhatsApp",
    modules: ["catalog", "gallery"],
    isDemo: true,
  },
  {
    slug: "agatha",
    name: "Agatha",
    category: "Galletería artesanal",
    tagline: "Galletas con oficio, para compartir.",
    description:
      "Galletas de mantequilla, linzer y de temporada, personalizadas y para eventos, con mantequilla y mermeladas propias.",
    experienceCategories: ["artesanal"],
    theme: BRAND_THEMES.agatha,
    heroSlot: { id: "agatha.hero", alt: "Galletas artesanales en charola", aspect: "16/9" },
    cardSlot: { id: "agatha.card", alt: "Galletas decoradas", aspect: "4/5" },
    ctaLabel: "Hacer pedido por WhatsApp",
    modules: ["catalog", "gallery"],
    isDemo: true,
  },
];

export const BRAND_SLUGS = BRANDS.map((b) => b.slug);

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function brandHref(slug: BrandSlug) {
  return `/marcas/${slug}`;
}
