import { IStore } from "../../dashboard/interfaces/i-store";

export interface IStorageStrategy extends IStore {
  store(value: any): void
  has(): boolean
  retrieve(): any
  remove(): any
}
