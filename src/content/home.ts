// Contenido de la página de Inicio.
// Los datos de cada marca (años, origen de ingredientes, chef) vienen de
// MantaGroup2026.pdf. Los textos de concepto del grupo siguen siendo una
// PROPUESTA de TRINIUM: sin valores, cifras ni historia del grupo no confirmados.
import type { BrandSlug, ExperienceCategory, MediaSlot } from "@/types/content";

export const HOME_HERO = {
  kicker: "Gastronomía, restaurante, formación y producto artesanal en Querétaro",
  // Concepto oficial (config/site.ts → SITE.concept), partido en dos líneas.
  lines: ["Seis marcas.", "Una misma visión."],
  primaryCta: { label: "Descubre las marcas", href: "#marcas" },
  secondaryCta: { label: "Conoce al grupo", href: "/nosotros" },
  media: {
    id: "mg.hero",
    alt: "Cocinero con gorro emplatando una larga mesa de platos en un salón de arcos",
  } satisfies MediaSlot,
  // Aparece cuando la foto termina de abrirse.
  statement: "Del banquete a la mesa de casa, del cacao a la galleta, del aula a la cerveza.",
  caption: "En la cocina de Hoja Santa, minutos antes del servicio.",
};

export const HOME_MANIFESTO = {
  text: "Seis marcas que comparten terreno: la gastronomía y lo hecho con oficio. Cada una conserva su nombre, su carácter y su manera de atender. Juntas se recorren como una sola experiencia.",
  link: { label: "Conoce al grupo", href: "/nosotros" },
};

export const HOME_BRANDS = {
  title: "Seis marcas, una misma mesa",
  lead: "Del evento a la mesa de restaurante, del curso a la caja de chocolates.",
  // Dos fotografías por marca: principal e inserto.
  photos: {
    "cesar-fuentes": {
      main: {
        id: "mg.stack.cesar-fuentes",
        alt: "Equipo de meseros detrás de una mesa de buffet en un patio de piedra",
      },
      inset: {
        id: "mg.stack.cesar-fuentes.inset",
        alt: "Canapés servidos en platos sobre madera, vistos desde arriba",
      },
    },
    "la-trufa": {
      main: {
        id: "mg.stack.la-trufa",
        alt: "Cubos de chocolate con salpicaduras de color sobre piedra",
      },
      inset: { id: "mg.stack.la-trufa.inset", alt: "Bombones rojos con motas doradas" },
    },
    "hoja-santa": {
      main: { id: "mg.stack.hoja-santa", alt: "Platillo con mole, ajonjolí, rábano y puré" },
      inset: { id: "mg.stack.hoja-santa.inset", alt: "Tostada con láminas de aguacate y brotes" },
    },
    "black-pimienta": {
      main: {
        id: "mg.stack.black-pimienta",
        alt: "Alumna con mandil extendiendo masa con rodillo",
      },
      inset: {
        id: "mg.stack.black-pimienta.inset",
        alt: "Pastel con glaseado espejo y frutos rojos",
      },
    },
    camelia: {
      main: {
        id: "mg.stack.camelia",
        alt: "Botellas artesanales con moño de cuadros en un anaquel",
      },
      inset: {
        id: "mg.stack.camelia.inset",
        alt: "Botella de cerveza Josefa entre flores de colores",
      },
    },
    agatha: {
      main: {
        id: "mg.stack.agatha",
        alt: "Galletas linzer con centro de mermelada junto a un tarro",
      },
      inset: {
        id: "mg.stack.agatha.inset",
        alt: "Plato de galletas de mantequilla sobre mantel de flores",
      },
    },
  } satisfies Record<BrandSlug, { main: MediaSlot; inset: MediaSlot }>,
};

export interface ExperienceBlock {
  id: ExperienceCategory;
  title: string;
  description: string;
  media: MediaSlot;
}

export const HOME_EXPERIENCES = {
  title: "Cuatro maneras de sentarse a la mesa",
  link: { label: "Ver todas las marcas", href: "/marcas" },
  items: [
    {
      id: "experiencias",
      title: "Experiencias gastronómicas",
      description:
        "Catering, banquetes, coffee breaks y catas para eventos empresariales y sociales.",
      media: { id: "mg.experiencias", alt: "Mesa de banquete con copas y servilletas" },
    },
    {
      id: "restaurantes",
      title: "Restaurantes y sabores",
      description: "Cocina de casa con ingredientes locales: desayunos, comidas y cenas guiadas.",
      media: { id: "mg.restaurantes", alt: "Cocinero emplatando en una cocina" },
    },
    {
      id: "artesanal",
      title: "Productos artesanales",
      description:
        "Chocolates, galletas, conservas y cerveza, hechos a mano o por productores de Querétaro.",
      media: { id: "mg.artesanal", alt: "Canasta con frascos de conserva y moño" },
    },
    {
      id: "formacion",
      title: "Formación gastronómica",
      description: "Cocina, repostería, pan, barismo y coctelería, con calendario mensual.",
      media: { id: "mg.formacion", alt: "Galletas decoradas con mermelada en forma de estrella" },
    },
  ] satisfies ExperienceBlock[],
};

export interface GalleryShot {
  brand: BrandSlug;
  caption: string;
  media: MediaSlot;
  shape: "portrait" | "square" | "landscape";
}

export const HOME_GALLERY = {
  title: "Lo que pasa en las cocinas del grupo",
  items: [
    {
      brand: "cesar-fuentes",
      caption: "Bocado para coctel",
      shape: "portrait",
      media: { id: "mg.mesa.canape", alt: "Canapé sobre tabla de madera con flores alrededor" },
    },
    {
      brand: "la-trufa",
      caption: "Chocolate con nueces y almendras",
      shape: "portrait",
      media: {
        id: "mg.mesa.chocolates",
        alt: "Discos de chocolate con nueces y almendras sobre piedra",
      },
    },
    {
      brand: "hoja-santa",
      caption: "Ensaladas listas para servir",
      shape: "landscape",
      media: {
        id: "mg.mesa.ensaladas",
        alt: "Platos de ensalada con frutos y brotes vistos desde arriba",
      },
    },
    {
      brand: "camelia",
      caption: "Bordado artesanal",
      shape: "landscape",
      media: { id: "mg.mesa.bordado", alt: "Textil azul bordado con flor y aves en tonos crema" },
    },
    {
      brand: "camelia",
      caption: "Cerveza Queretha",
      shape: "portrait",
      media: {
        id: "mg.mesa.queretha",
        alt: "Botella de cerveza Queretha sobre una mesa con luz violeta",
      },
    },
  ] satisfies GalleryShot[],
};

export const HOME_SPECS = {
  title: "Detrás de cada marca",
  // Datos tomados de MantaGroup2026.pdf. `highlight` es la cifra o palabra protagonista.
  items: [
    {
      brand: "cesar-fuentes",
      highlight: "2019",
      fact: "Eventos empresariales y sociales en Querétaro desde ese año.",
    },
    {
      brand: "la-trufa",
      highlight: "Tabasco",
      fact: "Cacao mexicano, junto a cacaos de Bélgica, África y Suiza.",
    },
    {
      brand: "hoja-santa",
      highlight: "San Juan del Río",
      fact: "Ingredientes locales en la cocina de casa del Chef Adolfo Gonzaga.",
    },
    {
      brand: "black-pimienta",
      highlight: "Cada mes",
      fact: "Un calendario de cursos para adultos, niños y grupos.",
    },
    {
      brand: "camelia",
      highlight: "Querétaro",
      fact: "Queso, miel, café y cerveza de productores de distintos municipios.",
    },
    {
      brand: "agatha",
      highlight: "Hecho en casa",
      fact: "Galletas con mantequilla y mermeladas propias.",
    },
  ] satisfies { brand: BrandSlug; highlight: string; fact: string }[],
};

export const HOME_CONTACT = {
  title: "¿Por dónde quieres empezar?",
  lead: "Escribe al grupo para propuestas y colaboraciones, o entra directo a la marca que buscas.",
  cta: "Escribir por WhatsApp",
  secondary: { label: "Ver todas las marcas", href: "/marcas" },
};
