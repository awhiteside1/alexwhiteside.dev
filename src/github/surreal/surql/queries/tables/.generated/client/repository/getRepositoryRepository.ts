import type {Surreal} from "surrealdb.js"

import {createRepository} from "./createRepository.js"
import {getAllRepositorys} from "./getAllRepositorys.js"
import {getRepositoryById} from "./getRepositoryById.js"
import {updateRepository} from "./updateRepository.js"
import {deleteRepository} from "./deleteRepository.js"

export const getRepositoryRepository = (db: Surreal) => {
  return {
    createRepository: createRepository.bind(undefined, db),
    getAllRepositorys: getAllRepositorys.bind(undefined, db),
    getRepositoryById: getRepositoryById.bind(undefined, db),
    updateRepository: updateRepository.bind(undefined, db),
    deleteRepository: deleteRepository.bind(undefined, db),
  }
}
