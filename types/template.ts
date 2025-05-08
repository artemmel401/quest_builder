import { Subject } from './subject';
import { Room } from "./room"
import { Relation } from './relation';
import { EntityType } from './entity';

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
  userImages?: UserImage[]
  type: ExitType
}

export type UserImage = {url: string, type: 'Room' | EntityType}

export type ExitType = 'object' | 'question' | 'list'