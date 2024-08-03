import {RecordId, type Surreal} from "surrealdb.js";

import type {Text} from "../../schema/text/textTypes.js";

export const deleteText = async function (db: Surreal, id: RecordId) {
  return db.delete<Text>(id)
};
