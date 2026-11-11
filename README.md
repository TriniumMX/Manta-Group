# Manta Group · Demo web corporativo multimarca

Prototipo comercial de alta fidelidad (TRINIUM). Ver [`PLAN_MG.md`](./PLAN_MG.md) para el plan completo.

> Estado: **Bloque 2 — Sistema visual y navegación** (bloque 1 completado).

## Ejecutar

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build
```

Entorno: Node 22, pnpm 9+.

## Versiones instaladas (fijadas sin `^`)

| Paquete | Versión |
|---|---|
| next | 16.4.6 |
| react / react-dom | 19.3.0 |
| typescript | 5.9.3 |
| tailwindcss | 4.3.3 |
| lucide-react | 1.71.0 |
| clsx | 2.1.1 |
| tailwind-merge | 3.7.0 |
| prettier | 3.9.10 |

`pnpm-lock.yaml` forma parte del repositorio.

> Nota: esta versión de Next.js trae un `AGENTS.md` que indica consultar `node_modules/next/dist/docs/` antes de escribir código, por posibles cambios respecto a versiones anteriores.

## Contribuir

Todo commit sigue la [convención de commits y atribución](./docs/COMMITS.md) (autor `Trinium MX`, coautores y push obligatorio).

## Estructura

Ver §2.2 de `PLAN_MG.md`. Rutas: grupo `(site)` (público) y `(admin)` (`/demo/admin`, sin header/footer públicos).

## Sistema visual (bloque 2)

- Tokens de color, tipografía y temas por marca en `src/styles/globals.css` (espejo en `src/config/theme.ts`). Cada marca define `--accent` (decorativo) y `--accent-text` (texto pequeño, ≥ 4.5:1 sobre marfil); se activan con `data-brand="<slug>"`.
- Escala tipográfica fija: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-eyebrow` (13 px, única excepción al mínimo de 14 px), `text-body`, `text-small`. Están registradas en `cn()` (`src/lib/utils.ts`) para que `tailwind-merge` no las confunda con colores.
- Primitivas en `src/components/ui`: `Button`, `Badge`/`Chip`, `Dialog` (sobre `<dialog>` nativo), `Tabs`, `Field`/`Input`/`Textarea`/`Select`, `Toast`, `Eyebrow`/`Heading`/`Prose`/`Divider`/`Skeleton`, `Reveal`.
- Navegación en `src/components/layout`: `SiteHeader` (con `BrandSwitcher` y `MobileNav`), `SiteFooter`, `Breadcrumb`, `SkipLink`, `Container`/`Section`, `PublicShell`.
- Las páginas de marca usan `BrandPlaceholderPage` de forma **temporal**; se sustituye en los bloques 4 y 5.
