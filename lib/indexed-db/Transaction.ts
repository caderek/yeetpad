import type { BaseStores } from "./types"
import { Store } from "./Store"

export class Transaction<T extends BaseStores, K extends readonly (keyof T)[]> {
  #transaction: IDBTransaction
  #storeNames: Set<K[number]>

  constructor(db: IDBDatabase, storeNames: K, mode?: IDBTransactionMode) {
    this.#transaction = db.transaction(storeNames as unknown as string[], mode)
    this.#storeNames = new Set(
      Array.isArray(storeNames) ? storeNames : [storeNames],
    )
  }

  async run<R>(
    operation: (
      stores: { [P in K[number]]: Store<T[P]["val"], T[P]["key"]> },
      transacton: this,
    ) => R,
  ): Promise<R | Error> {
    const stores = [...this.#transaction.objectStoreNames]
      .filter((name) => this.#storeNames.has(name as K[number]))
      .map((name) => {
        return [name, new Store(this.#transaction.objectStore(name))]
      })

    const storesObj = Object.fromEntries(stores) as {
      [P in K[number]]: Store<T[P]["val"], T[P]["key"]>
    }

    try {
      return await operation(storesObj, this)
    } catch (e) {
      return e instanceof Error ? e : new Error("Unknown error")
    }
  }

  abort() {
    this.#transaction.abort()
  }

  commit() {
    this.#transaction.commit()
  }
}
