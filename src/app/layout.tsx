import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SITE } from "@/config/site";
import "@/styles/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = {
  themeColor: "#F4EFE6",
};

const INTRO_SCRIPT = `try{if(location.pathname==="/"&&!sessionStorage.getItem("mg-intro")&&matchMedia("(prefers-reduced-motion: no-preference)").matches){document.documentElement.dataset.intro="play";sessionStorage.setItem("mg-intro","1")}}catch(e){}`;

// Layout raíz mínimo: sin header ni footer (viven en (site)/layout.tsx).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Decide antes de pintar si se muestra la intro (1.ª visita a Inicio). */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
