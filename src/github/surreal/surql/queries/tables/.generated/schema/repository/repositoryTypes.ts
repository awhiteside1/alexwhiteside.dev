/* Place your custom changes here */

import {z} from "zod";
import {type RecordId} from "surrealdb.js";

import {repositoryCreateSchema, repositorySchema} from "./repositorySchema.js";

// the create type for table repository
export type RepositoryCreate = z.input<typeof repositoryCreateSchema>

// the select type for table repository
export type Repository = z.output<typeof repositorySchema> & {id: RecordId<string>}
      