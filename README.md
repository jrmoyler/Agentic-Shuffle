# AGENT SHUFFLE

AGENT SHUFFLE is a premium dark-mode visual intelligence platform for the Collective AI ecosystem. It imports the uploaded roster and overseer PDFs, normalizes the 20-division agent lattice, generates raster PNG illustrations, and exposes dashboard, directory, builder, outcome, synergy, overseer, division, and team-generator workflows.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Prisma
- SQLite for local development
- PostgreSQL-ready production model

No SVG assets or SVG charting libraries are used in the application UI. Charts are HTML/CSS primitives and generated illustrations are PNG files.

## Quick start

```bash
npm install
cp .env.example .env
npm run import:pdfs
npm run db:generate
npm run db:push
npm run seed
npm run dev
```

The PDF importer looks for uploaded PDFs in:

1. `PDF_UPLOAD_DIR`
2. `./uploads`
3. Cursor cloud upload storage

Expected source files:

- `Collective_AI_Master_Agent_Roster_FULL_8199.pdf`
- `CAI_Overseer_Ecosystem_Blueprint_v2_b3f8.pdf`

## Data pipeline

`scripts/import-pdfs.mjs` extracts:

- ZENITH overseer
- 20 divisions
- 20 division directors
- 600 specialist agents
- tool stacks
- creation platforms
- prompts
- inferred capabilities
- inferred use cases
- dependencies
- relationships
- 20 synergy nodes

It writes:

- `src/data/generated/catalog.json`
- `/public/agents/*.png`
- `/public/divisions/*.png`
- `/public/directors/*.png`

`prisma/seed.ts` loads the generated catalog into the normalized schema.

## Pages

- `/` - dashboard with statistics, charts, heat map, and simulation preview
- `/agents` - searchable/filterable/sortable directory with multiple view modes
- `/agents/[slug]` - agent detail profile
- `/divisions` - division explorer
- `/overseer` - ZENITH authority and routing view
- `/synergy` - synergy node explorer
- `/builder` - Agent Shuffle Builder with coverage, overlap, gaps, diversity, effectiveness, complexity, synergy, and Aegis risk
- `/outcomes` - animated outcome engine
- `/team-generator` - recommended stack generator

## API routes

- `GET /api/search?q=...`
- `POST /api/simulations`

Simulation request body:

```json
{
  "agentSlugs": ["blueprint-architect", "knowledge-keeper"]
}
```

## Database

The development schema uses SQLite:

```env
DATABASE_URL="file:./dev.db"
```

This repo uses Prisma 7 configuration via `prisma.config.ts` and the official SQLite driver adapter for local development. For production, provision PostgreSQL and use the same normalized model with Prisma's PostgreSQL datasource provider plus the official PostgreSQL adapter. Keep `DATABASE_URL` as the production connection string and run migrations in CI/CD.

## Verification

```bash
npm run import:pdfs
npm run db:generate
npm run typecheck
npm run lint
npm run build
```
