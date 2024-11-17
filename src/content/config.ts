import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

const awesome = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			related: z.array(z.string()).default([]),
			topic: z.string().optional(),
			name: z.string(),
			featured: z.boolean().default(false),
			author: z.string(),
			url: z.string().url(),
			cover: z.string().url().optional().or(image()),
			description: z.string(),
			date: z.coerce.date().optional(),
			draft: z.boolean().default(false),
		}),
})

// const tech = defineCollection({
//     type: 'content',
//     schema: z.object({
//         name: z.string(),
//         author: z.string(),
//         url: z.string().url(),
//         description: z.string(),
//         kind: z.string(),
//         date: z.coerce.date(),
//         draft: z.boolean().default(false),
//     }),
// })

const work = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			acquired: z.string().optional(),
			company: z.string(),
			from: z.coerce.date(),
			to: z.coerce.date().optional(),
			stack: z.string().transform((value) => value.split(' ')),
			logo: z.string().url().or(image()),
		}),
})

const titles = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		color: z.string(),
		short: z.string(),
		order: z.number(),
		className: z.string().optional(),
	}),
})

const sections = defineCollection({
	type: 'content',
	schema: z.object({
		page: z.enum(['home', 'blog', 'background', 'books']).optional(),
		name: z.string().optional(),
		classes: z.string().optional(),
	}),
})

const skills = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			color: z.string(),
			skill: z.string(),
			description: z.string(),
			icon: z.string().or(image()),
		}),
})

export const collections = { awesome, work, titles, sections, skills }
