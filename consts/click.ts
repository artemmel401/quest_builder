import { Click } from "@/types/object";

export const ClickTypeList:{title: string, name: Click}[] = [
  {title: 'Завершается квест', name: 'exit'},
  {title: 'Переход в комнату', name: 'room'},
  {title: 'Появляется подсказка', name: 'text'}
]