import repositoryDefinitionRaw from './repository.surql?raw'
import resourceDefinitionRaw from './resource.surql?raw'
import textDefinitionRaw from './text.surql?raw'
import {PreparedQuery, surql} from "surrealdb.js";


export const repositoryDefinition = new PreparedQuery(repositoryDefinitionRaw)
export const resourceDefinition = new PreparedQuery(resourceDefinitionRaw)
export const textDefinition = new PreparedQuery(textDefinitionRaw)