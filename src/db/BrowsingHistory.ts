import { database } from "./db"
import type { BrowsingHistoryEntry } from "./db-types"

export class BrowsingHistory {
  static async add(url: string | URL) {
    url = typeof url === "string" ? new URL(url) : url

    return (await database).write(["browsing_history"]).run(async (stores) => {
      const timestamp = Date.now()
      const host = url.host
      const path = url.href.slice(url.origin.length)

      const entry = await stores.browsing_history.get(host)

      if (!entry) {
        const entry: BrowsingHistoryEntry = {
          host,
          last: timestamp,
          total: 1,
          subpages: {
            [path]: {
              last: timestamp,
              total: 1,
            },
          },
        }

        await stores.browsing_history.add(entry)
        return
      }

      const existingPath = entry.subpages[path]

      if (existingPath) {
        entry.subpages[path] = {
          total: existingPath.total + 1,
          last: timestamp,
        }
      } else {
        entry.subpages[path] = {
          total: 1,
          last: timestamp,
        }
      }

      entry.total += 1
      entry.last = timestamp

      stores.browsing_history.put(entry)
    })
  }
}
