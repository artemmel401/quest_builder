export type Quest = {
  number: number,
  type: 'quest',
  userId: string,
  templateId: string,
  variants: Variant[],
  title: string,
  updateTime: number,
  description: string,
  fields: string[]
}

export type Variant = {
  id: number
  tasks: Task[],
}

export type QuestionType = 'text' | 'radio' | 'checkbox'

export type Answer = {
  id: string, 
  content: string, 
  correct: boolean, 
  fileUrl?: string
}

export type Task = {
  id: number, 
  answers: Answer[], 
  type: QuestionType, 
  content: string, 
  image?: string
}