/** Separa "Desde 2020" → { prefix: "Desde ", value: 2020, suffix: "" }; null si no es una cifra. */
export function parseFigure(text: string) {
  const m = text.match(/^(\D*?)(\d+)(\D*)$/);
  if (!m) return null;
  return { prefix: m[1], value: Number(m[2]), digits: m[2].length, suffix: m[3] };
}
