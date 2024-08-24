import type { APIRoute } from 'astro'

const hostFromEnv = import.meta.env.VERCEL_PROJECT_PRODUCTION_URL
const host = hostFromEnv ? `https://${hostFromEnv}` : 'http://localhost:4321'
// console.log({ host, hostFromEnv })

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', host).href}
`.trim()

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	})
}
