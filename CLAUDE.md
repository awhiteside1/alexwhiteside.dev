# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for AlexWhiteside.dev. Built with Astro for static site generation with hybrid rendering, content sourced from both local collections and Hashnode's GraphQL API. Deploys automatically to Vercel from the `main` branch.

## Essential Commands

### Development
```bash
pnpm dev              # Start dev server
pnpm dev:network      # Start dev server with network access
```

### Building & Type Checking
```bash
pnpm build            # Full build: GraphQL codegen, type check, then build
gql.tada turbo        # Generate GraphQL types (runs as part of build)
astro check           # Type check Astro files
```

### Code Quality
```bash
pnpm lint             # Check code with Biome
pnpm lint:fix         # Auto-fix linting issues with Biome (includes --unsafe)
```

### Content Generation
```bash
pnpm plop             # Interactive content generator (uses .plop/ templates)
```

### Styling
```bash
pnpm prepare          # Generate Panda CSS artifacts (runs automatically on install)
```

## Architecture

### Tech Stack Core
- **Framework**: Astro 5 (static + SSR hybrid mode)
- **Styling**: Panda CSS + Tailwind CSS
- **GraphQL**: gql.tada for type-safe queries (no traditional codegen)
- **Content**: Astro content collections + Hashnode API
- **Deployment**: Vercel with ISR support

### Path Aliases
- `@*` → `src/*`
- `@styles/*` → `styled-system/*`

### Key Directories
- `src/hashnode/` - GraphQL client and queries for Hashnode API
  - `client.ts` - urql client configuration
  - `queries/` - gql.tada typed queries
  - `graphql/graphql-env.d.ts` - Generated TypeScript types from schema
  - `graphql/graphql-cache.d.ts` - gql.tada turbo cache
- `src/content/` - Astro content collections (work, awesome, skills, titles, sections)
  - `config.ts` - Collection schemas with Zod validation
- `src/pages/` - Astro routes (file-based routing)
- `src/components/` - Astro components
- `src/ui/` - React components
- `src/lib/` - Utility functions
- `.plop/` - Content generation templates
- `styled-system/` - Generated Panda CSS artifacts (don't edit directly)

### GraphQL with gql.tada

This project uses gql.tada for compile-time GraphQL type inference without traditional codegen. The schema is fetched from `https://gql.hashnode.com`.

**Important**: After modifying GraphQL queries, run `gql.tada turbo` to update the type cache. The TypeScript plugin provides intellisense but the turbo cache ensures types resolve correctly during builds.

Configuration in `tsconfig.json`:
```json
{
  "plugins": [{
    "name": "gql.tada/ts-plugin",
    "schema": "https://gql.hashnode.com",
    "tadaOutputLocation": "./src/hashnode/graphql/graphql-env.d.ts",
    "tadaTurboLocation": "./src/hashnode/graphql/graphql-cache.d.ts"
  }]
}
```

### Styling System

**Dual system**: Panda CSS (preferred for new components) and Tailwind CSS (legacy).

- Panda CSS generates artifacts in `styled-system/` on `pnpm install` (or manual `pnpm prepare`)
- Configuration in `panda.config.ts`
- Tailwind used primarily for existing components; avoid extending Tailwind usage
- Dark mode handled through class toggling (requires explicit dark: variants in Tailwind)

### Content Collections

Defined in `src/content/config.ts`:
- `work` - Work experience entries
- `awesome` - Curated resources/recommendations
- `skills` - Technical skills
- `titles` - Page titles with styling
- `sections` - Page section configurations

All use Zod schemas for validation. Use `pnpm plop` to generate new content interactively.

### Deployment

- **Vercel** (production): Auto-deploys from `main` branch with ISR enabled
- **Local Node**: Fallback adapter for non-Vercel environments
- ISR configuration in `astro.config.mjs` with 1-second expiration

### Environment Variables

Required in `.env`:
```
HASHNODE=<api_token>  # For Hashnode GraphQL API access
```

## Development Workflow Notes

### Adding GraphQL Queries
1. Write query using `graphql()` from `src/hashnode/graphql/index.ts`
2. Run `gql.tada turbo` to update type cache
3. Use typed result with full intellisense

### Creating Content
Use `pnpm plop` for guided content creation - it validates against collection schemas and generates files in the correct format.

### Styling New Components
Prefer Panda CSS patterns and utilities. Import from `@styles/` alias.

### Working with Blog Content
Blog posts are fetched from Hashnode API at build time. Local content collections are for portfolio/static content only.