type IDBKeyType = string | number | Date | Array<IDBKeyType>

export type StoreDescription<K extends keyof V & string, V extends object> = {
  key: K
  val: V & { [P in K]: IDBKeyType }
}

export type BaseStores = {
  [storeName: string]: {
    key: string
    val: { [key: string]: any }
  }
}
