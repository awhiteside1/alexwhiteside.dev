import {RecordId, type Surreal} from "surrealdb.js";

import {textSchema} from "../../schema/text/textSchema.js";
import type {Text} from "../../schema/text/textTypes.js";

export const updateText = async function (db: Surreal, id: RecordId ,text: Partial<Text>) {
  const _key = textSchema.pick({ id: true }).parse({ id });
  const payload = textSchema.omit({ id: true }).partial().parse(text);

  return db.merge<Text>(id, payload);
};
