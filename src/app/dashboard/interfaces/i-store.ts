export interface IStore {
  store(key: string, value: string): void

  has(key: string): boolean

  retrieve(key: string): any

  remove(key: string): void
}
