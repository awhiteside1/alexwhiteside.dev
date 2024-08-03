import type {RepoPartial} from '@github/getRepos'
import reposRaw from './repos.json'

const repos = reposRaw as RepoPartial[]

export {repos}