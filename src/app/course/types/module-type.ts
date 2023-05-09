import { Member } from "src/app/user/models/member"
import { MediaType } from "./media-type"

export type ModuleType = {
  id?: number
  name: string
  objective: string
  selected: boolean
  totalTime?: string
  creator?: Member
  medias: Array<MediaType>
  order ?:number
}
