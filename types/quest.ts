import { Subject } from './subject';
import { Room } from "./room"

export type Quest = {
  _id: string,
  number: number
  type: string
  userId: string
  variants: QuestContent[]
  title: string
  updateTime: number
  description: string
  fields: string[]
}

export type QuestContent = {
  rooms: Room[], 
  subjects: Subject[]
}