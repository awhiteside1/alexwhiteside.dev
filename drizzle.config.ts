import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './drizzle/schema.ts',
    out: './drizzle/out',
    dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
})
