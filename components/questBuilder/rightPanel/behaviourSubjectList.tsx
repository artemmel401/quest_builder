import { EntityRelationType, NewEntityRelation, Relation } from '@/types/relation'
import styles from './rightPanel.module.scss'
import { useEffect, useState } from 'react'
import { Object } from '@/types/object'
import { nanoid } from 'nanoid'
import { Subject } from '@/types/subject'
import { isRelation } from '@/utils'

type BehaviourSubjectListProps = {
  activeSubject: Subject
  activeRelation: { id: string, object: EntityRelationType } & (NewEntityRelation) | undefined
  getFreeHoverObjects: () => Object[]
  getFreeEntityToResult: () => (Object | Subject)[]
  addNewRelation: (newRelation: Relation) => void
}

export default function BehaviourSubjectList({ getFreeHoverObjects, getFreeEntityToResult, activeRelation, activeSubject, addNewRelation }: BehaviourSubjectListProps) {
  console.log(activeRelation)
  const [newRelation, setNewRelation] = useState<Partial<typeof activeRelation>>(activeRelation)
  const [newFreeHoverObjects, setNewFreeHoverObjects] = useState(getFreeHoverObjects())
  const [newFreeResultObjects, setNewFreeResultObjects] = useState(getFreeEntityToResult())
  const [isOkRelation, setIsOkRelation] = useState(activeRelation ? true : false)

  const [displayAdd, setDisplayAdd] = useState(false)

  const addHover = (object: Object) => {
    setNewFreeHoverObjects(newFreeHoverObjects.filter((obj)=>obj.id !== object.id))
    if (!newRelation) {
      setNewRelation({id: nanoid(), object: {id: object.id, name: object.title}})
    } else {
      setNewRelation({...newRelation, object: {id: object.id, name: object.title}})
    }
  }

  const addResult = (entity: Object | Subject) => {
    setNewFreeResultObjects(newFreeResultObjects.filter((obj)=>obj.id !== entity.id))
    if (!newRelation) {
      setNewRelation({id: nanoid(), resultEntity: {id: entity.id, name: entity.title}, subject: { id: activeSubject.id, name: activeSubject.title }, type: 'object'})
    } else {
      setNewRelation({...newRelation, resultEntity: {id: entity.id, name: entity.title}})
    }
  }

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
    if (newRelation.resultEntity && isForHover) {
      for (const subject of subjects) {
        if (subject.id === newRelation.resultEntity.id){
          return subjects.filter((sub)=>(sub.id !== subject.id))
        }
      }
    }
    return subjects
  }

  useEffect(()=>{
    if (newRelation) {
      if (isRelation(newRelation)) {
        addNewRelation(newRelation);
        setIsOkRelation(true)
      }
      if (newRelation.object) {
        setNewFreeResultObjects(newFreeResultObjects.filter((obj)=>obj.id !== newRelation.object?.id))
      }
      if (newRelation.resultEntity) {
        setNewFreeHoverObjects(newFreeHoverObjects.filter((obj)=>obj.id !== newRelation.resultEntity?.id))
      }
    }

  },[newRelation])

  useEffect(()=>{
    setNewFreeHoverObjects(getFreeHoverObjects())
    setNewFreeResultObjects(getFreeEntityToResult())
  },[activeRelation])

  return (
    <div className={styles.behaviourList}>
      <div className={styles.behaviourList__block}>
        <div className={styles.behaviourList__item}>
          <img src='/icons/checkbox/activeDisable.svg'/>
          <p className={styles.behaviourList__text}>При нажатии - появляется в коллекции</p>
        </div>
      </div>
      <div className={styles.behaviourList__block}>
        <div className={styles.behaviourList__item}>
          <img src='/icons/checkbox/activeDisable.svg'/>
          <p className={styles.behaviourList__text}>После использования исчезает из коллекции</p>
        </div>
      </div>
      <div className={styles.behaviourList__block}>
        <div onClick={()=>setDisplayAdd(!displayAdd)} 
          style={{ cursor: 'pointer' }} 
          className={`${styles.behaviourList__item} ${displayAdd ? styles.behaviourList__item_active : ''}`}
        >
          <img src={`/icons/radiobutton/${isOkRelation ? 'active' : 'disable'}.svg`} />
          <p className={`${styles.behaviourList__text} ${displayAdd ? styles.behaviourList__item_active : ''}`}>{
            `При наведении на ${newRelation ? newRelation.object ? newRelation.object.name : '____' : '____'} 
            появляется новый ${newRelation ? newRelation.resultEntity ? newRelation.resultEntity.name : '____' : '____'}`}</p>
          <img src={`/icons/menu/${displayAdd ? 'open' : 'close'}.svg`} />
        </div>
        {displayAdd &&
        <>
          <div className={styles.addList}>
            <p>Выберите объект для наведения:</p>
            {deletePairSubject(newFreeHoverObjects, true).map((object) => (
              <p key={`${object.id}--hover`} onClick={() => { addHover(object as Object) }} className={styles.addList__item}>{object.title}</p>
            ))}
          </div>
          <div className={styles.addList}>
            <p>Выберите объект или предмет для появления:</p>
            {deletePairSubject(newFreeResultObjects, false).map((object) => (
              <p key={`${object.id}--result`} onClick={() => { addResult(object) }} className={styles.addList__item}>{object.title}</p>
            ))}
          </div>
        </>}
      </div>
    </div>
  )
}