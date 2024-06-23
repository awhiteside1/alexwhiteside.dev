import mdx from "@astrojs/mdx";
import vercelServerless from '@astrojs/vercel/serverless';
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://astro-sphere-demo.vercel.app",
	adapter: vercelServerless({webAnalytics: true}),
	integrations: [mdx(), sitemap(), preact({ compat: true })],
	output: "hybrid",
	vite: {
		optimizeDeps: {},
		build: {
			sourcemap: true,
		},
	},
	experimental:{
		env:{
			schema:{
				HASHNODE: envField.string({ context: "server", access: "secret" }),
			}
		}
	}
});
