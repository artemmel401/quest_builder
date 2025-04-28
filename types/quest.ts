import { EntityRelationType } from "./relation"

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
  questionListTasks: Task[],
  controlQuestion: Task[]
}

export type VariantQuestionType = 'tasks' | 'questionListTasks' | 'controlQuestion'

export type QuestionType = 'text' | 'radio' | 'checkbox'

export type Answer = {
  id: string, 
  content: string, 
  correct: boolean, 
  fileUrl?: string
}

export type UserAnswer = Omit<Answer, 'correct'>

export type Task = {
  id: number, 
  answers: Answer[], 
  type: QuestionType, 
  content: string, 
  image?: string
}

export type UserTask = {
  id: number, 
  answers: UserAnswer[], 
  type: QuestionType,
  content: string, 
  image?: string
  userAnswers?: string | string[]
}