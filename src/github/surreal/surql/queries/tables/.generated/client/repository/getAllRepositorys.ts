import type {Surreal} from "surrealdb.js";

import type {Repository} from "../../schema/repository/repositoryTypes.js";

export const getAllRepositorys = async function (db: Surreal) {
  return db.select<Repository>("repository")
};
