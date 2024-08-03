import type {Surreal} from "surrealdb.js";

import type {Text} from "../../schema/text/textTypes.js";

export const getAllTexts = async function (db: Surreal) {
  return db.select<Text>("text")
};
