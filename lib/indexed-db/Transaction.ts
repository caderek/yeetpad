import { Store } from "./Store"

export class Transaction {
  #transaction: IDBTransaction
  #storeNames: Set<string>

  constructor(
    db: IDBDatabase,
    storeNames: string | string[],
    mode?: IDBTransactionMode,
  ) {
    this.#transaction = db.transaction(storeNames, mode)
    this.#storeNames = new Set(
      Array.isArray(storeNames) ? storeNames : [storeNames],
    )
  }

  run(fn: (stores: { [key: string]: Store<any> }) => any) {
    console.log("Running transaction!")

    const stores = [...this.#transaction.objectStoreNames]
      .filter((name) => this.#storeNames.has(name))
      .map((name) => {
        return [name, new Store(this.#transaction.objectStore(name))]
      })

    return fn(Object.fromEntries(stores))
  }
}
