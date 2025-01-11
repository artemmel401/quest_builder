import { Position } from "./position"
import { Size } from "./size"

export type Subject = {
  id: string
  title: string
  position: Position
  roomId: string
  src: string
  size: Size
  hoverWith?: string //ObjectId
  hoverWithName?: string //object to display after Hover
  hoverResult?:string
  hoverResultName?:string
}