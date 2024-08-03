/* Place your custom changes here */

import {z} from "zod";
import {type RecordId} from "surrealdb.js";

import {resourceCreateSchema, resourceSchema} from "./resourceSchema.js";

// the create type for table resource
export type ResourceCreate = z.input<typeof resourceCreateSchema>

// the select type for table resource
export type Resource = z.output<typeof resourceSchema> & {id: RecordId<string>}
      