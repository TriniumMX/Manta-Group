"use client";

import { ScrollSequence, type SequenceCaption } from "@/components/media/ScrollSequence";
import { drawTruffle } from "@/components/media/drawTruffle";

const captions: SequenceCaption[] = [
  {
    from: 0,
    to: 0.3,
    node: (
      <>
        <p className="text-eyebrow uppercase text-cream/80">La Trufa · Chocolates artesanales</p>
        <h1 className="mt-4 text-display">Chocolate hecho a mano.</h1>
        <p className="mt-4 text-body text-cream/85">Baja para abrirlo.</p>
      </>
    ),
  },
  {
    from: 0.38,
    to: 0.7,
    node: (
      <>
        <h2 className="text-h1">Cacao de origen.</h2>
        <p className="mx-auto mt-4 max-w-[48ch] text-body text-cream/90">
          70% de Tabasco y cacaos de Bélgica, África y Suiza, con notas afrutadas, ahumadas y
          tostadas.
        </p>
      </>
    ),
  },
  {
    from: 0.78,
    to: 1.01,
    node: (
      <>
        <h2 className="text-h1">Pieza por pieza.</h2>
        <p className="mx-auto mt-4 max-w-[48ch] text-body text-cream/90">
          Trufas, enjambres y macizos para regalar o celebrar.
        </p>
      </>
    ),
  },
];

export function PrototypeTruffle() {
  return (
    <ScrollSequence
      draw={drawTruffle}
      captions={captions}
      scrollLength={4}
      label="Una trufa de chocolate se abre y suelta fragmentos de chocolate y polvo de cacao."
    />
  );
}
