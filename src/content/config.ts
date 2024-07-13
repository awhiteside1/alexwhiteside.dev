import { defineCollection, z } from 'astro:content'

const books = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		author: z.string(),
		url: z.string().url(),
		cover: z.string().url(),
		description: z.string(),
		kind: z.string(),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
})

const tech = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		author: z.string(),
		url: z.string().url(),
		description: z.string(),
		kind: z.string(),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
})

//
// const projects = defineCollection({
//   type: "content",
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     date: z.coerce.date(),
//     draft: z.boolean().optional(),
//     demoURL: z.string().optional(),
//     repoURL: z.string().optional(),
//   }),
// });

export const collections = { books, tech }
