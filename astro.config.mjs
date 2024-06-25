import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import vercelServerless from '@astrojs/vercel/serverless'
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://alexwhiteside.dev',
	adapter: vercelServerless({
		webAnalytics: true,
		isr: {
			expiration: 60 * 60 * 24,
			bypassToken: 'helloitsme',
		},
	}),
	integrations: [mdx(), sitemap(), preact({ compat: true })],
	output: 'hybrid',
	experimental: {
		env: {
			schema: {
				HASHNODE: envField.string({ context: 'server', access: 'secret' }),
			},
		},
	},
})
