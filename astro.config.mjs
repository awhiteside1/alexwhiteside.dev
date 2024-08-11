import mdx from '@astrojs/mdx'
import nodeBuilder from '@astrojs/node'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercelServerless from '@astrojs/vercel/serverless'
import { defineConfig, envField } from 'astro/config'
const vercel = vercelServerless({
	webAnalytics: {
		enabled: true,
	},
	isr: {
		bypassToken: '87734ad8259d67c3c11747d3e4e112d01234',
		expiration: 1,
	},
})
const node = nodeBuilder({
	mode: 'standalone',
})
const isVercel = () => process.env.VERCEL !== undefined

// https://astro.build/config
export default defineConfig({
	site: 'https://alexwhiteside.dev',
	adapter: isVercel() ? vercel : node,
	integrations: [mdx(), sitemap(), react()],
	output: 'hybrid',
	experimental: {
		serverIslands: true,
		env: {
			schema: {
				HASHNODE: envField.string({
					context: 'server',
					access: 'secret',
				}),
			},
		},
	},
})
