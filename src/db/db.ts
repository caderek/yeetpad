import { Database } from "../../lib/indexed-db/Database"
import type { Stores } from "./db-types"
import { migrations } from "./migrations/migrations"

const DB_VERSION = 1

async function initDB() {
  const database = await Database.connect<Stores>(
    "anonymous",
    DB_VERSION,
    migrations,
  )

  if (!database) {
    throw new Error("Cannot connect to IndexedDB")
  }

  return database
}

export const database = initDB()

// database.then(async (db) => {
//   if (!db) {
//     console.error("Can't connect to IndexedDB")
//     return
//   }
//
//   const result = await db.write(["search_history"]).run(async (stores) => {
//     const entry = await stores.search_history.get(
//       "2e3ff912-cf73-4229-a8a0-dbd91a7c0322",
//     )
//
//     if (entry !== undefined) {
//       await stores.search_history.put({
//         ...entry,
//         total: entry.total + 1,
//         last: Date.now(),
//       })
//     } else {
//       await stores.search_history.add({
//         query: "2e3ff912-cf73-4229-a8a0-dbd91a7c0322",
//         total: 1,
//         last: Date.now(),
//       })
//     }
//     return entry
//   })
//
//   console.log(result)
// })
