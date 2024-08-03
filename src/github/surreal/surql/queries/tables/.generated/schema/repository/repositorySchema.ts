/* Place your custom changes here */

import {z} from "zod";

import {repositoryInputSchemaGen, repositoryOutputSchemaGen} from "../../_generated/index.js";
import {recordId} from "../../_generated/recordSchema.js";

// payload schema for creating a new repository entity
export const repositoryCreateSchema = repositoryInputSchemaGen.merge(z.object({
  id: recordId("repository").optional()
  // add your custom fields here, which are not part of SurrealDB table schema
  // they are not overwritten by the next run
      }))

// payload schema for fetching a repository entity
export const repositorySchema = repositoryOutputSchemaGen.merge(z.object({
  id: recordId("repository"),
  // add your custom fields here, which are not part of SurrealDB table schema
  // they are not overwritten by the next run
      }))
