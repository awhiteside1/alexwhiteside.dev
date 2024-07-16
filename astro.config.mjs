import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercelServerless from '@astrojs/vercel/serverless'
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://alexwhiteside.dev',
	adapter: vercelServerless({
		webAnalytics: {enabled:true},
		isr: {
			expiration: 60 * 60 * 24,
		},
	}),
	integrations: [mdx(), sitemap(), react()],
	output: 'hybrid',
	experimental: {
		env: {
			schema: {
				HASHNODE: envField.string({ context: 'server', access: 'secret' }),
			},
		},
	},
})
