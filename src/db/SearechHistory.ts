import { database } from "./db"
import type { SearchHistoryEntry } from "./db-types"

export class SearchHistory {
  static async add(query: string) {
    return (await database).write(["search_history"]).run(async (stores) => {
      const timestamp = Date.now()

      const entry = await stores.search_history.get(query)

      if (!entry) {
        const entry: SearchHistoryEntry = {
          query,
          last: timestamp,
          total: 1,
        }

        await stores.search_history.add(entry)
        return
      }

      entry.total += 1
      entry.last = timestamp

      stores.search_history.put(entry)
    })
  }
}
