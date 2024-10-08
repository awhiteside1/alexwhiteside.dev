// ====================
// DO NOT EDIT THIS FILE!
// This file is autogenerated and will be overwritten during generation!
// ====================

import { z } from 'zod'

// the create schema for table text
export const textInputSchemaGen = z.object({
	embedding: z.number().array(),
	original: z.string(),
})

// the select schema for table text
export const textOutputSchemaGen = z.object({
	embedding: z.number().array(),
	original: z.string(),
})
