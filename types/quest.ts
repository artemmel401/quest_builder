export type Quest = {
  _id: string,
  number: number
  type: string
  userId: string
  variants: string[]
  title: string
  updateTime: number
  description: string
  fields: string[]
}