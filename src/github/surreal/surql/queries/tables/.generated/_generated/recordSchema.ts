import { RecordId, StringRecordId } from 'surrealdb.js'
import z from 'zod'

type TableRecordId<T extends string> =
	| RecordId<T>
	| StringRecordId
	| `${T}:${string}`

export function recordId<Table extends string = string>(table?: Table) {
	const tableRegex = table ? table : '[A-Za-z_][A-Za-z0-9_]*'
	const idRegex = '[^:]+'
	const fullRegex = new RegExp(`^${tableRegex}:${idRegex}$`)

	return z
		.union([
			z
				.custom<RecordId<string>>(
					(val): val is RecordId<string> => val instanceof RecordId,
				)
				.refine((val): val is RecordId<Table> => !table || val.tb === table, {
					message: table ? `RecordId must be of type '${table}'` : undefined,
				}),
			z
				.custom<StringRecordId>(
					(val): val is StringRecordId => val instanceof StringRecordId,
				)
				.refine((val) => !table || val.rid.startsWith(`${table}:`), {
					message: table
						? `StringRecordId must start with '${table}:'`
						: undefined,
				}),
			z.string().regex(fullRegex, {
				message: table
					? `Invalid record ID format. Must be '${table}:id'`
					: "Invalid record ID format. Must be 'table:id'",
			}),
		])
		.transform((val): TableRecordId<Table> => {
			if (typeof val === 'string') {
				return new StringRecordId(val) as TableRecordId<Table>
			}
			return val as TableRecordId<Table>
		})
}
