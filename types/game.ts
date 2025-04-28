import { Object } from "./object"
import { Task } from "./quest"
import { Relation } from "./relation"
import { Subject } from "./subject"

export type GameObject = {
  isDisplay: boolean
  relation?: Relation
  roomId: string
} & Object

export type GameSubject = {
  isDisplay: boolean
} & Subject

export type TaskStatus = 'notStarted' | 'notFind' | 'incorrect' | 'right'

export type GameTask = Task & {
  status: TaskStatus
}
