import { BackgroundType } from "./background"
import { Object } from "./object"

export type Room = {
  id: string,
  title: string
  background: BackgroundType
  objects: Object[]
}