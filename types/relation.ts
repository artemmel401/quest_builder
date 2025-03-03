
export type RelationType = 'object' | 'room' | 'text' | 'question' | 'exit'

export type EntityRelationType = {id: string, name: string}

export type NewEntityRelation = {
  resultEntity: EntityRelationType
  subject: EntityRelationType
  type: 'object'
}

export type ChangeRoomRelation = {
  room: EntityRelationType
  type: 'room'
}

export type DisplayTextRelation = {
  text: string
  type: 'text'
}

export type DisplayQuestionRelation = {
  questionId: string
  type: 'question'
}

export type ExitQuestRelation = {
  type: 'exit'
}

export type Relation = { id: string, object: EntityRelationType } & (NewEntityRelation | ChangeRoomRelation | DisplayTextRelation | DisplayQuestionRelation | ExitQuestRelation)