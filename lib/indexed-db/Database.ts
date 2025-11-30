import type { BaseStores } from "./types"
import { Transaction } from "./Transaction"

export class Database<T extends BaseStores> {
  #db: IDBDatabase

  constructor(db: IDBDatabase) {
    this.#db = db
  }

  transaction<K extends readonly (keyof T)[]>(
    storeNames: K,
    mode: IDBTransactionMode,
  ) {
    return new Transaction<T, K>(this.#db, storeNames, mode)
  }

  read<K extends readonly (keyof T)[]>(storeNames: K) {
    return this.transaction(storeNames, "readonly")
  }

  write<K extends readonly (keyof T)[]>(storeNames: K) {
    return this.transaction(storeNames, "readwrite")
  }

  get raw() {
    return this.#db
  }

  static async connect<V extends BaseStores>(
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

    return rawDatabase ? new Database<V>(rawDatabase) : null
  }
}
