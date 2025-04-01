import { Subject } from './subject';
import { Room } from "./room"
import { Relation } from './relation';

export type Template = {
  _id: string,
  rooms: Room[], 
  subjects: Subject[]
  relations: Relation[]
  title: string
  type: ExitType
}

export type EmptyTemplate = {
  _id: string
  rooms: Room[]
  subjects: Subject[]
  relations: Relation[]
  title: ''
  type: ''
}

export type TemplateContent = {
  rooms: Room[] 
  subjects: Subject[]
  relations: Relation[]
  type: ExitType
}

export type ExitType = 'object' | 'question' | 'list'