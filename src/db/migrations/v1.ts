export function migrateToV1(db: IDBDatabase) {
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
