import { migrateToV1 } from "./v1"

export const migrations = new Map()

migrations.set(1, migrateToV1)
