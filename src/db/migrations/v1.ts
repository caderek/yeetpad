export function migrateToV1(db: IDBDatabase) {
  const browserHistoryStore = db.createObjectStore("browsing_history", {
    keyPath: "host",
  })
  browserHistoryStore.createIndex("by_last", "last", {
    unique: false,
  })
  browserHistoryStore.createIndex("by_total", "total", {
    unique: false,
  })

  const commandHistoryStore = db.createObjectStore("command_history", {
    keyPath: "command",
  })
  commandHistoryStore.createIndex("by_last", "last", {
    unique: false,
  })
  commandHistoryStore.createIndex("by_total", "total", {
    unique: false,
  })

  const searchHistoryStore = db.createObjectStore("search_history", {
    keyPath: "query",
  })
  searchHistoryStore.createIndex("by_last", "last", {
    unique: false,
  })
  searchHistoryStore.createIndex("by_total", "total", {
    unique: false,
  })
}
