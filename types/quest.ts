import { Subject } from './subject';
import { Room } from "./room"
import { Relation } from './relation';

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
  relations: Relation[]
}