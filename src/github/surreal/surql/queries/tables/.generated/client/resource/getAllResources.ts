import type {Surreal} from "surrealdb.js";

import type {Resource} from "../../schema/resource/resourceTypes.js";

export const getAllResources = async function (db: Surreal) {
  return db.select<Resource>("resource")
};
