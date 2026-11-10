# PLAN_MG — Manta Group · Demo web corporativo multimarca

**Cliente:** Manta Group (MG)
**Agencia:** TRINIUM — "Tecnología con corazón"
**Fase:** A — Planeación (sin código todavía)
**Fecha:** 10 de noviembre de 2026
**Estado del repositorio al iniciar:** `C:\Claude\MG` vacío. No existe proyecto previo, `package.json` ni repositorio Git. La arquitectura se define desde cero.
**Entorno detectado:** Node 22.13, npm 10.9, pnpm 11.1, Git 2.49 (Windows 11).

---

## 0. Resumen ejecutivo

Construiremos un **prototipo comercial de alta fidelidad**: un sitio navegable, responsivo y visualmente premium que muestre cómo se verá y se sentirá el ecosistema digital de Manta Group, con una página corporativa, seis espacios de marca con módulos propios, catálogos y menús ilustrativos, un calendario mensual de cursos y una vista conceptual del panel administrativo.

Principios que gobiernan todas las decisiones de este plan:

1. **Demo, no producto.** Todo vive en datos locales (TypeScript). Nada de backend, autenticación, pagos ni persistencia.
2. **Una base, seis voces.** Un sistema de diseño común con tokens de acento por marca; cada página de marca tiene composición y módulos distintos.
3. **Reemplazable sin tocar componentes.** Textos, imágenes, enlaces y números de WhatsApp viven en `src/config` y `src/content`, nunca dentro de los componentes.
4. **Honestidad visual.** Lo provisional se identifica con marcadores discretos y centralizados, sin saturar la interfaz.
5. **Listo para evolucionar.** Capa de acceso a contenido con la misma firma que tendrá con Supabase, para que el salto a producción sea cambiar la implementación, no las páginas.

Concepto creativo de trabajo (propuesta, no eslogan oficial): **"Seis marcas. Una misma visión."**

---

## 1. Análisis de requerimientos

### 1.1 Lo que el cliente necesita ver

| Objetivo | Cómo lo demuestra el demo |
|---|---|
| MG como marca corporativa reconocible | Identidad tipográfica provisional, header y footer globales, sección "Nuestra esencia", sistema visual coherente en todas las rutas |
| Cada negocio con identidad y funciones propias | Acento cromático y módulos específicos por marca (catálogo, menús, calendario, servicios) |
| Sensación de "mismo grupo" al cambiar de marca | Header persistente con selector de marcas, breadcrumb, footer corporativo, transiciones suaves, misma retícula |
| Generación de conversaciones por WhatsApp | CTA contextual por marca y por acción, con mensaje prellenado y estado "pendiente de configuración" |
| Facilidad de administración futura | Vista `/demo/admin` con módulos conceptuales y ediciones simuladas |
| Experiencia móvil excelente | Diseño mobile-first, navegación con una mano, calendario y catálogos probados en 360/390/768/1280 px |

### 1.2 Inventario de contenidos por marca

| Marca | Giro | Módulos distintivos | CTA principal |
|---|---|---|---|
| César Fuentes | Gastronomía holística, catering, eventos, experiencias | Servicios en tarjetas, bloque catering/eventos, galería editorial | "Cotiza tu experiencia" |
| La Trufa | Chocolates artesanales | Catálogo por categorías con detalle en modal, pedidos especiales | "Consultar por WhatsApp" |
| Hoja Santa | Restaurante | Dos menús alternables, galería de platillos, servicios complementarios, ubicación/horarios pendientes | "Escríbenos por WhatsApp" |
| Black Pimienta / Gastro Lab | Formación gastronómica (~15 cursos/mes) | Cursos destacados, calendario mensual navegable, próximos cursos, ficha de curso | "Solicitar información" |
| Camelia | Productos artesanales de Querétaro | Catálogo visual por categorías, galería, bloque "valor de lo artesanal" | "Consultar por WhatsApp" |
| Agatha | Galletería artesanal | Catálogo por colecciones, presentaciones especiales, galería | "Hacer pedido por WhatsApp" |

### 1.3 Restricciones explícitas que respetaremos

- No inventar direcciones, teléfonos, precios, horarios, certificaciones, testimonios ni trayectoria. Los campos existen en la estructura de datos pero se muestran como "pendiente de configuración" o se omiten.
- No inventar ni alterar logotipos. Se usan **wordmarks tipográficos provisionales** (nombre de marca compuesto con la tipografía editorial) dentro de un componente `BrandMark` que aceptará el SVG oficial cuando exista.
- Catálogos con 4 a 6 productos ficticios por marca, etiquetados como ejemplo.
- Calendario con cursos ilustrativos, etiquetados como demostrativos.
- Sin e-commerce, carrito, pagos, inventario, reservaciones, inscripciones, cuentas, autenticación, backend, CMS real ni integraciones externas.

---

## 2. Arquitectura propuesta

### 2.1 Stack

| Capa | Elección | Motivo |
|---|---|---|
| Framework | **Next.js (App Router)**, versión estable fijada al iniciar el bloque 1 | Preferencia del cliente; SSG por defecto, `next/image`, `next/font`, Metadata API |
| Lenguaje | **TypeScript** estricto | Tipos de contenido compartidos entre mock y futura base de datos |
| Estilos | **Tailwind CSS v4** (la que instala `create-next-app`) con tokens en `@theme` | Tokens de diseño como variables CSS; theming por marca con `data-brand` |
| Iconos | **lucide-react** | Requerido; ligero, tree-shakeable |
| Utilidades | `clsx` + `tailwind-merge` (helper `cn`) | Composición de clases en componentes con variantes |
| Animación | **CSS transitions + `IntersectionObserver`** (hook `useReveal`) | Sin librerías de animación; respeta `prefers-reduced-motion` de forma nativa |
| Diálogos | Elemento nativo `<dialog>` envuelto en componente propio | Accesible, con foco y `Esc` sin dependencia |
| Gestor de paquetes | **pnpm** | Ya instalado, rápido, lockfile compatible con Vercel |
| Calidad | ESLint (config de Next) + `tsc --noEmit` + Prettier | Verificación de compilación y rutas antes de entregar |

Dependencias de producción previstas: `next`, `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`. Nada más salvo justificación documentada.

**Registro de versiones.** Al ejecutar `create-next-app` en el bloque 1 se anotan en README las versiones exactas instaladas de Next.js, React, TypeScript, Tailwind y `lucide-react`, se confirma que la versión de Node (22.13) está dentro del rango soportado por esa versión de Next, y se conserva `pnpm-lock.yaml` en el repositorio. Las versiones se fijan sin `^` en `package.json` para que la entrega sea reproducible. Si la versión estable de Next.js en ese momento introdujera cambios incompatibles con este plan (por ejemplo, en la API de layouts o `next/image`), se documenta la diferencia en README antes de continuar.

### 2.2 Estructura de carpetas

```
MG/
├── PLAN_MG.md
├── README.md
├── docs/
│   ├── DEPLOY_VERCEL.md          # instrucciones de publicación (sin desplegar)
│   ├── MATERIALES_MG.md          # lista de materiales a solicitar a MG
│   └── CREDITS.md                # créditos/licencias de imágenes ilustrativas
├── public/
│   ├── media/                    # imágenes ilustrativas locales (opcional)
│   │   ├── mg/
│   │   └── cesar-fuentes/ … agatha/
│   └── brand-marks/              # aquí irán los SVG oficiales (vacío en demo)
├── src/
│   ├── app/
│   │   ├── layout.tsx            # RAÍZ MÍNIMO: <html lang="es-MX">, <body>, fuentes, metadata base. Sin header ni footer.
│   │   ├── not-found.tsx         # 404 global (usa el shell público de forma explícita)
│   │   ├── (site)/               # GRUPO DE RUTAS PÚBLICO
│   │   │   ├── layout.tsx        # SkipLink + SiteHeader + <main> + SiteFooter
│   │   │   ├── page.tsx          # Inicio
│   │   │   ├── marcas/
│   │   │   │   ├── page.tsx      # Nuestras marcas
│   │   │   │   ├── cesar-fuentes/page.tsx
│   │   │   │   ├── la-trufa/page.tsx
│   │   │   │   ├── hoja-santa/page.tsx
│   │   │   │   ├── black-pimienta/page.tsx
│   │   │   │   ├── camelia/page.tsx
│   │   │   │   └── agatha/page.tsx
│   │   │   ├── nosotros/page.tsx
│   │   │   └── contacto/page.tsx
│   │   └── (admin)/              # GRUPO DE RUTAS ADMINISTRATIVO (no hereda header/footer públicos)
│   │       └── demo/
│   │           └── admin/
│   │               ├── layout.tsx        # AdminShell: sidebar + topbar "Modo demostración" + proveedor de estado
│   │               ├── page.tsx          # dashboard
│   │               ├── not-found.tsx     # 404 administrativo (módulo inexistente)
│   │               └── [module]/page.tsx # marcas | productos | menus | servicios | cursos | galerias | contacto
│   ├── components/
│   │   ├── ui/                   # primitivas: Button, Badge, Chip, Dialog, Tabs, Field, Toast, Skeleton
│   │   ├── layout/               # SiteHeader, MobileNav, BrandSwitcher, SiteFooter, Breadcrumb, Container, Section
│   │   ├── media/                # SmartImage, MediaPlaceholder, Gallery, Lightbox
│   │   ├── brand/                # BrandMark, BrandHero, BrandIntro, BrandPage (shell), BrandCTA, StickyWhatsApp
│   │   ├── modules/              # módulos reutilizables de contenido
│   │   │   ├── catalog/          # ProductGrid, ProductCard, ProductDialog, CategoryFilter
│   │   │   ├── menu/             # MenuSwitcher, MenuSection, MenuItemRow
│   │   │   ├── courses/          # CourseCalendar, CalendarGrid, CalendarAgenda, CourseCard, CourseDialog, UpcomingCourses
│   │   │   ├── services/         # ServiceCards, ServiceFeature
│   │   │   └── info/             # PendingField, InfoBlock (ubicación/horarios pendientes)
│   │   ├── home/                 # Hero, BrandUniverse, ExperiencesGrid, Essence, ContactInvite
│   │   ├── whatsapp/             # WhatsAppButton, WhatsAppDemoDialog
│   │   ├── demo/                 # DemoBadge, DemoNotice
│   │   └── admin/                # AdminShell, AdminSidebar, DataTable, EditDrawer, ModuleHeader, SimulatedSaveToast
│   ├── config/
│   │   ├── site.ts               # nombre, navegación, footer, metadata base, redes (placeholders)
│   │   ├── brands.ts             # registro de las 6 marcas: slug, nombre, giro, tagline, tema, rutas
│   │   ├── whatsapp.ts           # números por marca (null en demo) + plantillas de mensaje
│   │   ├── media.ts              # manifiesto de slots de imagen → ruta local o placeholder
│   │   └── theme.ts              # tokens compartidos en TS (para admin y utilidades)
│   ├── content/                  # DATOS DE EJEMPLO (claramente marcados)
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── contact.ts
│   │   ├── brands/
│   │   │   ├── cesar-fuentes.ts  # intro, filosofía, servicios, galería
│   │   │   ├── la-trufa.ts       # intro, categorías, productos, pedidos especiales
│   │   │   ├── hoja-santa.ts     # concepto, 2 menús, galería, servicios, info pendiente
│   │   │   ├── black-pimienta.ts # intro, cursos destacados, plantillas de cursos
│   │   │   ├── camelia.ts        # intro, categorías, productos, historia artesanal
│   │   │   └── agatha.ts         # intro, colecciones, productos, presentaciones especiales
│   │   └── admin/                # datos semilla para el panel demostrativo
│   ├── lib/
│   │   ├── content/              # CAPA DE ACCESO: getBrand, getProducts, getMenus, getCourses…
│   │   │   ├── index.ts          # API pública (misma firma futura con Supabase)
│   │   │   └── local.ts          # implementación con datos locales
│   │   ├── whatsapp.ts           # buildWhatsAppUrl(brand, intent, params)
│   │   ├── calendar.ts           # utilidades de fechas y generación determinista de cursos demo
│   │   └── utils.ts              # cn, formatters (es-MX), slugify
│   ├── hooks/                    # useReveal, useMediaQuery, useDialog, useLockBody
│   ├── types/
│   │   └── content.ts            # Brand, Product, Category, Menu, MenuItem, Course, Service, GalleryItem…
│   └── styles/
│       └── globals.css           # @theme tokens, temas por marca, utilidades tipográficas, reduced-motion
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

### 2.3 Decisiones de arquitectura clave

**Rutas estáticas por marca, shell compartido.** Cada marca tiene su propio `page.tsx` para que la composición sea realmente distinta (requisito explícito), pero todas se envuelven en `BrandPage`, que aplica el tema (`data-brand`), breadcrumb, CTA final y botón flotante de WhatsApp. Se descartó un segmento `[slug]` dinámico porque un despachador de plantillas añade indirección sin beneficio en un demo de seis páginas. Cuando exista Supabase, los datos seguirán llegando por `lib/content`, así que las páginas no cambian.

**Capa de acceso a contenido (`lib/content`).** Todas las páginas piden datos con funciones asíncronas (`await getBrand('la-trufa')`), aunque hoy devuelvan datos locales de forma inmediata. Esto **facilita** la futura conexión con Supabase: las páginas y los componentes no conocen el origen de los datos. No se promete una sustitución de un solo archivo: la fase de producción requerirá además definir el esquema, ajustar tipos (p. ej. retirar `isDemo`, convertir `price` en un campo real, añadir `createdAt`/`updatedAt`), manejar estados de carga y error, y decidir caché y revalidación. Esos ajustes se documentan como pendientes de producción, no como parte del demo.

**Theming por marca con variables CSS.** `globals.css` define tokens globales (`--color-ink`, `--color-ivory`, `--color-accent`…). Cada marca redefine `--color-accent`, `--color-accent-soft` y `--color-surface-tint` bajo `[data-brand="la-trufa"]`. Los componentes compartidos usan solo tokens, por lo que se adaptan sin props de color.

**Imágenes con manifiesto.** `config/media.ts` mapea slots con nombre (`'la-trufa.hero'`, `'agatha.product.1'`) a una ruta en `/public/media` o a un placeholder art-directed. `SmartImage` resuelve el slot: si hay archivo, usa `next/image`; si no, renderiza `MediaPlaceholder` (superficie cálida con textura sutil, etiqueta discreta y proporción correcta). Reemplazar una fotografía = soltar un archivo y actualizar una línea.

**WhatsApp configurable y honesto.** `config/whatsapp.ts` contiene `{ 'la-trufa': null, … }`. `buildWhatsAppUrl` devuelve una URL `wa.me` solo si hay número; `WhatsAppButton` abre `WhatsAppDemoDialog` cuando no lo hay, mostrando el mensaje contextual que se enviaría y la leyenda "Número pendiente de configuración". Ningún enlace activo de terceros en el demo.

**Marcadores de contenido provisional, centralizados.** Un único componente `DemoBadge` con tres variantes (`inline`, `section`, `corner`) y un `DemoNotice` en el footer. Regla: un badge por módulo de catálogo/menú/calendario, no por elemento.

**Administrador aislado mediante grupos de rutas.** En Next.js un layout hijo no elimina lo que renderiza el layout padre, por lo que colocar header y footer en el layout raíz haría que el administrador los heredara. Para evitarlo, el layout raíz (`app/layout.tsx`) contiene únicamente `<html>`, `<body>`, fuentes y metadata base; el header, footer y skip link viven en `app/(site)/layout.tsx`, y el administrador vive en `app/(admin)/demo/admin/layout.tsx` con su propio `AdminShell`. Los grupos `(site)` y `(admin)` no afectan a las URL. El estado del admin se mantiene en memoria con `useReducer` dentro de un proveedor montado en ese layout, con botón "Restablecer demo" y toast "Cambio simulado". Sin `localStorage`: los cambios desaparecen al recargar, coherente con "local, reversible y simulado". Criterio de aceptación: ninguna ruta bajo `/demo/admin` muestra navegación pública.

**Renderizado.** Las páginas públicas se prerenderizan de forma estática (SSG) en `next build`. Son client components únicamente: navegación móvil, selector de marcas, diálogos, tabs de menús, filtros de catálogo, galería/lightbox, botones WhatsApp, el módulo de cursos y todo el admin. Un client component también se prerenderiza en el servidor, así que cualquier dato que dependa de la fecha actual **no** puede calcularse durante el render inicial sin quedar congelado en el build o provocar discrepancias de hidratación. El módulo de cursos resuelve esto con la estrategia descrita en §7.6: el servidor prerenderiza esqueletos y los datos se calculan en el navegador tras el montaje, a partir de una única fecha de referencia.

---

## 3. Mapa del sitio

```
/                                   Inicio
├── /marcas                         Nuestras marcas (vista editorial de las 6)
│   ├── /marcas/cesar-fuentes       César Fuentes · Gastronomía holística
│   ├── /marcas/la-trufa            La Trufa · Chocolates artesanales
│   ├── /marcas/hoja-santa          Hoja Santa · Restaurante
│   ├── /marcas/black-pimienta      Black Pimienta / Gastro Lab · Formación
│   ├── /marcas/camelia             Camelia · Artesanal de Querétaro
│   └── /marcas/agatha              Agatha · Galletería artesanal
├── /nosotros                       Nosotros (concepto del grupo, texto provisional)
├── /contacto                       Contacto (directorio de marcas + WhatsApp por marca)
├── /demo/admin                     Panel administrativo (vista conceptual)
│   ├── /demo/admin/marcas
│   ├── /demo/admin/productos
│   ├── /demo/admin/menus
│   ├── /demo/admin/servicios
│   ├── /demo/admin/cursos
│   ├── /demo/admin/galerias
│   └── /demo/admin/contacto
└── 404                             Página no encontrada con acceso a marcas
```

Anclas internas (`#catalogo`, `#menus`, `#calendario`, `#servicios`, `#galeria`) para navegación secundaria dentro de cada marca. Los enlaces desde "Nuestras experiencias" en Inicio apuntan a `/marcas?categoria=…` para resaltar marcas relacionadas.

### 3.1 Navegación global

- **Header** (sticky, se compacta al hacer scroll): wordmark MG · Inicio · Nuestras marcas (desplegable con las 6 marcas, giro y acento) · Nosotros · Contacto · botón "Explorar marcas". En móvil: hamburguesa → panel de pantalla completa con las marcas como lista principal.
- **Indicadores de ubicación**: enlace activo en header (`aria-current`), breadcrumb en páginas de marca (`Inicio / Nuestras marcas / La Trufa`), franja superior con acento de marca y `BrandMark` en el header al estar dentro de una marca, sub-navegación por anclas en marcas largas (Hoja Santa, Black Pimienta).
- **Footer** corporativo: wordmark, frase conceptual, columnas Marcas / Grupo / Contacto (campos pendientes), aviso discreto "Demo · contenido provisional", crédito TRINIUM.
- **Acceso al admin** solo desde el footer con enlace discreto "Vista demo del administrador", no desde el header.

---

## 4. Sistema de componentes

### 4.1 Primitivas (`components/ui`)

| Componente | Variantes / props | Notas |
|---|---|---|
| `Button` | `variant: primary \| secondary \| ghost \| link`, `size`, `icon`, `asChild` para `Link` | Altura mínima 44 px en móvil, `focus-visible` visible |
| `Badge` / `Chip` | `tone: neutral \| accent \| demo`; `Chip` seleccionable para filtros | |
| `Dialog` | sobre `<dialog>` nativo, `size: sm \| md \| full-mobile` | Bloquea scroll, cierra con Esc/backdrop, devuelve foco |
| `Tabs` | `role=tablist`, teclado ←/→ | Menús de Hoja Santa y vistas del calendario |
| `Field` | label, input/textarea/select (solo lectura o simulados) | Admin y contacto |
| `Eyebrow`, `Heading`, `Prose` | escala tipográfica fija | Evita tamaños ad hoc |
| `Divider`, `Skeleton`, `Toast` | | |

### 4.2 Layout (`components/layout`)

`Container` (ancho máx. 1440 px, gutters 16/24/40), `Section` (ritmo vertical `py-16 md:py-24 lg:py-32`, `tone: ivory | cream | ink`), `SiteHeader`, `MobileNav`, `BrandSwitcher`, `Breadcrumb`, `SiteFooter`, `SkipLink`.

### 4.3 Media (`components/media`)

`SmartImage` (slot → imagen o placeholder, `aspect`, `priority`), `MediaPlaceholder` (textura cálida, etiqueta discreta, proporción), `Gallery` (mosaico editorial de 2 a 7 piezas con `layout: mosaic | strip | masonry`), `Lightbox` (sobre `Dialog`).

### 4.4 Marca (`components/brand`)

- `BrandMark`: wordmark tipográfico provisional; acepta `logoSrc` cuando exista el SVG oficial. Variantes `header | hero | footer`.
- `BrandPage`: shell que aplica `data-brand`, breadcrumb, sub-nav por anclas, `BrandCTA` final y `StickyWhatsApp` (móvil).
- `BrandHero`: `layout: full | split | stacked | poster` para que cada marca tenga apertura distinta.
- `BrandIntro`: eyebrow + titular editorial + párrafo corto + imagen opcional.
- `BrandCTA`: bloque de cierre con mensaje contextual y `WhatsAppButton`.

### 4.5 Módulos de contenido (`components/modules`)

| Módulo | Usado en | Comportamiento |
|---|---|---|
| `catalog/*` | La Trufa, Camelia, Agatha | `CategoryFilter` (chips, scroll horizontal en móvil) → `ProductGrid` (`layout: editorial \| grid \| masonry`) → `ProductDialog` (imagen, nombre, descripción, notas, CTA WhatsApp con nombre del producto). Estado vacío: si una categoría no tiene productos, `ProductGrid` muestra "Sin productos en esta categoría (demo)" con botón "Ver todos", conservando la altura mínima del bloque |
| `menu/*` | Hoja Santa | `MenuSwitcher` (tabs para dos menús) → `MenuSection` (entradas, principales, postres, bebidas) → `MenuItemRow` (nombre, descripción; precio **opcional y oculto** en demo) |
| `courses/*` | Black Pimienta | `CourseCalendar` con `CalendarGrid` (escritorio/tablet) y `CalendarAgenda` (móvil: lista por día), navegación mes anterior/siguiente, `CourseDialog` (nombre, imagen, descripción, fecha, horario, duración, instructor opcional, CTA WhatsApp con nombre del curso), `UpcomingCourses` (próximos 5), `FeaturedCourses` |
| `services/*` | César Fuentes, Hoja Santa | `ServiceCards` (3 a 4 tarjetas con icono Lucide, no uniformes: una destacada) y `ServiceFeature` (bloque imagen + texto alternado) |
| `info/*` | Hoja Santa, Contacto | `PendingField` muestra "Pendiente de configuración" con icono en lugar de inventar datos |

### 4.6 Inicio (`components/home`)

`Hero`, `BrandUniverse` (cuadrícula editorial asimétrica), `ExperiencesGrid` (4 universos con marcas relacionadas), `Essence`, `ContactInvite`.

### 4.7 WhatsApp y demo

`WhatsAppButton` (`brand`, `intent`, `params`, `variant`), `WhatsAppDemoDialog`, `StickyWhatsApp`, `DemoBadge`, `DemoNotice`.

### 4.8 Administrador (`components/admin`)

`AdminShell` (sidebar + topbar con "Modo demostración"), `AdminSidebar`, `ModuleHeader`, `DataTable` (ordenable, con acciones Editar/Ocultar), `EditDrawer` (formulario simulado), `SimulatedSaveToast`, `ResetDemoButton`, `StatCard` (dashboard: totales por módulo).

---

## 5. Estructura de datos

### 5.1 Tipos (`types/content.ts`)

```ts
export type BrandSlug =
  | 'cesar-fuentes' | 'la-trufa' | 'hoja-santa'
  | 'black-pimienta' | 'camelia' | 'agatha';

export type ExperienceCategory =
  | 'experiencias' | 'restaurantes' | 'artesanal' | 'formacion';

export interface Brand {
  slug: BrandSlug;
  name: string;               // "La Trufa"
  eyebrow?: string;           // "Gastro Lab" para Black Pimienta
  category: string;           // "Chocolates artesanales"
  tagline: string;            // provisional
  description: string;        // provisional, 1–2 frases
  experienceCategories: ExperienceCategory[];
  theme: BrandTheme;          // acento, superficie, tinte
  heroSlot: MediaSlot;
  cardSlot: MediaSlot;
  ctaLabel: string;           // "Cotiza tu experiencia"
  modules: BrandModule[];     // ['services','gallery'] | ['catalog'] | ['menus','gallery'] …
  logo?: { src: string; alt: string };   // vacío en demo
  isDemo: true;
}

export interface MediaSlot { id: string; alt: string; aspect?: '16/9' | '4/5' | '1/1' | '3/2' | '21/9'; }

export interface Category { id: string; brand: BrandSlug; name: string; description?: string; order: number; }

export interface Product {
  id: string; brand: BrandSlug; categoryId: string;
  name: string; description: string; notes?: string[];
  media: MediaSlot; featured?: boolean;
  price?: null;               // existe para producción; nunca se muestra en demo
  isDemo: true;
}

export interface Menu { id: string; brand: BrandSlug; name: string; description?: string; sections: MenuSection[]; }
export interface MenuSection { id: string; name: string; items: MenuItem[]; }
export interface MenuItem { id: string; name: string; description?: string; tags?: ('vegetariano' | 'vegano' | 'sin gluten')[]; price?: null; }

export interface Course {
  id: string; brand: 'black-pimienta';
  name: string; description: string; media: MediaSlot;
  date: string;               // ISO yyyy-mm-dd
  startTime: string; endTime: string;   // "10:00" / "14:00"
  durationLabel: string;      // "4 horas"
  instructor?: string;        // ficticio marcado como ejemplo, o ausente
  level?: 'inicial' | 'intermedio' | 'avanzado';
  featured?: boolean;
  isDemo: true;
}

export interface Service { id: string; brand: BrandSlug; name: string; description: string; icon: string; media?: MediaSlot; featured?: boolean; }
export interface GalleryItem { id: string; brand: BrandSlug; media: MediaSlot; caption?: string; span?: 'wide' | 'tall' | 'square'; }

export interface ContactInfo {
  brand: BrandSlug | 'mg';
  whatsapp: string | null;    // null = pendiente de configuración
  email?: string | null; address?: string | null; hours?: string | null;
  social?: Partial<Record<'instagram' | 'facebook' | 'tiktok', string | null>>;
}
```

### 5.2 Configuración (`src/config`)

- `site.ts`: nombre del sitio, descripción provisional, navegación principal, columnas de footer, metadata base, URL canónica placeholder, créditos.
- `brands.ts`: arreglo `BRANDS: Brand[]` con orden editorial, más `getBrandBySlug`.
- `whatsapp.ts`:
  ```ts
  export const WHATSAPP_NUMBERS: Record<BrandSlug | 'mg', string | null> = {
    mg: null, 'cesar-fuentes': null, 'la-trufa': null, 'hoja-santa': null,
    'black-pimienta': null, camelia: null, agatha: null,
  };
  export const WHATSAPP_TEMPLATES = {
    general:  (brand) => `Hola, quiero información sobre ${brand}.`,
    services: (brand) => `Hola, quiero información sobre los servicios de ${brand}.`,
    product:  (brand, product) => `Hola, me interesa ${product} de ${brand}.`,
    menu:     (brand) => `Hola, quisiera consultar el menú de ${brand}.`,
    course:   (brand, course) => `Hola, deseo información sobre el curso ${course}.`,
    quote:    (brand) => `Hola, quiero cotizar una experiencia con ${brand}.`,
    special:  (brand) => `Hola, quiero hacer un pedido especial con ${brand}.`,
  };
  ```
- `media.ts`: `MEDIA: Record<string, { src?: string; placeholder: PlaceholderStyle; credit?: string }>`.
- `theme.ts`: paleta y tokens por marca en TS (espejo de `globals.css`) para usarlos en admin y placeholders.

### 5.3 Datos demo (`src/content`)

- Un archivo por marca exportando `brandContent` tipado: intro, filosofía, servicios, categorías, productos (4–6), menús (2 para Hoja Santa, 4 secciones cada uno, 3–5 platillos por sección), galería (5–7 slots), pedidos especiales, presentaciones especiales, historia artesanal.
- Todos los textos son provisionales: tono editorial, sin cifras, sin fechas de fundación, sin premios, sin ubicaciones.
- `black-pimienta.ts` exporta **plantillas de cursos** (8 a 10: nombres, descripciones, duraciones, niveles, imagen). No contiene fechas. `lib/calendar.ts` expone `generateCourses(referenceDate, monthsBefore = 2, monthsAfter = 2)`, que distribuye las plantillas de forma **determinista** (semilla = `yyyy-mm` de cada mes) sobre cinco meses: el de referencia, dos anteriores y dos posteriores, ~15 cursos por mes en distintos días y horarios. El mismo mes produce siempre los mismos cursos, independientemente de cuándo se consulte. La fecha de referencia y el momento de cálculo se definen en §7.6.
- Nombres de instructores: ficticios y marcados como ejemplo, o bien "Instructor por confirmar".

### 5.4 Capa de acceso (`lib/content`)

```ts
getBrands(): Promise<Brand[]>
getBrand(slug): Promise<Brand | null>
getBrandContent(slug): Promise<BrandContent>
getProducts(slug, categoryId?): Promise<Product[]>
getCategories(slug): Promise<Category[]>
getMenus(slug): Promise<Menu[]>
getCourses(range: { from: string; to: string }): Promise<Course[]>
getUpcomingCourses(limit): Promise<Course[]>
getServices(slug): Promise<Service[]>
getGallery(slug): Promise<GalleryItem[]>
getContact(brand | 'mg'): Promise<ContactInfo>
```

Las firmas anticipan un esquema plausible en Supabase (tablas `brands`, `categories`, `products`, `menus`, `menu_items`, `courses`, `services`, `gallery_items`, `contacts`; imágenes en Storage con la misma convención de slots). `getCourses` y `getUpcomingCourses` reciben la fecha de referencia como argumento explícito; nunca leen `Date.now()` internamente, para que el momento de cálculo lo decida quien llama (§7.6). El mapeo y los ajustes pendientes de producción se documentarán en README como "Siguiente paso técnico".

---

## 6. Dirección visual

### 6.1 Concepto

**"Mesa editorial."** Una revista gastronómica contemporánea: papel marfil, tinta carbón, mucho aire, fotografía grande, titulares serif con carácter y textos de apoyo sans limpios. La calidez viene del color y la textura, no de efectos. Cada marca cambia el acento y la composición, como secciones distintas de la misma publicación.

### 6.2 Paleta provisional

| Token | Nombre | Hex | Uso |
|---|---|---|---|
| `--color-ivory` | Marfil | `#F4EFE6` | Fondo principal |
| `--color-cream` | Crema | `#FBF8F2` | Superficies elevadas, tarjetas |
| `--color-sand` | Arena | `#E8DFD0` | Divisores, placeholders |
| `--color-ink` | Carbón | `#1E1C19` | Texto principal, secciones oscuras |
| `--color-ink-soft` | Carbón suave | `#4A463F` | Texto secundario |
| `--color-ink-muted` | Carbón apagado | `#655E53` | Metadatos y eyebrows **sobre superficies claras** |
| `--color-stone` | Piedra | `#8B8478` | Bordes, iconos decorativos, placeholders; metadatos **solo sobre `ink`** |
| `--color-olive` | Verde olivo | `#5F6B45` | Acento corporativo MG (texto y fondos) |
| `--color-olive-deep` | Olivo profundo | `#3F4A2E` | Hover, fondos de énfasis |
| `--color-copper` | Cobre | `#B5703E` | Acento decorativo: líneas, iconos, texto grande (≥ 24 px) |
| `--color-copper-deep` | Cobre profundo | `#8F5126` | Texto pequeño en cobre y fondo de botones con texto crema |
| `--color-terracotta` | Terracota | `#A4503A` | Acento cálido puntual, texto grande o fondos |

Reglas: sin gradientes salvo un velo lineal sutil sobre fotografías para legibilidad del texto; saturación contenida. Secciones oscuras (`ink`) solo como contrapunto: esencia en Inicio, CTA finales, footer.

**Combinaciones de texto/fondo aprobadas (contraste calculado con la fórmula WCAG 2.1; mínimo 4.5:1 en texto normal, 3:1 en texto grande ≥ 24 px o ≥ 19 px en negrita).** Solo estas combinaciones se usan para texto; cualquier otra requiere verificación y registro en esta tabla.

| Fondo | Texto | Contraste aprox. | Uso permitido |
|---|---|---|---|
| Marfil `#F4EFE6` / Crema `#FBF8F2` | Carbón `#1E1C19` | 14.8:1 | Cualquier texto |
| Marfil / Crema | Carbón suave `#4A463F` | 8.2:1 | Texto secundario |
| Marfil / Crema | Carbón apagado `#655E53` | 5.6:1 | Metadatos, eyebrows, captions |
| Marfil / Crema | Verde olivo `#5F6B45` | 5.0:1 | Enlaces, eyebrows de acento |
| Marfil / Crema | Cobre profundo `#8F5126` | 5.4:1 | Enlaces y textos en cobre |
| Marfil / Crema | Cobre `#B5703E` | 3.4:1 | **Solo texto grande** (titulares, cifras display) |
| Marfil / Crema | Piedra `#8B8478` | 3.2:1 | **Prohibido como texto.** Solo bordes, iconos decorativos y placeholders |
| Cobre profundo `#8F5126` | Crema `#FBF8F2` | 5.9:1 | Botones primarios |
| Olivo profundo `#3F4A2E` | Crema `#FBF8F2` | 8.9:1 | Botones y fondos de énfasis |
| Carbón `#1E1C19` | Marfil / Crema | 14.8:1 | Texto principal en secciones oscuras |
| Carbón `#1E1C19` | Arena `#E8DFD0` | 12.9:1 | Texto secundario en secciones oscuras |
| Carbón `#1E1C19` | Piedra `#8B8478` | 4.6:1 | Metadatos y eyebrows en secciones oscuras |
| Carbón `#1E1C19` | Cobre `#B5703E` | 4.3:1 | **Solo texto grande** y líneas decorativas |
| Fotografía con velo | Crema | ≥ 4.5:1 | El velo (carbón al 55–70 %) se ajusta por slot hasta alcanzar el mínimo; se verifica sobre la zona del texto |

Criterio de aceptación: en la pasada final (§8.3) se muestrean con la herramienta de contraste de DevTools los eyebrows, captions, metadatos del calendario, filas de menú y textos sobre fotografía; ninguno por debajo de 4.5:1.

### 6.3 Acento por marca (provisional, sustituible por manual de marca)

Cada marca define dos tokens: `--color-accent` (decorativo: fondos, líneas, iconos, texto grande, hover) y `--color-accent-text` (versión oscurecida con contraste ≥ 4.5:1 sobre marfil, usada en enlaces, eyebrows, chips activos y botones con texto crema). Los componentes compartidos usan `accent-text` para cualquier texto pequeño y `accent` para el resto.

| Marca | `--color-accent` | `--color-accent-text` | Carácter de composición |
|---|---|---|---|
| César Fuentes | Olivo profundo `#3F4A2E` | `#3F4A2E` (8.2:1) | Amplio, ceremonioso, imágenes panorámicas |
| La Trufa | Cacao `#4A2E25` | `#4A2E25` (10.7:1) | Oscuro y envolvente, producto en primer plano |
| Hoja Santa | Verde hoja `#3E5A3C` | `#3E5A3C` (6.7:1) | Fresco, menús tipográficos, mucho marfil |
| Black Pimienta | Ámbar pimienta `#C4853A` | `#7D5119` (6.0:1) | Técnico, retícula marcada, calendario protagonista |
| Camelia | Terracota rosada `#B9705E` | `#8A4A3A` (5.9:1) | Artesanal, texturas, mosaico de productos |
| Agatha | Miel `#C79A55` | `#7A5A22` (5.5:1) | Dulce, ligero, tarjetas redondeadas, colecciones |

Los contrastes de §6.2 y de esta tabla se calcularon con la fórmula de luminancia relativa de WCAG 2.1 sobre marfil `#F4EFE6`; se confirman en la Fase B con la herramienta de DevTools antes de fijar los tokens definitivos en `globals.css`.

### 6.4 Tipografía (vía `next/font/google`, autoalojada)

- **Titulares:** `Fraunces` (serif editorial con ejes ópticos; pesos 300–600, cursiva para énfasis). Alternativa: `Cormorant Garamond`.
- **Texto y UI:** `Manrope` (sans geométrica cálida, excelente en tamaños pequeños). Alternativa: `Inter`.
- Escala fluida con `clamp()`:

| Rol | Móvil → Escritorio | Fuente / peso | Interlineado |
|---|---|---|---|
| Display | 40 → 88 px | Fraunces 300 | 1.0 |
| H1 | 34 → 64 px | Fraunces 400 | 1.05 |
| H2 | 28 → 44 px | Fraunces 400 | 1.1 |
| H3 | 22 → 28 px | Fraunces 500 | 1.2 |
| Eyebrow | 13 px fijo, mayúsculas, tracking 0.12em | Manrope 600 | 1 |
| Body | 16 → 18 px | Manrope 400 | 1.6 |
| Small | 14 px | Manrope 400/500 | 1.5 |

Tamaño mínimo de texto: **14 px**, con una única excepción declarada: el `Eyebrow` a 13 px, siempre en mayúsculas, peso 600, tracking amplio y con color de la tabla de combinaciones aprobadas (§6.2). Ningún otro texto, incluidas captions, píldoras del calendario y metadatos del admin, baja de 14 px.

Párrafos limitados a 60–70 caracteres por línea (`max-w-prose`). Nunca más de 3 párrafos cortos seguidos sin un elemento visual.

### 6.5 Retícula, espaciado y forma

- Contenedor 1440 px; retícula de 12 columnas en escritorio, 6 en tablet, 4 en móvil.
- Ritmo vertical de secciones: 64 / 96 / 128 px.
- Radios: 4 px en elementos de UI, 12–20 px en tarjetas de producto (Agatha y Camelia más suaves; Black Pimienta casi recto).
- Sombras mínimas; la profundidad se logra con cambios de superficie (`ivory` → `cream`) y líneas finas.
- Composiciones asimétricas: hero con imagen a sangre y texto desplazado; cuadrícula del "Universo MG" con una tarjeta grande 2×2, dos verticales y tres horizontales.

### 6.6 Fotografía y placeholders

- Prioridad: fotografía grande, bien recortada (`object-position` cuidada por slot), con proporciones definidas por módulo.
- Fuente del demo: imágenes ilustrativas con licencia libre de uso (Unsplash License o equivalente), descargadas a `/public/media` y registradas en `docs/CREDITS.md` con la nota "No representan los productos reales de Manta Group". Se seleccionarán en Fase B con criterio de arte: luz natural, tonos cálidos, sin marcas visibles.
- Si un slot no tiene imagen: `MediaPlaceholder` con superficie `sand` o acento al 10 %, textura de grano sutil (SVG inline), etiqueta pequeña (p. ej. "Fotografía de producto · pendiente"). Nunca un gris plano.

### 6.7 Movimiento y microinteracciones

- Revelado al entrar en viewport: opacidad + 12 px de desplazamiento, 500 ms, `ease-out`, una sola vez.
- Hover en tarjetas: zoom de imagen 1.03 en 600 ms, subrayado animado en enlaces, flecha que se desplaza 4 px.
- Header que se compacta y cambia a fondo marfil translúcido al hacer scroll.
- Transiciones de diálogos y panel móvil: 200–250 ms.
- Todo bajo `@media (prefers-reduced-motion: reduce)`: sin desplazamientos ni zoom, solo cambios de opacidad instantáneos.
- Sin parallax, sin cursores personalizados, sin partículas.

### 6.8 Accesibilidad

Skip link, landmarks (`header/nav/main/footer`), encabezados jerárquicos, `focus-visible` con anillo de 2 px en acento, objetivos táctiles ≥ 44 px, `aria-current="page"`, diálogos con `aria-labelledby`, tabs con roles ARIA y teclado, calendario navegable por teclado (grid con `aria-label` por día), `alt` descriptivo en imágenes y `alt=""` en decorativas, contraste AA verificado sobre fotografías mediante velo.

---

## 7. Diseño de páginas

### 7.1 Inicio

1. **Hero** (`layout: full`): imagen a sangre con velo inferior, wordmark MG, eyebrow "Manta Group", titular "Experiencias que inspiran. Marcas que cuentan historias." (propuesta), subtítulo de una línea, botón "Descubre nuestras marcas" (ancla al Universo MG) y botón fantasma "Conoce al grupo". En móvil el texto se alinea abajo para leerse sobre la zona menos ocupada de la imagen.
2. **Universo MG**: cuadrícula editorial asimétrica de 6 tarjetas fotográficas (una 2×2, dos verticales, tres apaisadas; en móvil, alternancia de alturas). Cada tarjeta: imagen, nombre (`BrandMark` pequeño), giro, descripción de una línea, enlace "Explorar". La tarjeta adopta el acento de su marca en hover/focus.
3. **Nuestras experiencias**: 4 bloques (Experiencias gastronómicas, Restaurantes y sabores, Productos artesanales, Formación gastronómica) en formato lista editorial numerada con imagen lateral; cada uno enlista las marcas relacionadas como chips enlazadas.
4. **Nuestra esencia**: sección oscura (`ink`), titular serif, 2 párrafos provisionales sobre el concepto de grupo (sin valores ni historia no confirmados), enlace a Nosotros.
5. **Contacto**: bloque de cierre con dos caminos: "Escribe al grupo" (WhatsApp MG, estado demo) y "Explora una marca" (selector compacto de las 6).

### 7.2 Nuestras marcas (`/marcas`)

Lista editorial de las 6 marcas en filas alternadas imagen/texto, con filtro por universo (`?categoria=`) que resalta las relacionadas. Cada fila incluye giro, descripción, módulos disponibles (p. ej. "Catálogo · Pedidos especiales") y CTA.

### 7.3 Páginas de marca

| Marca | Hero | Secuencia de secciones | Rasgo diferencial |
|---|---|---|---|
| **César Fuentes** | `full` panorámico, titular grande, CTA "Cotiza tu experiencia" | Intro + filosofía (texto a dos columnas) → Servicios (4 tarjetas, 1 destacada) → Catering y eventos (`ServiceFeature` alternado ×2) → Galería mosaico → CTA | Tono ceremonioso, el más "editorial" de todos |
| **La Trufa** | `split` oscuro cacao, producto hero a la derecha | Presentación breve → Catálogo (chips de categoría + cuadrícula de 5 productos, modal de detalle) → Pedidos especiales (lista de ocasiones y CTA) → CTA | Fondo oscuro y producto como joya |
| **Hoja Santa** | `poster` con titular sobre imagen y sub-nav de anclas | Concepto → Menús (tabs: dos menús, secciones tipográficas, sin precios) → Galería de platillos (strip horizontal con scroll en móvil) → Servicios complementarios (3 tarjetas) → Ubicación y horarios (`PendingField`) → CTA | Menú legible como carta impresa |
| **Black Pimienta / Gastro Lab** | `stacked` sobre carbón, eyebrow "Gastro Lab" | Presentación del laboratorio → Cursos destacados (3 tarjetas horizontales) → Calendario mensual (grid/agenda + navegación) → Próximos cursos (lista) → CTA informativo | Calendario como centro de la página; retícula técnica |
| **Camelia** | `split` con textura artesanal | Presentación → Categorías (tiles) → Catálogo visual masonry (6 productos) → Historia y valor de lo artesanal (texto + imagen, provisional) → Galería → CTA | Sensación de taller, mosaico irregular |
| **Agatha** | `full` luminoso, tono miel | Presentación breve → Colecciones (3 tiles) → Catálogo (grid de 6 galletas con tarjetas redondeadas) → Presentaciones especiales (3 tarjetas) → Galería → CTA pedidos | La más ligera sin perder elegancia |

Todas comparten: breadcrumb, `StickyWhatsApp` en móvil (aparece tras el hero), bloque "Otras marcas del grupo" antes del footer (3 marcas sugeridas) para reforzar la navegación fluida entre marcas.

### 7.4 Nosotros

Hero tipográfico sin imagen (solo marfil y serif), texto provisional sobre el concepto de ecosistema, módulo "Seis marcas, una misma visión" con las 6 marcas en línea, bloque de cierre hacia contacto. Sin historia, cifras ni valores no confirmados.

### 7.5 Contacto

Directorio por marca: tarjeta por marca con `BrandMark`, giro, botón WhatsApp contextual y campos `PendingField` (correo, dirección, horarios). Sin formulario funcional. Se incluye un formulario **visual deshabilitado** con nota "Disponible en la versión final" solo si aporta a la presentación (decisión en Fase B).

### 7.6 Calendario de cursos: estrategia de datos e interacción

**Fecha de referencia y momento de cálculo (criterio único para las tres vistas).**

- **Zona horaria fija:** `America/Mexico_City`. "Hoy" se obtiene con `Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' })` (formato `yyyy-mm-dd`), nunca con la zona del navegador ni con la del servidor de build.
- **Dónde y cuándo se calcula:** en el navegador, **después del montaje**, dentro de un único `CoursesProvider` (React context) montado en la página de Black Pimienta. El servidor prerenderiza esqueletos para las tres vistas; al montar, el proveedor calcula una sola vez `referenceDate` y llama a `generateCourses(referenceDate)`. Así los datos nunca quedan congelados en el build ni se producen discrepancias de hidratación. Coste aceptado: un breve estado de carga (< 100 ms) y que el contenido de los cursos no esté en el HTML estático, irrelevante en un demo.
- **Un solo origen para las tres vistas:** `FeaturedCourses`, `CourseCalendar` y `UpcomingCourses` leen del mismo proveedor. `Featured` = los 3 cursos marcados `featured` cuya fecha sea ≥ hoy; `Upcoming` = los 5 cursos con fecha ≥ hoy ordenados por fecha y hora; el calendario muestra todos. Si hoy es el último día del mes, "próximos" cruza al mes siguiente de forma natural porque el rango generado lo cubre.
- **Meses con datos = meses navegables:** cinco meses, de referencia −2 a referencia +2. Los botones anterior/siguiente se deshabilitan en los límites, de modo que nunca se muestra un mes sin datos. La frase "sin cursos programados" solo aparece en un día concreto vacío dentro de un mes con datos.
- **Determinismo:** cada mes se genera con semilla `yyyy-mm`, por lo que el mismo mes muestra los mismos cursos sin importar en qué fecha se consulte el demo. El mes de referencia siempre contiene cursos tanto anteriores como posteriores a hoy, para que el calendario se vea "vivo" y "próximos" nunca esté vacío.
- **Comprobación de cambio de mes y año sobre el mismo build:** `CoursesProvider` acepta una fecha de referencia alternativa leída en el cliente desde el parámetro `?hoy=yyyy-mm-dd` (solo en el navegador, sin volver dinámica la página; se ignora si es inválida). Casos obligatorios en §8.3: `?hoy=` en el último día de un mes, en el primer día del siguiente, en diciembre y en enero del año siguiente, verificando que calendario, destacados y próximos coinciden entre sí en cada caso. El parámetro queda documentado en README como herramienta de prueba del demo.

**Interacción.**

- Encabezado: mes y año, botones anterior/siguiente (deshabilitados en los límites del rango), botón "Hoy", toggle Mes/Agenda (en móvil, Agenda por defecto).
- **Vista mes** (≥ 768 px): grid de 7 columnas; cada día muestra hasta 2 cursos como píldoras (14 px mínimo) con hora y "+N"; clic abre `CourseDialog` o, con varios, un popover-lista.
- **Vista agenda** (móvil): lista por día con fecha en columna fija y tarjetas compactas (nombre, horario, duración, instructor); scroll vertical, "Ir a hoy".
- `CourseDialog`: imagen, nombre, nivel, fecha larga en español, horario, duración, instructor (o "por confirmar"), descripción, CTA "Solicitar información" con mensaje `course`.
- Teclado: flechas entre días, Enter abre, Esc cierra; `aria-live` para cambios de mes.

### 7.7 Administrador demostrativo (`/demo/admin`)

- **Dashboard**: aviso superior "Vista demostrativa · sin guardado real", 7 `StatCard` (marcas, productos, menús, servicios, cursos, galerías, contactos), accesos rápidos, "Próximos cursos" y "Últimos cambios simulados".
- **Módulos** (uno por ruta), todos con el mismo patrón: `ModuleHeader` (título, descripción, filtro por marca, botón "Nuevo" simulado) + `DataTable` + `EditDrawer`.
  - Marcas: nombre, giro, acento, estado, enlace público.
  - Productos: filtro por marca y categoría, imagen, nombre, categoría, destacado, visible.
  - Menús: Hoja Santa, dos menús con secciones y platillos reordenables (simulado).
  - Servicios: César Fuentes y Hoja Santa.
  - Cursos: tabla + vista de calendario reducida, alta simulada con fecha, horario, duración, instructor.
  - Galerías: cuadrícula de slots por marca, botón "Reemplazar imagen" simulado.
  - Información de contacto: número de WhatsApp por marca con estado "Pendiente", correo, dirección, horarios, redes.
- Sin login: una pantalla de entrada decorativa con botón "Entrar al demo" deja claro que no hay autenticación.

**Modelo de estado y resultado visible de cada acción simulada.**

- Un único `AdminProvider` (`useReducer`) montado en `app/(admin)/demo/admin/layout.tsx` contiene una copia de los datos semilla de todos los módulos. El estado **se conserva al navegar entre módulos** dentro del admin (es el mismo árbol de React) y **se pierde al recargar o salir** al sitio público. Un banner permanente lo indica.
- Cada acción produce un cambio visible inmediato en la tabla o cuadrícula, un toast "Cambio simulado · no persistente" y una entrada en "Últimos cambios simulados" del dashboard.

| Acción | Dónde | Resultado visible |
|---|---|---|
| **Nuevo** | Productos, Cursos, Servicios | Abre `EditDrawer` vacío; al "Guardar" se añade una fila al inicio con badge "Nuevo (demo)" y el contador del dashboard aumenta |
| **Editar** | Todos los módulos | Abre `EditDrawer` con los valores actuales; al "Guardar" la fila refleja los cambios y muestra badge "Editado" |
| **Ocultar / Mostrar** | Marcas, Productos, Cursos, Servicios | Alterna el estado; la fila se atenúa y el badge cambia a "Oculto"; el contador "visibles" del dashboard se actualiza |
| **Reordenar** | Menús (secciones y platillos), Categorías | Botones subir/bajar (sin drag-and-drop); el orden cambia en la lista al instante |
| **Reemplazar imagen** | Galerías, Productos | Abre un diálogo con selector simulado de 3 placeholders; al elegir, el slot cambia de placeholder |
| **Cancelar** | Cualquier drawer | Cierra sin cambios y devuelve el foco al botón que lo abrió |
| **Restablecer demo** | Topbar, siempre visible | Diálogo de confirmación; al aceptar, el estado vuelve a los datos semilla en **todos** los módulos, los contadores vuelven al valor inicial y el registro de cambios se vacía |

- Los cambios del admin **no** afectan al sitio público (estados separados). Esta limitación se indica en el banner del admin y en README.
- Rutas administrativas inválidas (`/demo/admin/inventario`) muestran el 404 administrativo dentro del `AdminShell`, con enlace al dashboard; nunca el 404 público.

---

## 8. Estrategia responsive

### 8.1 Breakpoints y escenarios de prueba

| Escenario | Ancho de prueba | Tailwind | Decisiones |
|---|---|---|---|
| Móvil pequeño | 360 × 740 | base | 1 columna, gutter 16 px, tipografía en el extremo bajo del `clamp`, CTA de ancho completo, agenda en calendario |
| Móvil estándar | 390 × 844 / 414 × 896 | base | Igual, con tarjetas a 2 columnas en catálogos cuando el producto lo permita |
| Tablet | 768 × 1024 | `md` | 2–3 columnas, header completo con menú compacto, calendario en grid |
| Escritorio | 1280 × 800 y 1440 × 900 | `lg` / `xl` | Retícula completa, desplegable de marcas, galerías mosaico |
| Pantalla amplia | 1920 | `2xl` | Contenedor limitado a 1440; imágenes a sangre |

### 8.2 Reglas mobile-first

- **Una mano**: CTA principales y `StickyWhatsApp` en el tercio inferior; navegación móvil con items grandes (56 px) y cierre accesible desde abajo.
- **Imágenes**: proporciones por breakpoint (`4/5` en móvil, `16/9` o `21/9` en escritorio) y `object-position` por slot; `sizes` correctos en `next/image`.
- **Catálogos**: chips de categoría con scroll horizontal y degradado indicador; cuadrícula de 2 columnas en móvil; modal de producto a pantalla completa (`full-mobile`) con imagen arriba y CTA fijo abajo.
- **Menús**: tabs sticky bajo el header en móvil; secciones colapsables opcionales si el menú es largo.
- **Calendario**: agenda por defecto en móvil; grid solo desde tablet; píldoras con texto truncado y nombre completo accesible.
- **Textos**: nunca por debajo de 14 px, salvo la excepción declarada del `Eyebrow` a 13 px (§6.4); párrafos de máximo 65 caracteres; titulares con `text-balance`.
- **Header**: 64 px en móvil, 80 px en escritorio, compacto al hacer scroll.
- **Rendimiento**: imágenes WebP/AVIF vía `next/image`, `priority` solo en el hero, fuentes autoalojadas con `display: swap`, cero JS en secciones estáticas.

### 8.3 Verificación

Pruebas manuales en Chrome DevTools en los cinco escenarios, rotación en tablet, zoom 200 %, navegación por teclado completa, `prefers-reduced-motion` activado, Lighthouse móvil (metas orientativas: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95).

Además de la pasada general, se ejecutan y registran estos casos con resultado esperado:

| # | Caso | Pasos | Resultado esperado |
|---|---|---|---|
| V-01 | Aislamiento del admin | Abrir `/demo/admin` y cada módulo | No aparece header, footer ni skip link públicos; aparece `AdminShell` |
| V-02 | Ruta administrativa inválida | Abrir `/demo/admin/inventario` | 404 administrativo dentro del shell, con enlace al dashboard |
| V-03 | Ruta pública inválida | Abrir `/marcas/inexistente` | 404 público con header, footer y acceso a las seis marcas |
| V-04 | Calendario: cambio de mes | `/marcas/black-pimienta?hoy=<último día del mes>` y `?hoy=<primer día del siguiente>` | Calendario abre en el mes indicado; "Próximos" muestra 5 cursos con fecha ≥ hoy; "Destacados" solo futuros; sin cursos vencidos |
| V-05 | Calendario: cambio de año | `?hoy=<31 de diciembre>` y `?hoy=<1 de enero siguiente>` | Rango navegable cruza el año; fechas largas en español muestran el año correcto; las tres vistas coinciden |
| V-06 | Calendario: límites de rango | Navegar hasta −2 y +2 meses | Botón correspondiente deshabilitado; nunca se muestra un mes vacío |
| V-07 | Calendario: parámetro inválido | `?hoy=abc` | Se ignora y se usa la fecha real en `America/Mexico_City` |
| V-08 | Filtro de catálogo sin resultados | En un catálogo, elegir una categoría que (en datos demo) no tenga productos | Mensaje "Sin productos en esta categoría (demo)" con botón "Ver todos"; la cuadrícula no colapsa el layout |
| V-09 | Retorno del foco | Abrir `ProductDialog` con teclado, cerrar con Esc; repetir con `CourseDialog` y `WhatsAppDemoDialog`; abrir un diálogo desde otro (ficha de curso → diálogo WhatsApp) | El foco vuelve siempre al elemento que abrió cada diálogo; el scroll de fondo se restaura |
| V-10 | Tabs de menús por teclado | En Hoja Santa, enfocar tabs y usar ← → Home End | Cambia de menú; `aria-selected` correcto; el panel activo se anuncia |
| V-11 | WhatsApp sin número | Pulsar cualquier CTA de WhatsApp | Se abre el diálogo demo con el mensaje contextual correcto (marca, producto o curso); no se abre ninguna pestaña externa |
| V-12 | WhatsApp con número | Configurar temporalmente un número en `config/whatsapp.ts` | El CTA abre `wa.me` con el texto codificado; se revierte el cambio tras la prueba |
| V-13 | Admin: reset tras varias ediciones | Crear un producto, editar un curso, ocultar una marca, reordenar un menú; pulsar "Restablecer demo" | Todo vuelve a los datos semilla; contadores y registro de cambios en estado inicial |
| V-14 | Admin: persistencia entre módulos | Editar en Productos, navegar a Cursos y volver | El cambio sigue visible; al recargar la página, desaparece |
| V-15 | Contraste | Con DevTools, muestrear eyebrows, captions, píldoras del calendario, filas de menú y texto sobre fotografía | Ninguna muestra por debajo de 4.5:1 (3:1 en texto grande) |
| V-16 | Movimiento reducido | Activar `prefers-reduced-motion` | Sin desplazamientos ni zoom; el contenido aparece igualmente |
| V-17 | Navegación completa por teclado | Recorrer Inicio, una marca y el admin solo con Tab/Enter/Esc | Todo elemento interactivo es alcanzable y visible el `focus-visible`; el skip link funciona |
| V-18 | Compilación | `pnpm lint`, `pnpm tsc --noEmit`, `pnpm build` | Sin errores; todas las rutas listadas en la salida del build |

---

## 9. Estrategia de WhatsApp

1. Números centralizados en `config/whatsapp.ts`, todos `null` en el demo.
2. `buildWhatsAppUrl(brand, intent, params)` compone el mensaje con `WHATSAPP_TEMPLATES` y lo codifica para `https://wa.me/<número>?text=`.
3. `WhatsAppButton` recibe `brand` e `intent` (`general | services | product | menu | course | quote | special`) y parámetros (nombre de producto o curso).
   - Número configurado → enlace real en nueva pestaña con `rel="noopener"`.
   - Número `null` → `WhatsAppDemoDialog` con el mensaje que se enviaría, el nombre de la marca y la leyenda "Número de WhatsApp pendiente de configuración. En la versión final este botón abrirá la conversación directamente."
4. Cada marca puede tener número distinto; MG tiene el suyo para el bloque corporativo.
5. El admin muestra estos números en "Información de contacto" como campos editables simulados.

---

## 10. Orden de implementación (Fase B)

| # | Bloque | Alcance | Criterio de listo |
|---|---|---|---|
| 1 | **Base del proyecto** | `create-next-app` (TS, Tailwind, App Router, ESLint, `src/`), pnpm, Prettier, grupos de rutas `(site)` y `(admin)` con layout raíz mínimo, estructura de carpetas, `cn`, tipos, configs vacías, registro de versiones en README | `pnpm dev` y `pnpm build` sin errores; `/demo/admin` renderiza sin header público (V-01) |
| 2 | **Sistema visual y navegación** | `globals.css` con tokens, combinaciones aprobadas y temas por marca (`accent` + `accent-text`), fuentes, primitivas UI, `Container/Section`, header + nav móvil + selector de marcas, footer, breadcrumb, skip link, `useReveal`, 404 público y administrativo | Todas las rutas existen con contenido mínimo; navegación completa por teclado; contraste verificado en primitivas |
| 3 | **Página principal** | Hero, Universo MG, Experiencias, Esencia, Contacto; `SmartImage` + placeholders; `media.ts` | Inicio terminado y responsivo en los 5 escenarios |
| 4 | **Componentes reutilizables de marca** | `BrandPage`, `BrandHero` (4 layouts), `BrandIntro`, `BrandCTA`, `StickyWhatsApp`, `WhatsAppButton` + diálogo demo, `DemoBadge`, `Gallery` + `Lightbox`, `ServiceCards`, `PendingField` | Muestrario interno en una ruta temporal `/demo/ui` (se elimina al final) |
| 5 | **Páginas individuales** | César Fuentes, Camelia, Agatha primero (servicios/galería/catálogo simple), luego La Trufa, Hoja Santa, Black Pimienta | Seis páginas con composición distinta, breadcrumb y CTA funcionando |
| 6 | **Catálogos y menús** | `CategoryFilter`, `ProductGrid` (3 layouts), `ProductDialog`, `MenuSwitcher`, `MenuSection`, datos de La Trufa, Camelia, Agatha y los dos menús de Hoja Santa | Filtros y modales accesibles; tabs con teclado |
| 7 | **Calendario de cursos** | `lib/calendar.ts` (generación determinista por semilla de mes), `CoursesProvider` con fecha de referencia en `America/Mexico_City` y parámetro `?hoy=`, `CourseCalendar` grid + agenda, `CourseDialog`, `UpcomingCourses`, `FeaturedCourses` | Navegación de meses dentro del rango, apertura de fichas, legible en 360 px; casos V-04 a V-07 superados |
| 8 | **Administrador demostrativo** | Layout propio en `(admin)`, `AdminProvider`, dashboard, 7 módulos, `DataTable`, `EditDrawer`, acciones de la tabla de §7.7, 404 administrativo, reset | Ediciones simuladas visibles y reversibles; estado conservado entre módulos y perdido al recargar; casos V-13 y V-14 superados |
| 9 | **Nosotros, Contacto, 404, metadata** | Páginas restantes, `metadata` por ruta, OG placeholder, `sitemap` y `robots` básicos | Rutas completas del mapa del sitio |
| 10 | **Ajustes responsivos y pruebas** | Pasada completa en 5 escenarios, teclado, reduced-motion, Lighthouse, `pnpm lint` + `tsc` + `build`, revisión de textos provisionales y badges | Checklist del §12 completo |
| 11 | **Documentación** | `README.md`, `docs/DEPLOY_VERCEL.md`, `docs/MATERIALES_MG.md`, `docs/CREDITS.md`, comentarios en `config/` | Entregables 8–11 cubiertos |

Hitos de revisión sugeridos con TRINIUM: tras el bloque 3 (dirección visual aprobada antes de replicarla), tras el bloque 7 (funcionalidades públicas completas: seis marcas, catálogos, menús y calendario), tras el bloque 8 (administrador demostrativo) y tras el bloque 11 (entrega).

---

## 11. Riesgos y simplificaciones

| Riesgo / incertidumbre | Impacto | Mitigación en el demo |
|---|---|---|
| Sin logotipos oficiales | La identidad de cada marca se percibe menos | `BrandMark` tipográfico provisional con acento; punto único de reemplazo por SVG |
| Sin fotografía profesional | La foto es protagonista del diseño | Curaduría de imágenes libres con criterio de arte + placeholders art-directed; créditos documentados; aviso de que no representan productos reales |
| Sin textos definitivos | Riesgo de "inventar" la marca | Textos provisionales en tono editorial, sin datos duros; todo en `content/` para reemplazo |
| Tentación de inventar datos comerciales | Compromete credibilidad | Campos `null` + `PendingField`; precios omitidos; revisión final con checklist |
| Fecha de presentación desconocida | Calendario vencido | Cursos generados en el navegador tras el montaje, con fecha de referencia en `America/Mexico_City`, rango −2/+2 meses y semilla por mes (§7.6); verificable con `?hoy=` sobre el mismo build |
| Herencia del layout raíz en el admin | El admin mostraría header y footer públicos | Layout raíz mínimo y grupos de rutas `(site)` / `(admin)` (§2.3); caso V-01 |
| Tokens de color con contraste insuficiente | Textos pequeños por debajo de AA | Tabla de combinaciones aprobadas y token `accent-text` por marca (§6.2, §6.3); caso V-15 |
| Exceso de avisos "demo" | Ensucia la experiencia | Política: un badge por módulo, un aviso en footer, diálogo WhatsApp y banner en admin |
| Seis páginas "iguales" | Incumple la visión | 4 layouts de hero, 3 layouts de catálogo, orden de secciones distinto y acento propio |
| Tailwind v4 (sin `tailwind.config`) | Curva para el equipo | Tokens documentados en `globals.css` y espejados en `config/theme.ts` |
| Rendimiento con muchas imágenes | Lighthouse móvil bajo | `next/image`, `sizes` correctos, lazy por defecto, imágenes ≤ 1600 px de ancho |
| Admin que parezca "real" | Expectativa de persistencia | Pantalla de entrada decorativa, banner permanente, reset, toast en cada acción |
| Scope creep (formularios, reservas, carrito) | Retrasa el demo | Lista explícita de "no incluido" en README y en la propuesta |

**Simplificaciones aceptadas para esta fase**

- Rutas estáticas por marca en lugar de `[slug]` dinámico.
- Los cambios del admin no se reflejan en el sitio público (estado separado).
- Sin formulario de contacto funcional ni envío de correo.
- Sin internacionalización (solo español, `lang="es-MX"`).
- Sin modo oscuro global (las secciones oscuras son decisión editorial, no tema).
- Sin pruebas automatizadas; verificación manual + `lint` + `tsc` + `build`.
- Sin analítica ni cookies.

---

## 12. Checklist de calidad final (criterio de aceptación)

- [ ] Todas las rutas del §3 responden y la navegación entre ellas es fluida.
- [ ] `pnpm lint`, `pnpm tsc --noEmit` y `pnpm build` sin errores ni warnings relevantes.
- [ ] Cada botón ejecuta su acción dentro del alcance (navega, abre modal, abre diálogo demo de WhatsApp, cambia tab o mes).
- [ ] Seis páginas de marca visualmente distintas con base común.
- [ ] Catálogos de 4–6 productos en La Trufa, Camelia y Agatha con detalle en modal.
- [ ] Dos menús alternables en Hoja Santa, legibles en móvil.
- [ ] Calendario mensual navegable con ~15 cursos ilustrativos por mes y fichas completas.
- [ ] `/demo/admin` con 7 módulos, ediciones simuladas conforme a la tabla de acciones de §7.7 y reset que restaura todos los módulos.
- [ ] Ninguna ruta bajo `/demo/admin` muestra header, footer ni skip link públicos; rutas administrativas inválidas muestran el 404 administrativo.
- [ ] Calendario, cursos destacados y próximos cursos coinciden entre sí para cualquier fecha de referencia; verificado con `?hoy=` en cambio de mes y de año (V-04 a V-07).
- [ ] Todo texto usa una combinación de la tabla de §6.2 o un token `accent-text`; muestreo de contraste sin valores por debajo de 4.5:1 (V-15).
- [ ] Versiones exactas registradas en README y `pnpm-lock.yaml` incluido en la entrega.
- [ ] Ningún dato comercial inventado (direcciones, teléfonos, precios, horarios, certificaciones, testimonios, trayectoria).
- [ ] Ningún logotipo inventado; `BrandMark` provisional en uso.
- [ ] Marcadores de contenido provisional presentes y discretos.
- [ ] Números de WhatsApp centralizados, en `null`, con diálogo demostrativo.
- [ ] Navegación por teclado, `focus-visible`, `prefers-reduced-motion`, contraste AA.
- [ ] Revisado en 360, 390, 768, 1280 y 1440 px.
- [ ] README, guía de Vercel, lista de materiales y créditos entregados.

---

## 13. Entregables y documentación

| # | Entregable | Dónde |
|---|---|---|
| 1 | Demo navegable y responsivo | Proyecto Next.js en `C:\Claude\MG` |
| 2 | Página principal corporativa | `/` |
| 3 | Seis páginas de marca | `/marcas/*` |
| 4 | Catálogos ilustrativos | La Trufa, Camelia, Agatha |
| 5 | Dos menús demostrativos | Hoja Santa |
| 6 | Calendario mensual navegable | Black Pimienta |
| 7 | Vista conceptual del administrador | `/demo/admin` |
| 8 | Configuración para cambiar textos, imágenes, marcas y enlaces | `src/config/*` y `src/content/*`, documentado en README |
| 9 | README con instrucciones de ejecución | `README.md` |
| 10 | Instrucciones de publicación en Vercel (sin desplegar) | `docs/DEPLOY_VERCEL.md` |
| 11 | Lista de materiales a solicitar a MG | `docs/MATERIALES_MG.md` |

### 13.1 Materiales a solicitar a MG (borrador de la lista)

**Identidad**
- Logotipos de Manta Group y de las seis marcas en SVG (versiones principal, horizontal, monocroma, sobre fondo oscuro).
- Manuales de identidad o, en su defecto: paleta, tipografías con licencia, usos permitidos.
- Eslogan o mensaje corporativo oficial (si existe) y tono de voz deseado.

**Contenido corporativo**
- Texto de presentación del grupo, historia, misión, visión y valores confirmados.
- Textos de "Nosotros" y, si se desea, equipo directivo con fotografías autorizadas.

**Por marca**
- Descripción oficial, giro, propuesta de valor y textos de presentación.
- Fotografías profesionales (hero, productos, ambiente, equipo) en alta resolución con derechos de uso.
- Número de WhatsApp de atención, correo, dirección, horarios y redes sociales.
- César Fuentes: listado de servicios, tipos de eventos, proceso de cotización.
- La Trufa: catálogo completo (~20 productos) con categorías, nombres, descripciones, fotografías; política de pedidos especiales.
- Hoja Santa: los dos menús completos (secciones, platillos, descripciones, alérgenos, precios si se mostrarán), servicios complementarios, ubicación y horarios.
- Black Pimienta / Gastro Lab: calendario real de cursos, fichas (nombre, descripción, fecha, horario, duración, instructor, nivel, cupo si aplica), fotografías de cursos e instructores.
- Camelia: catálogo (~20 productos), categorías, texto sobre el origen artesanal en Querétaro.
- Agatha: catálogo (~20 galletas), colecciones, presentaciones especiales y temporadas.

**Legal y técnico**
- Aviso de privacidad y términos (si existen).
- Dominio(s) y acceso DNS; cuenta de Vercel; cuenta de Supabase (fase posterior).
- Responsable de contenidos que usará el administrador y frecuencia esperada de actualización.

---

## 14. Supuestos de trabajo

- Idioma del sitio: español (México). Formato de fechas `es-MX`.
- El demo se entrega como proyecto ejecutable localmente; la publicación en Vercel la realiza TRINIUM cuando lo decida.
- Las imágenes ilustrativas se eligen con licencia de uso libre y se documentan; se reemplazarán por fotografía real.
- "Black Pimienta / Gastro Lab" se trata como una sola marca con nombre principal "Black Pimienta" y eyebrow "Gastro Lab" (ajustable en `config/brands.ts`).
- Los precios no se muestran en ningún módulo del demo, aunque el tipo de dato los contempla.
- Toda decisión visual de este plan es provisional y se sustituirá con los manuales de marca.

---

## 15. Registro de revisión

**Revisión 1 (10 de noviembre de 2026).** Dictamen inicial: NO GO con 3 hallazgos mayores y 6 sugerencias. Cierre aplicado en esta versión del documento:

| Hallazgo | Cierre |
|---|---|
| M-01 · El admin heredaba header y footer del layout raíz | Layout raíz mínimo; grupos de rutas `(site)` y `(admin)` con layouts propios; 404 administrativo; criterio de aceptación y caso V-01 (§2.2, §2.3, §12) |
| M-02 · Calendario sin estrategia coherente de actualización | Fecha de referencia única en `America/Mexico_City`, cálculo en el navegador tras el montaje dentro de `CoursesProvider`, rango navegable igual al rango con datos (−2/+2), semilla por mes, parámetro `?hoy=` para probar cambio de mes y año sobre el mismo build, casos V-04 a V-07 (§2.3, §5.3, §5.4, §7.6, §8.3) |
| M-03 · Piedra `#8B8478` sobre marfil no alcanzaba AA | Nuevo token `--color-ink-muted #655E53` para metadatos y eyebrows; Piedra restringido a decorativo y a texto sobre `ink`; `--color-copper-deep` para texto y botones; tabla de combinaciones aprobadas; token `accent-text` por marca; caso V-15 (§6.2, §6.3) |
| S · Migración a Supabase presentada como sustitución de un archivo | Reformulada como arquitectura que facilita la migración, con ajustes pendientes enumerados (§2.3, §5.4) |
| S · Acciones del admin sin resultado definido | Tabla de acciones con resultado visible, modelo de estado entre módulos y alcance del reset (§7.7) |
| S · Stack con "última versión estable" | Versión fijada al iniciar, registro en README, versiones sin `^`, lockfile conservado, comprobación de compatibilidad con Node (§2.1, §10) |
| S · Verificación con pocos casos | 18 casos con pasos y resultado esperado (§8.3) |
| S · Eyebrow 12–13 px contra mínimo de 14 px | Eyebrow fijado en 13 px como única excepción declarada (§6.4, §8.2) |
| S · Hito "funcionalidad completa" antes del admin | Renombrado a "funcionalidades públicas completas" y añadido hito tras el bloque 8 (§10) |

*Fase A concluida con este documento, pendiente de nuevo dictamen. La Fase B inicia con el bloque 1 del §10 tras la aprobación de TRINIUM.*
