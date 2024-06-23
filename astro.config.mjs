import {defineConfig} from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import preact from "@astrojs/preact"
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: "https://astro-sphere-demo.vercel.app",
    adapter: node({mode:'standalone'}),
    integrations: [mdx(), sitemap(), preact({compat: true})],
    output: 'server',
    vite:{
        optimizeDeps:{

        },
        build:{
            sourcemap:true
        }
    }
})