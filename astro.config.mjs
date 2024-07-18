import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import vercelServerless from '@astrojs/vercel/serverless'
import nodeBuilder from '@astrojs/node'
import { defineConfig, envField } from 'astro/config'

const vercel = vercelServerless({
	webAnalytics: {enabled:true},
	isr: {
		expiration: 60 * 60 * 24,
	},
})

const node = nodeBuilder({mode:'standalone'})

const isVercel = ()=> process.env.VERCEL !== undefined 
// https://astro.build/config
export default defineConfig({
	site: 'https://alexwhiteside.dev',
	adapter: isVercel()? vercel: node,
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
