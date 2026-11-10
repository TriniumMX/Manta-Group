# Manta Group · Demo web corporativo multimarca

Prototipo comercial de alta fidelidad (TRINIUM). Ver [`PLAN_MG.md`](./PLAN_MG.md) para el plan completo.

> Estado: **Bloque 1 — Base del proyecto**.

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

## Estructura

Ver §2.2 de `PLAN_MG.md`. Rutas: grupo `(site)` (público) y `(admin)` (`/demo/admin`, sin header/footer públicos).
