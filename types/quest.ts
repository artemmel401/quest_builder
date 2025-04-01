export type Quest = {
  number: number,
  type: 'quest',
  userId: string,
  templateId: string,
  variants: [],
  title: string,
  updateTime: number,
  description: string,
  fields: string[]
}