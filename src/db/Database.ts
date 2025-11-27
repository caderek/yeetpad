import { Transaction } from "./Transaction"

export class Database {
  #db: IDBDatabase

  constructor(db: IDBDatabase) {
    this.#db = db
  }

  transaction(storeNames: string | string[], mode: IDBTransactionMode) {
    return new Transaction(this.#db, storeNames, mode)
  }

  static async connect(
    name: string,
    version: number,
    migrations: Map<number, (db: IDBDatabase) => void>,
  ) {
    const openRequest = indexedDB.open(name, version)

    const rawDatabase = (await new Promise((resolve) => {
      openRequest.onsuccess = () => {
        resolve(openRequest.result)
      }

      // @todo - handle specific errors returning specialized Error classes
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
        const newVersion = e.newVersion ?? version

        for (let v = oldVersion + 1; v <= newVersion; v++) {
          const runMigration = migrations.get(v)

          if (runMigration) {
            console.log(`Migrating database to version:`, v)
            runMigration(db)
          } else {
            console.warn("No database migration file for version:", v)
          }
        }
      }
    })) as IDBDatabase | null

    return rawDatabase ? new Database(rawDatabase) : null
  }
}
