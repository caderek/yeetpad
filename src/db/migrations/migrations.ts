import { migrateToV1 } from "./v1"

export const migrations = new Map<number, (db: IDBDatabase) => void>()

migrations.set(1, migrateToV1)
