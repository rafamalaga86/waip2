# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router pages, API routes, middleware.
- `src/components`, `src/hooks`, `src/lib`, `src/services`, `src/models`: UI, state, utilities, domain logic, and data models.
- `src/database`, `src/enums`, `src/types`: DB access helpers, shared enums, and TypeScript types.
- `prisma/`: Prisma schema, migrations, and `seed_data/`.
- `scripts/`: TypeScript scripts for data tasks (seed, cache, exports).
- `public/`: Static assets. `storage/` and `logs/`: local data and runtime logs.

## Build, Test, and Development Commands
- `npm run dev`: Start local Next.js dev server.
- `npm run build`: Production build.
- `npm start`: Serve the built app.
- `npm run lint`: Lint code with ESLint (Next core-web-vitals).
- `npm run seed:all` / `npm run seed:reset`: Seed or reset DB data.
- `npm run cache:flush`: Clear Mongo cache collections.
- Post-install: `prisma generate` runs automatically.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; LF line endings; final newline (`.editorconfig`).
- TypeScript-first; prefer explicit types at module boundaries.
- Imports: absolute from `src` where configured; group by external → internal.
- Components/hooks: `PascalCase` files in `src/components` and `src/hooks`.
- Variables/functions: `camelCase`; enums `PascalCase`; constants `UPPER_SNAKE_CASE`.
- Formatting: Prettier (`arrowParens: "avoid"`); run `npm run lint` before PRs.

## Testing Guidelines
- This repo does not yet include a unit test runner. If adding tests, co-locate as `*.test.ts`/`*.test.tsx` next to source and ensure they run in CI before merging. Keep DB-dependent tests isolated behind explicit flags.

## Commit & Pull Request Guidelines
- Commits: concise, imperative sentence (e.g., "Fix navbar overflow on mobile").
- Scope small, related changes together. Include schema or script updates in the same commit when relevant.
- PRs must include: clear description, before/after or screenshots for UI changes, steps to verify, and any related issues.
- Ensure `npm run lint && npm run build` pass; update `prisma/schema.prisma`, migrations, and `.env.dist` when changing data or config.

## Security & Configuration
- Copy `.env.dist` to `.env` and fill: `POSTGRES_URL`, `MONGO_DATABASE_URL`, IGDB keys, etc. Do not commit secrets.
- Prisma uses `POSTGRES_URL`; run `npx prisma migrate dev` when altering schema.
- Avoid logging secrets; prefer `src/lib/errors` helpers for safe error handling.
