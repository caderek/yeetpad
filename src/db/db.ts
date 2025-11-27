import { Database } from "./Database"
import { migrations } from "./migrations/migrations"

const DB_VERSION = 1

Database.connect("history", DB_VERSION, migrations).then(async (db) => {
  if (!db) {
    console.error("Can't connect to IndexedDB")
    return
  }

  const result = await db
    .transaction(["search", "browsing"], "readwrite")
    .run(async (stores) => {
      console.log({ stores })

      await stores.search.add({
        query: "hello",
        total_searches: 1,
        last_used: Date.now(),
      })

      return stores.search.get("helllo")
    })

  console.log({ result })

  // const store = transaction.objectStore("search")
  // console.log(store)

  console.log("Database loaded sucessfully!")
})
