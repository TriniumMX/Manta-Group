// Queretha es la cerveza artesanal que se ofrece dentro de Camelia (no es marca aparte).
// Textos tomados de MantaGroup2026.pdf; el PDF trae "1971" en la portada, lo correcto es 1917.

export interface QuerethaBeer {
  year: string;
  name: string;
  style: string;
  notes: string;
  story: string;
  /** Fondo de la tarjeta; todos con contraste ≥ 4.5:1 con texto crema. */
  color: string;
}

export const QUERETHA = {
  name: "Queretha",
  eyebrow: "Cerveza artesanal · Hecho en Querétaro",
  title: "Cerveza con historia",
  lead:
    "Queretha viene del purépecha “Queretha’Ro”, lugar del juego de pelota. " +
    "Cada estilo cuenta un momento de la historia de nuestro estado.",
  media: {
    id: "camelia.queretha",
    alt: "Botellas de cerveza artesanal Queretha",
  },
} as const;

export const QUERETHA_BEERS: QuerethaBeer[] = [
  {
    year: "1531",
    name: "Conín",
    style: "Stout",
    notes: "Notas de cacao y trufa",
    story:
      "Inspirada en la fundación de San Juan del Río y Querétaro, a cargo del líder otomí Conín, " +
      "bautizado después como Fernando de Tapia. Nos recuerda el mestizaje de dos mundos.",
    color: "#3A2A22",
  },
  {
    year: "1810",
    name: "Josefa",
    style: "Ale con frutos rojos",
    notes: "Fresa, zarzamora, frambuesa, cereza y mora; toques de acidez",
    story:
      "Inspirada en Josefa Ortiz de Domínguez, quien organizaba reuniones secretas disfrazadas " +
      "de tertulias literarias para conspirar por la independencia. Perseverancia y lucha.",
    color: "#8A3A55",
  },
  {
    year: "1917",
    name: "Constitución",
    style: "Golden blonde",
    notes: "Notas minerales y cítricas",
    story:
      "Recuerda la culminación de la Revolución Mexicana, con la promulgación de la Constitución " +
      "de 1917 en el Teatro de la República, en Querétaro. Nuevos tiempos, nuevas experiencias.",
    color: "#7A5A22",
  },
];
