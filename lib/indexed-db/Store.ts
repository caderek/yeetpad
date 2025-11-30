export class Store<T, K extends keyof T> {
  #store: IDBObjectStore

  constructor(store: IDBObjectStore) {
    this.#store = store
  }

  get keypath() {
    return this.#store.keyPath
  }

  get(key: T[K]): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const request = this.#store.get(key as IDBValidKey)

      request.onsuccess = () => resolve(request.result as T | undefined)
      request.onerror = (e) => {
        reject((e.target as IDBRequest).error)
      }
    })
  }

  add(value: T): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const request = this.#store.add(value)

      request.onsuccess = () => resolve(request.result as IDBValidKey)
      request.onerror = (e) => {
        reject((e.target as IDBRequest).error)
      }
    })
  }

  put(value: T): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
      const request = this.#store.put(value)

      request.onsuccess = () => resolve(request.result as IDBValidKey)
      request.onerror = (e) => {
        reject((e.target as IDBRequest).error)
      }
    })
  }
}
