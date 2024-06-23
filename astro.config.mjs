import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://astro-sphere-demo.vercel.app",
	adapter: node({ mode: "standalone" }),
	integrations: [mdx(), sitemap(), preact({ compat: true })],
	output: "server",
	vite: {
		optimizeDeps: {},
		build: {
			sourcemap: true,
		},
	},
});
