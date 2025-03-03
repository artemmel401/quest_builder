import { Position } from "./position"
import { Size } from "./size"

export type EntityType = 'Object' | 'Subject'

export type Entity = {
  id: string
  title: string
  src: string
  size: Size
  position: Position
}