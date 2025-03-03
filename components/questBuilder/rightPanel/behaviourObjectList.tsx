import { Subject } from '@/types/subject'
import styles from './rightPanel.module.scss'
import { StrippedRoom } from '@/types/room'
import { Object } from '@/types/object'
import { useEffect, useState } from 'react'
import { Relation, RelationType } from '@/types/relation'
import { nanoid } from 'nanoid'
import { isRelation } from '@/utils'

type BehaviourObjectListProps = {
  activeObject: Object
  activeRelation: Relation | undefined
  getFreeSubjects: () => Subject[]
  getFreeEntityToResult: () => (Object | Subject)[]
  getFreeRooms: () => StrippedRoom[]
  getFreeQuestions: () => string[]
  hintText?: string
  addNewRelation: (newRelation: Relation) => void
}

export default function BehaviourObjectList({
  activeObject, activeRelation, getFreeSubjects, getFreeEntityToResult, getFreeRooms, hintText, getFreeQuestions, addNewRelation
}:BehaviourObjectListProps){

  const [newRelation, setNewRelation] = useState<Partial<Relation>>(activeRelation ? activeRelation : 
    {id: nanoid(), type: 'object', object: {id: activeObject.id, name: activeObject.title}}
  )
  const [displayAdd, setDisplayAdd] = useState(false)
  const [isOkRelation, setIsOkRelation] = useState(activeRelation ? true : false)
  const [newFreeSubjects, setNewFreeSubjects] = useState(getFreeSubjects())
  const [newFreeResultObjects, setNewFreeResultObjects] = useState(getFreeEntityToResult())

  const deletePairSubject = (subjects: (Object | Subject)[], isForHover: boolean) => {
    if (!newRelation){
      return subjects
    }
    if (newRelation.object && !isForHover) {
      for (const subject of subjects) {
        if (subject.id === newRelation.object.id){
          return subjects.filter((sub)=>(sub.id !== subject.id))
        }
      }
    }
    if (newRelation.type==='object' && newRelation.resultEntity && isForHover) {
      for (const subject of subjects) {
        if (subject.id === newRelation.resultEntity.id){
          return subjects.filter((sub)=>(sub.id !== subject.id))
        }
      }
    }
    return subjects
  }

  const changeRelationType = (newType: RelationType) => {
    setNewRelation({id: nanoid(), type: newType})
  }

  const addHover = (subject: Subject) => {
    setNewFreeSubjects(newFreeSubjects.filter((obj) => obj.id !== subject.id))
    setNewRelation({ ...newRelation, subject: { id: subject.id, name: subject.title } })
  }

  const addResult = (entity: Object | Subject) => {
    setNewFreeResultObjects(newFreeResultObjects.filter((obj)=>obj.id !== entity.id))
    setNewRelation({...newRelation, resultEntity: {id: entity.id, name: entity.title}})
  }

  useEffect(()=>{
    if (isRelation(newRelation)) {
      addNewRelation(newRelation)
    }
  },[newRelation])

  return (
    <div className={styles.behaviourList}>
      <div className={styles.behaviourList__block}>
        <div style={{cursor: 'pointer', justifyContent: 'flex-start'}} onClick={()=>changeRelationType('object')} className={styles.behaviourList__item}>
          <img src={`/icons/radiobutton/${newRelation.type === 'object' ? 'active' : 'disable'}.svg`} />
          <p className={styles.behaviourList__text}>При соединении...</p>
        </div>
        <div className={styles.behaviourList__mode}>
          <div style={{cursor: 'pointer', justifyContent: 'flex-start'}} onClick={()=>changeRelationType('room')} className={styles.behaviourList__item}>
            <img src={`/icons/radiobutton/${newRelation.type !== 'object' ? 'active' : 'disable'}.svg`}/>
            <p className={styles.behaviourList__text}>При нажатии...</p>
          </div>
        </div>
      </div>
      {newRelation.type === 'object' && 
      <div className={styles.behaviourList__block}>
        <div onClick={()=>setDisplayAdd(!displayAdd)} 
          style={{ cursor: 'pointer' }} 
          className={`${styles.behaviourList__item} ${displayAdd ? styles.behaviourList__item_active : ''}`}
        >
          <img src={`/icons/radiobutton/${isOkRelation ? 'active' : 'disable'}.svg`} />
          <p className={`${styles.behaviourList__text} ${displayAdd ? styles.behaviourList__item_active : ''}`}>{
            `При наведении на ${newRelation.subject ? newRelation.subject.name : '____'} 
            появляется новый ${newRelation.resultEntity ? newRelation.resultEntity.name : '____'}`}</p>
          <img src={`/icons/menu/${displayAdd ? 'open' : 'close'}.svg`} />
        </div>
        {displayAdd &&
        <>
          <div className={styles.addList}>
            <p>Выберите предмет для наведения:</p>
            {deletePairSubject(newFreeSubjects, true).map((object) => (
              <p key={`${object.id}--hover`} onClick={() => { addHover(object as Subject) }} className={styles.addList__item}>{object.title}</p>
            ))}
          </div>
          <div className={styles.addList}>
            <p>Выберите объект или предмет для появления:</p>
            {deletePairSubject(newFreeResultObjects, false).map((object) => (
              <p key={`${object.id}--result`} onClick={() => { addResult(object) }} className={styles.addList__item}>{object.title}</p>
            ))}
          </div>
        </>}
      </div>}
    </div>
  )
}