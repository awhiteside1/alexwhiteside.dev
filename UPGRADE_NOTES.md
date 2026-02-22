# Dependency Upgrade Notes

Generated: 2026-02-22

## Summary

All upgrades verified with a clean `pnpm build` (0 errors, 0 warnings).

---

## Successfully Upgraded

### Patch / Minor
| Package | From | To | Notes |
|---|---|---|---|
| @astrojs/node | 9.5.1 | 9.5.4 | |
| @astrojs/sitemap | 3.6.0 | 3.7.0 | |
| @tailwindcss/forms | 0.5.10 | 0.5.11 | |
| @vercel/functions | 3.3.4 | 3.4.2 | |
| @vercel/node | 5.5.15 | 5.6.6 | |
| @vercel/og | 0.8.5 | 0.8.6 | |
| astro | 5.16.5 | 5.17.3 | |
| autoprefixer | 10.4.22 | 10.4.24 | |
| plop | 4.0.4 | 4.0.5 | |
| react | 19.2.1 | 19.2.4 | |
| react-dom | 19.2.1 | 19.2.4 | |
| unist-util-visit | 5.0.0 | 5.1.0 | |
| @types/react | 18.3.27 | 19.2.14 | Aligned with React 19 runtime |
| @types/react-dom | 18.3.7 | 19.2.3 | Aligned with React 19 runtime |
| vitest | 4.0.15 | 4.0.18 | |

### Major Version (no breaking changes for this project)
| Package | From | To | Notes |
|---|---|---|---|
| @astrojs/vercel | 8.2.11 | 9.0.4 | ISR config unchanged |
| @biomejs/biome | 2.3.8 | 2.4.4 | Patch fixes only |
| @lancedb/lancedb | 0.22.3 | 0.26.2 | ⚠️ See peer dep note below |
| @pandacss/dev | 1.7.0 | 1.8.2 | |
| @types/node | 24.10.3 | 25.3.0 | Additive types only |
| @urql/core | 5.2.0 | 6.0.1 | GET-by-default for small queries; Hashnode API tested OK |
| cheerio | 1.1.2 | 1.2.0 | |
| dotenv | 16.6.1 | 17.3.1 | |
| globby | 14.1.0 | 16.1.1 | gitignore traversal now matches git root |
| inquirer | 10.2.2 | 13.2.5 | Dev-only (plop templates); existing `@ts-expect-error` guards import path |
| ollama | 0.5.18 | 0.6.3 | Additive only (logprobs, version()) |
| type-fest | 4.41.0 | 5.4.4 | ESM-only; no StringKeyOf usage found in project |
| vite-tsconfig-paths | 5.1.4 | 6.1.1 | Internal refactor only, no API changes |

### Migration: remark-unwrap-images → rehype-unwrap-images
`remark-unwrap-images` was deprecated in v5 with no type declarations. Migrated to the recommended replacement `rehype-unwrap-images@1.0.0`.
- Updated `src/hashnode/markdown/index.ts`: replaced import and plugin registration

### Fix: temporal-polyfill 0.2.5 → 0.3.0
`temporal-spec` v0.3.0 removed the `Intl.DateTimeFormatOptions` type alias. Fixed usage in `src/ui/utils/interval.tsx` to use the standard global `Intl.DateTimeFormatOptions` instead.

---

## Reverted — Breaking Changes

### motion 10.18.0 → 12.34.3 (reverted to 10.18.0)
### framer-motion 11.18.2 → 12.34.3 (reverted to 11.18.2)
**Reason**: motion v12 tightened TypeScript types for the `animate()` function. `src/components/blocks/Pill.astro` uses `animate('.animate-bob', { transform: [...] }, options)` which no longer matches the v12 overloads.

**Fix required**: Update `animate()` call in `Pill.astro` to use the v12 keyframe API (array syntax at top level rather than inside an object), then consolidate to the single `motion` package (framer-motion rebranded to motion at v12).

### tailwind-merge 2.6.0 → 3.5.0 (reverted to 2.6.1)
**Reason**: tailwind-merge v3 drops Tailwind CSS v3 support entirely. It only handles Tailwind v4 class names. Upgrading without also migrating to Tailwind v4 would silently break class conflict resolution at runtime.

**Fix required**: Must be upgraded as part of the Tailwind CSS v4 migration (see below).

---

## Deferred — Requires Dedicated Migration Sprint

### tailwindcss 3.4.19 → 4.2.0
**Effort**: High
Tailwind v4 is a complete architectural rewrite with CSS-first configuration:
- No more `tailwind.config.js` — config moves to `@theme` directive in CSS
- New PostCSS plugin: `@tailwindcss/postcss` (replaces old plugin)
- `autoprefixer` and `postcss-import` no longer needed (Lightning CSS built-in)
- `@tailwindcss/typography` and `@tailwindcss/forms` need v4-compatible versions
- `tailwind-merge` must be upgraded to v3 simultaneously
- `@tailwindcss/expose-colors` plugin compatibility unknown
- Dark mode class strategy must be re-configured via `@custom-variant`
- Run `npx @tailwindcss/upgrade` as starting point

### zod 3.25.76 → 4.3.6
**Effort**: Medium
Zod v4 is a near-complete rewrite with significant API changes:
- `z.string().datetime()` → `z.iso.datetime()`
- `error` param replaces deprecated `message` param
- `ZodError.format()` output structure changed
- `z.discriminatedUnion()` more strictly enforced
- Used heavily in `src/content/config.ts` for all content collection schemas — breakage here fails the entire build

### motion/framer-motion consolidation + v12 upgrade
**Effort**: Low-Medium
After fixing `Pill.astro`'s `animate()` call:
1. Update keyframe syntax for motion v12
2. Remove `framer-motion` dependency
3. Update any `import from 'framer-motion'` to `import from 'motion/react'`

---

## Notes

### @lancedb/lancedb peer dependency warning
`@lancedb/lancedb@0.26.2` expects `apache-arrow@">=15.0.0 <=18.1.0"` but the project has `apache-arrow@21.1.0`. The peer dep constraint is overly conservative — functionality appears unaffected. Monitor for runtime issues with LanceDB operations.
