async function openDB(name: string, version: number) {
  const openRequest = indexedDB.open(name, version)

  return new Promise((resolve) => {
    openRequest.onsuccess = () => {
      resolve(openRequest.result)
    }

    // @todo - handle specific errors
    openRequest.onerror = () => {
      console.log("error")
      resolve(null)
    }
    openRequest.onblocked = () => {
      console.log("blocked")
      resolve(null)
    }
    openRequest.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      const oldVersion = e.oldVersion // 0 initially
      const newVersion = e.newVersion

      console.log(`Database upgrade needed`, oldVersion, newVersion)
      if (oldVersion < 1) {
        const browserHistoryStore = db.createObjectStore("browsing", {
          keyPath: "host",
        })
        browserHistoryStore.createIndex("by_last_visited", "last_visited", {
          unique: false,
        })
        browserHistoryStore.createIndex("by_total_visits", "total_visits", {
          unique: false,
        })

        const searchHistoryStore = db.createObjectStore("search", {
          keyPath: "query",
        })
        searchHistoryStore.createIndex("by_last_used", "last_used", {
          unique: false,
        })
        searchHistoryStore.createIndex("by_total_searches", "total_searches", {
          unique: false,
        })

        const commandHistoryStore = db.createObjectStore("commands", {
          keyPath: "command",
        })
        commandHistoryStore.createIndex("by_last_used", "last_used", {
          unique: false,
        })
        commandHistoryStore.createIndex("by_total_uses", "total_uses", {
          unique: false,
        })
      }
    }
  }) as Promise<IDBDatabase | null>
}

const CURRENT_VERSION = 1

openDB("history", CURRENT_VERSION).then((db) => {
  console.log(db)

  if (!db) {
    console.error("Can't connect to IndexedDB")
    return
  }
})
