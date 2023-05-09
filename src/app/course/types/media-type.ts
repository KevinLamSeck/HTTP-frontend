import { Member } from "src/app/user/models/member"
import { TypeMediaType } from "./type-media-type"

export type MediaType = {
  id?: number,
  title: string,
  summary: string,
  duration: number,
  totalTime?: string,
  createdAt?: Date,
  url: string,
  creator?: Member,
  order?: any,
  typeMedia: TypeMediaType,
  file?: any
}
