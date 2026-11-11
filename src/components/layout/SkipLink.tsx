export const MAIN_ID = "contenido";

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_ID}`}
      className="sr-only z-[60] rounded-[4px] bg-ink px-5 py-3 text-small font-semibold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Saltar al contenido
    </a>
  );
}
