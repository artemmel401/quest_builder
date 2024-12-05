import { Position } from "./position"

export type Object = {
  onClick: 'exit' | ClickType
  hoverWith?: string //subjectId
  hover?: string
  position: Position
}

export type ClickType = {
  type: 'room' | 'subject' | 'question'
  id: string
}