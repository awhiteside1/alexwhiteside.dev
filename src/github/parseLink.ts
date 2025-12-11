const PARSE_LINK_HEADER_MAXLEN = 2000
const PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED = false

interface LinkInfo {
	[key: string]: string | undefined
	rel?: string
	url?: string
}

function hasRel(x: LinkInfo): boolean {
	return x && x.rel !== undefined
}

function intoRels(
	acc: Record<string, LinkInfo>,
	x: LinkInfo,
): Record<string, LinkInfo> {
	function splitRel(rel: string) {
		acc[rel] = { ...x, rel }
	}

	x.rel?.split(/\s+/).forEach(splitRel)

	return acc
}

function createObjects(acc: LinkInfo, p: string): LinkInfo {
	const m = p.match(/\s*(.+)\s*=\s*"?([^"]+)"?/)
	if (m) acc[m[1]] = m[2]
	return acc
}

function parseLink(link: string): LinkInfo | null {
	try {
		const m = link.match(/<?([^>]*)>(.*)/)
		if (!m) return null

		const linkUrl = m[1]
		const parts = m[2].split(';')
		const parsedUrl = new URL(linkUrl)
		const qry = Object.fromEntries(parsedUrl.searchParams.entries())

		parts.shift()

		let info = parts.reduce(createObjects, {} as LinkInfo)
		info = { ...qry, ...info }
		info.url = linkUrl
		return info
	} catch (_e) {
		return null
	}
}

function checkHeader(linkHeader: string): boolean {
	if (!linkHeader) return false

	if (linkHeader.length > PARSE_LINK_HEADER_MAXLEN) {
		if (PARSE_LINK_HEADER_THROW_ON_MAXLEN_EXCEEDED) {
			throw new Error(
				`Input string too long, it should be under ${PARSE_LINK_HEADER_MAXLEN} characters.`,
			)
		}
		return false
	}
	return true
}

export function parseLinkHeader(header: Headers): Record<string, LinkInfo> {
	const linkHeader = header.get('link')
	if (!linkHeader || !checkHeader(linkHeader)) return {}

	return linkHeader
		.split(/,\s*</)
		.map(parseLink)
		.filter((link): link is LinkInfo => link !== null) // Filter out null values
		.filter(hasRel)
		.reduce(intoRels, {} as Record<string, LinkInfo>)
}
