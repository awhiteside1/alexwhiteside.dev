import { PreparedQuery } from 'surrealdb.js'
import repositoryDefinitionRaw from './repository.surql?raw'
import resourceDefinitionRaw from './resource.surql?raw'
import textDefinitionRaw from './text.surql?raw'

export const repositoryDefinition = new PreparedQuery(repositoryDefinitionRaw)
export const resourceDefinition = new PreparedQuery(resourceDefinitionRaw)
export const textDefinition = new PreparedQuery(textDefinitionRaw)
