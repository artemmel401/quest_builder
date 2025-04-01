import { Object } from "@/types/object"
import { Relation } from "@/types/relation";
import { Subject } from "@/types/subject"

export const itemIsSubject = (item: Subject | Object): item is Subject => {
  return 'roomId' in item
}

export function isRelation(newRelation: any): newRelation is Relation {
  const relation = newRelation as Relation;
  try {
    if (
      typeof relation.id !== 'string' ||
      typeof relation.object !== 'object' ||
      relation.object === null ||
      typeof relation.object.id !== 'string' ||
      typeof relation.object.name !== 'string' ||
      typeof relation.type !== 'string'
    ) {
      return false;
    }
  
    switch (relation.type) {
      case 'object':
        if (
          typeof relation.resultEntity !== 'object' ||
          relation.resultEntity === null ||
          typeof relation.resultEntity.id !== 'string' ||
          typeof relation.resultEntity.name !== 'string' ||
          typeof relation.subject !== 'object' ||
          relation.subject === null ||
          typeof relation.subject.id !== 'string' ||
          typeof relation.subject.name !== 'string'
        ) {
          return false;
        }
        break;
  
      case 'room':
        if (
          typeof relation.room !== 'object' ||
          relation.room === null ||
          typeof relation.room.id !== 'string' ||
          typeof relation.room.name !== 'string'
        ) {
          return false;
        }
        break;
  
      case 'text':
        if (typeof relation.text !== 'string') {
          return false;
        }
        break;
      case 'question':
        if (
          typeof relation.resultEntity !== 'object' ||
          relation.resultEntity === null ||
          typeof relation.resultEntity.id !== 'string' ||
          typeof relation.resultEntity.name !== 'string'
        ) {
          return false;
        }
        break;
        return true
      case "questionList":
        return true
      case 'exit':
        return true
  
      default:
        return false;
    }
  
    return true;
  } catch {
    return false
  }
}