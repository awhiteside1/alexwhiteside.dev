/// <reference path="../.astro/env.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly HASHNODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}