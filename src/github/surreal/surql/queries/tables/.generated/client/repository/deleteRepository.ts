import {RecordId, type Surreal} from "surrealdb.js";

import type {Repository} from "../../schema/repository/repositoryTypes.js";

export const deleteRepository = async function (db: Surreal, id: RecordId) {
  return db.delete<Repository>(id)
};
