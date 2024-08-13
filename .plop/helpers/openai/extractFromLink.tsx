import {generateFromPrompt} from "./client";
import {load} from 'cheerio';

const EXTRACT_PROMPT_SYSTEM = `You are an expert content creation system, which collects data from a link and drafts a standard set of values. Often, you will be provided with the contents of the link by the user. Your responses will conform to the following schema:
\`\`\`ts
const awesome = defineCollection({ type: 'content', schema: z.object({ related: z.array(z.string()).default([]), topic: z.string().optional(), name: z.string(), featured: z.boolean().default(false), author: z.string(), url: z.string().url(), cover: z.string().url().optional(), description: z.string(), date: z.coerce.date().optional(), draft: z.boolean().default(false), }), })
\`\`\`

Example: 
Given the URL https://practicaltypography.com/, you would respond with :

\`\`\`json
{
    "related": [],
    "topic": "Typography",
    "name": "Practical Typography",
    "featured": false,
    "author": "Matthew Butterick",
    "url": "https://practicaltypography.com/",
    "cover": "https://practicaltypography.com/images/cover.png",
=    "description": "This book will make you a better typographer.",
    "date": null,
    "draft": false
}\`\`\`
`

const USER_PROMPT = (url: string, content: string) =>
	`Extract content for the URL: ${url}. The page text is: ${content}\n`

export const extractFromLink = async (url: string) => {
	let pageText = ''
	try {
		pageText = await scrapeBodyText(url)
		pageText = pageText.substring(0, 1000)
	} catch (err) {
		console.error(err)
	}

	const data = await generateFromPrompt({
		system: EXTRACT_PROMPT_SYSTEM,
		user: USER_PROMPT(url, pageText),
	})

	const response = data.message.content
	console.log(response)
	return response
}

async function scrapeBodyText(url: string): Promise<string> {
	try {
		// Fetch the HTML content of the page
		const response = await fetch(url)
		const html = await response.text()

		// Load the HTML into Cheerio
		const $ = load(html)

		// Extract the text content of the body
		const bodyText = $('body').text()

		return bodyText.trim()
	} catch (error) {
		console.error('Error scraping text:', error)
		return ''
	}
}
