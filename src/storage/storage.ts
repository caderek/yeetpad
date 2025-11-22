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
      // Create and migrate stores based on versions
      if (oldVersion < 1) {
        const objectStore = db.createObjectStore("toDoList", {
          keyPath: "taskTitle",
        })
        objectStore.createIndex("hours", "hours", { unique: false })
        objectStore.createIndex("minutes", "minutes", { unique: false })
        objectStore.createIndex("day", "day", { unique: false })
        objectStore.createIndex("month", "month", { unique: false })
        objectStore.createIndex("year", "year", { unique: false })
        objectStore.createIndex("notified", "notified", { unique: false })
      }
    }
  }) as Promise<IDBDatabase | null>
}

const CURRENT_VERSION = 1

openDB("test", CURRENT_VERSION).then((db) => {
  console.log(db)

  if (!db) {
    console.error("Can't connect to IndexedDB")
    return
  }
})
