# CineMaster — Agent Guide

## Stack
- React 19, TypeScript 5.9, Tailwind CSS v4, Vite (rolldown-vite fork)
- Package manager: **pnpm** (not npm)
- Smooth scroll: Lenis (init in `src/main.tsx:8`)
- Routing: react-router-dom with `BrowserRouter`
- No test framework, no CI, no global state library

## Commands
```bash
pnpm dev        # dev server (HMR)
pnpm build      # tsc -b && vite build (project references)
pnpm lint       # eslint . (flat config)
pnpm preview    # vite preview
```

## TypeScript quirks
- `verbatimModuleSyntax` — use `import type` for type-only imports
- `erasableSyntaxOnly` — no enums, no `namespace`; use `const` objects instead
- `noUnusedLocals` + `noUnusedParameters` — strict linting, watch for unused vars
- Build uses `tsc -b` (project references: `tsconfig.app.json` + `tsconfig.node.json`)

## Tailwind v4
- Use `@import "tailwindcss"` in CSS (not `@tailwind base/components/utilities`)
- No `tailwind.config.js` — v4 uses CSS-first config
- Plugin loaded in `vite.config.ts` via `@tailwindcss/vite`

## Env vars (local `.env`, not committed)
```
VITE_API_KEY=   # TMDB API key
VITE_BASE_URL=  # https://api.themoviedb.org
```

## Architecture
- `src/main.tsx` → entry, sets up Lenis global smooth scroll
- `src/App.tsx` → router: `/` (Home), `/movie/:id` (MovieDetail), `*` (404)
- `src/hooks/useMovies.ts` → discover/search with infinite scroll (IntersectionObserver in `Home.tsx`), abort controller
- `src/hooks/useMoviesDetails.ts` → single movie fetch by id
- `src/hooks/movie.ts` → `Movie` interface (shared type)
- Components under `src/components/`, pages under `src/pages/`
- Styles: `src/styles/index.css` (global tailwind import), `src/styles/App.css`

## Conventions
- Components: default exports, functional, `type` props interface inline
- Routes: string paths, no route params beyond `:id`
- API: direct `fetch` to TMDB (no client lib)
- Sorting: `popularity.desc`, `vote_average.desc`, `release_date.desc`
- Genre ids: 28 (Action), 35 (Comedy), 27 (Horror), 16 (Animation) — hardcoded in `GenreFilters.tsx`
