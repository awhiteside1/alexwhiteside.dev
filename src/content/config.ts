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
    schema: z.object({
        title: z.string(),
        company: z.string(),
        from: z.coerce.date(),
        to: z.coerce.date().optional(),
        stack: z.string().transform((value) => value.split(' ')),
        logo: z.string().url(),
    }),
})

export const collections = { books, work }
