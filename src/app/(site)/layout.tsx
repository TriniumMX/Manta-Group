// Shell público. SkipLink + SiteHeader + SiteFooter se añaden en el bloque 2.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <main id="contenido">{children}</main>;
}
