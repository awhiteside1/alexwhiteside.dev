import { blob, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const repositories = sqliteTable('repository', {
    name: text('name').notNull().unique().primaryKey(),
    githubId: int('github_id').notNull(),
    topics: text('topics', { mode: 'json' }).$type<Array<string>>(),
})

export const topics = sqliteTable('topics', {
    name: text('name').notNull().primaryKey(),
    embedding: blob('embedding'),
    description: text('description'),
})

export const repository_topic = sqliteTable('repository_topic', {
    repository: text('repository').references(() => repositories.name),
    topic: text('topic').references(() => topics.name),
})
