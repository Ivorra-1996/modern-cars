# AutoBids — Subasta de coches modernos

Frontend de una casa de subastas de autos, construido con React + Vite + TypeScript,
shadcn/ui y Tailwind CSS. Por ahora funciona íntegramente con datos mock (`src/data/cars.ts`);
no hay backend ni autenticación real todavía.

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/) para el ruteo
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para formularios
- [TanStack Query](https://tanstack.com/query) (listo para conectar a una API real)

## Requisitos

- Node.js 18+
- Yarn (gestor de paquetes del proyecto; ver `yarn.lock`)

## Comandos

```sh
yarn install    # instalar dependencias
yarn dev        # levantar el servidor de desarrollo
yarn build      # build de producción
yarn lint       # correr ESLint
yarn preview    # previsualizar el build de producción
```

## Estructura

- `src/pages/` — páginas ruteadas (home, detalle de auto, listados por estado, contenido estático)
- `src/components/` — componentes de UI del sitio; `src/components/ui/` es la librería shadcn
- `src/data/cars.ts` — datos mock de autos y helpers de filtrado (reemplazar por una API cuando haya backend)
