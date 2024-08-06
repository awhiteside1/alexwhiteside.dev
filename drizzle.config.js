"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './drizzle/schema.ts',
    out: './drizzle/out',
    dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
});
