import { Subject } from '@/types/subject'
import styles from './rightPanel.module.scss'
import { StrippedRoom } from '@/types/room'
import { Object } from '@/types/object'
import { useEffect, useState } from 'react'
import { Relation, RelationType } from '@/types/relation'

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

  const [newRelation, setNewRelation] = useState<Partial<typeof activeRelation>>(activeRelation)
  const [activeRelationType, setActiveRelationType] = useState<RelationType | undefined>(newRelation ? newRelation.type : 'object')

  useEffect(()=>{

  }, [])

  return (
    <div className={styles.behaviourList}>
      <div className={styles.behaviourList__block}>
        <div style={{cursor: 'pointer', justifyContent: 'flex-start'}} onClick={()=>setActiveRelationType('object')} className={styles.behaviourList__item}>
          <img src={`/icons/radiobutton/${activeRelationType === 'object' ? 'active' : 'disable'}.svg`} />
          <p className={styles.behaviourList__text}>При соединении...</p>
        </div>
        <div className={styles.behaviourList__mode}>
          <div style={{cursor: 'pointer', justifyContent: 'flex-start'}} onClick={()=>setActiveRelationType(undefined)} className={styles.behaviourList__item}>
            <img src={`/icons/radiobutton/${activeRelationType !== 'object' ? 'active' : 'disable'}.svg`}/>
            <p className={styles.behaviourList__text}>При нажатии...</p>
          </div>
        </div>
      </div>
    </div>
  )
}