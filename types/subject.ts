import { Entity } from "./entity"

export type Subject = {
  type: 'subject'
  roomId: string
} & Entity