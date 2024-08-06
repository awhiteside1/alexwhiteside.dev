"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = exports.topics = exports.repositories = void 0;
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.repositories = (0, sqlite_core_1.sqliteTable)('repository', {
    name: (0, sqlite_core_1.text)('name').notNull().unique().primaryKey(),
    githubId: (0, sqlite_core_1.int)('github_id').notNull(),
    topics: (0, sqlite_core_1.text)('topics', { mode: 'json' }).$type(),
});
exports.topics = (0, sqlite_core_1.sqliteTable)('topics', {
    name: (0, sqlite_core_1.text)('name').notNull().primaryKey(),
    embedding: (0, sqlite_core_1.blob)('vector').$type(),
});
exports.join = (0, sqlite_core_1.sqliteTable)('repository_topic', {
    repository: (0, sqlite_core_1.text)('repository').references(function () { return exports.repositories.name; }),
    topic: (0, sqlite_core_1.text)('topic').references(function () { return exports.topics.name; }),
});
