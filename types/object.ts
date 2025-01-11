import { Position } from "./position"
import { Size } from "./size"

export type Object = {
  id: string
  title: string
  onClick?: ClickType
  hoverWith?: string //subjectId
  hoverWithName?: string
  hoverResult?: string //object to display after Hover
  hoverResultName?:string
  hoverResultBy?: {objectId: string, subjectId: string, objectName: string, subjectName: string}
  position: Position
  size: Size
  src: string
}

export type ClickType = {
  type: Click
  id: string
  content: string
}

export type Click = 'room' | 'text' | 'question' | 'exit'