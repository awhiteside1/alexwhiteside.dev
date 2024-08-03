import {RecordId, type Surreal} from "surrealdb.js";

import type {Resource} from "../../schema/resource/resourceTypes.js";

export const deleteResource = async function (db: Surreal, id: RecordId) {
  return db.delete<Resource>(id)
};
