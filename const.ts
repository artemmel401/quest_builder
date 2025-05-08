import { ExitType } from "./types/template"

export const QUEST_TYPE = ['Выход по нажатию на объект', 'Выход при ответе на все вопросы', 'Выход при ответе на контрольный вопрос'] as const

export const QUEST_TYPE_REQUEST:{name:ExitType, value: string}[] = [
  {name: 'object', value: 'Выход по нажатию на объект'},
  {name: 'list', value: 'Выход при ответе на все вопросы'},
  {name: 'question', value: 'Выход при ответе на контрольный вопрос'},
]

export const BASKET_URL = 'https://static.joyteka.com/'