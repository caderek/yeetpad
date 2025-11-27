export class Store<T> {
  #store: IDBObjectStore

  constructor(store: IDBObjectStore) {
    this.#store = store
  }

  get(key: IDBValidKey): Promise<T | Error> {
    return new Promise((resolve) => {
      const request = this.#store.get(key)

      request.onsuccess = () => resolve(request.result as T)
      request.onerror = () => resolve(new Error(`Cannot get the key ${key}`))
    })
  }

  add(value: any) {
    return new Promise((resolve) => {
      const request = this.#store.add(value)

      request.onsuccess = () => resolve(request.result as T)
      request.onerror = () => resolve(new Error(`Cannot get add the value`))
    })
  }
}
