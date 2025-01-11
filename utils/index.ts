import { Object } from "@/types/object"
import { Subject } from "@/types/subject"

export const itemIsSubject = (item: Subject | Object): item is Subject => {
  return 'roomId' in item
}