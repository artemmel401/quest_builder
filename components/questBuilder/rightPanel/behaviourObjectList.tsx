import { Subject } from '@/types/subject'
import styles from './rightPanel.module.scss'
import { StrippedRoom } from '@/types/room'
import { Object } from '@/types/object'
import { act, useEffect, useState } from 'react'
import { Relation, RelationType } from '@/types/relation'
import { nanoid } from 'nanoid'
import { isRelation } from '@/utils'
import { Input } from '@/components/input/input'
import { ExitType } from '@/types/template'

type BehaviourObjectListProps = {
  templateType: ExitType
  activeObject: Object
  activeRelation: Relation | undefined
  getFreeSubjects: () => Subject[]
  getFreeEntityToResult: () => (Object | Subject)[]
  getFreeRooms: () => StrippedRoom[]
  hintText?: string
  addNewRelation: (newRelation: Relation) => void
}

export default function BehaviourObjectList({
  activeObject, activeRelation, templateType, getFreeSubjects, getFreeEntityToResult, getFreeRooms, hintText, addNewRelation
}: BehaviourObjectListProps) {
  const [newRelation, setNewRelation] = useState<Partial<Relation>>(activeRelation ? activeRelation :
    { id: nanoid(), type: 'object', object: { id: activeObject.id, name: activeObject.title } }
  )
  const [newHintText, setNewHintText] = useState(hintText)
  const [displayAdd, setDisplayAdd] = useState(false)
  const [isOkRelation, setIsOkRelation] = useState(activeRelation ? true : false)
  const [newFreeSubjects, setNewFreeSubjects] = useState(getFreeSubjects())
  const [newFreeResultObjects, setNewFreeResultObjects] = useState(getFreeEntityToResult())

  const deletePairSubject = (subjects: (Object | Subject)[], isForHover: boolean) => {
    if (!newRelation) {
      return subjects
    }
    if (newRelation.object && !isForHover) {
      for (const subject of subjects) {
        if (subject.id === newRelation.object.id) {
          return subjects.filter((sub) => (sub.id !== subject.id))
        }
      }
    }
    if (newRelation.type === 'object' && newRelation.resultEntity && isForHover) {
      for (const subject of subjects) {
        if (subject.id === newRelation.resultEntity.id) {
          return subjects.filter((sub) => (sub.id !== subject.id))
        }
      }
    }
    return subjects
  }

  const changeRelationType = (newType: RelationType, isOffDisplay: boolean) => {
    if (newType !== newRelation.type) {
      setNewRelation({ id: newRelation.id, type: newType, object: { id: activeObject.id, name: activeObject.title } })
    } else {
      setDisplayAdd(!displayAdd)
    }
    if (isOffDisplay) {
      setDisplayAdd(false)
    } else {
      setDisplayAdd(true)
    }
  }

  const addHover = (subject: Subject) => {
    setNewFreeSubjects(newFreeSubjects.filter((obj) => obj.id !== subject.id))
    setNewRelation({ ...newRelation, subject: { id: subject.id, name: subject.title } })
  }
  const addResult = (entity: Object | Subject) => {
    setNewFreeResultObjects(newFreeResultObjects.filter((obj) => obj.id !== entity.id))
    setNewRelation({ ...newRelation, resultEntity: { id: entity.id, name: entity.title } })
  }
  const addRoom = (room: StrippedRoom) => {
    if (newRelation.type === 'room'){
      setNewRelation({...newRelation, room: room})
    }
  }
  const confirmText = () => {
    if (newHintText !== '' && newRelation.type === 'text') {
      setNewRelation({...newRelation, text: newHintText})
    }
  }

  useEffect(() => {
    if (isRelation(newRelation)) {
      setIsOkRelation(true)
      setDisplayAdd(false)
      addNewRelation(newRelation)
    } else {
      setIsOkRelation(false)
    }
  }, [newRelation])

  return (
    <div className={styles.behaviourList}>
      <div className={styles.behaviourList__block}>
        <div className={styles.behaviourList__item}>
          <img src='/icons/checkbox/activeDisable.svg'/>
          <p className={styles.behaviourList__text}>При наведении чуть увеличивается масштаб</p>
        </div>
        <div className={styles.behaviourList__item}>
          <img src='/icons/checkbox/activeDisable.svg'/>
          <p className={styles.behaviourList__text}>После использования исчезает с игрового поля</p>
        </div>
      </div>
      <div className={styles.behaviourList__block}>
        <div style={{ cursor: 'pointer', justifyContent: 'flex-start' }} onClick={() => changeRelationType('object', true)} className={styles.behaviourList__item}>
          <img src={`/icons/radiobutton/${newRelation.type === 'object' ? 'active' : 'disable'}.svg`} />
          <p className={styles.behaviourList__text}>При соединении...</p>
        </div>
        <div className={styles.behaviourList__mode}>
          <div style={{ cursor: 'pointer', justifyContent: 'flex-start' }} onClick={() => changeRelationType('room', true)} className={styles.behaviourList__item}>
            <img src={`/icons/radiobutton/${newRelation.type !== 'object' ? 'active' : 'disable'}.svg`} />
            <p className={styles.behaviourList__text}>При нажатии...</p>
          </div>
        </div>
      </div>
      {newRelation.type === 'object' ?
        <div className={styles.behaviourList__block}>
          <div onClick={() => setDisplayAdd(!displayAdd)}
            style={{ cursor: 'pointer' }}
            className={`${styles.behaviourList__item} ${displayAdd ? styles.behaviourList__item_active : ''}`}
          >
            <img src={`/icons/radiobutton/${isOkRelation ? 'active' : 'disable'}.svg`} />
            <p className={`${styles.behaviourList__text} ${displayAdd ? styles.behaviourList__item_active : ''}`}>{
              `с ${newRelation.subject ? newRelation.subject.name : '____'} 
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
        </div> :
        <>
          <div className={styles.behaviourList__block}>
            <div onClick={() => changeRelationType('room', false)}
              style={{ cursor: 'pointer' }}
              className={`${styles.behaviourList__item} ${newRelation.type === 'room' && displayAdd ? styles.behaviourList__item_active : ''}`}
            >
              <img src={`/icons/radiobutton/${newRelation.type === 'room' && isOkRelation ? 'active' : 'disable'}.svg`} />
              <p className={`${styles.behaviourList__text} ${newRelation.type === 'room' && displayAdd ? styles.behaviourList__item_active : ''}`}>{`происходит переход в комнату ${newRelation.type === 'room' && newRelation.room ? newRelation.room.name : '____'}`}</p>
              <img src={`/icons/menu/${newRelation.type === 'room' && displayAdd ? 'open' : 'close'}.svg`} />
            </div>
            {newRelation.type === 'room' && displayAdd &&
              <>
                <div className={styles.addList}>
                  {getFreeRooms().map((room) => (
                    <p key={`${room.id}`} onClick={() => { addRoom(room) }} className={styles.addList__item}>{room.name}</p>
                  ))}
                </div>
              </>}
          </div>
          <div className={styles.behaviourList__block}>
            <div onClick={() => changeRelationType('text', false)}
              style={{ cursor: 'pointer' }}
              className={`${styles.behaviourList__item} ${newRelation.type === 'text' && displayAdd ? styles.behaviourList__item_active : ''}`}
            >
              <img src={`/icons/radiobutton/${newRelation.type === 'text' && isOkRelation ? 'active' : 'disable'}.svg`} />
              <p className={`${styles.behaviourList__text} ${newRelation.type === 'text' && displayAdd ? styles.behaviourList__item_active : ''}`}>{`появляется текст в виде подсказки`}</p>
              <img src={`/icons/menu/${newRelation.type === 'text' && displayAdd ? 'open' : 'close'}.svg`} />
            </div>
            {newRelation.type === 'text' && displayAdd &&
              <>
                <div className={styles.addList}>
                  <Input value={newHintText} onBlur={confirmText} label='Введите подсказку' placeholder='Введите подсказку' onChange={(value) => setNewHintText(value.toString())}/>
                </div>
              </>}
          </div>
          {templateType === 'object' && 
          <div className={styles.behaviourList__block}>
            <div onClick={() => changeRelationType('exit', false)}
              style={{ cursor: 'pointer' }}
              className={`${styles.behaviourList__item} ${newRelation.type === 'exit' && displayAdd ? styles.behaviourList__item_active : ''}`}
            >
              <img src={`/icons/radiobutton/${newRelation.type === 'exit' && isOkRelation ? 'active' : 'disable'}.svg`} />
              <p className={`${styles.behaviourList__text} ${newRelation.type === 'exit' && displayAdd ? styles.behaviourList__item_active : ''}`}>{`происходит выход из квеста`}</p>
            </div>
          </div>}
          <div className={styles.behaviourList__block}>
            <div onClick={() => changeRelationType('question', false)}
              style={{ cursor: 'pointer' }}
              className={`${styles.behaviourList__item} ${newRelation.type === 'question' && displayAdd ? styles.behaviourList__item_active : ''}`}
            >
              <img src={`/icons/radiobutton/${newRelation.type === 'question' && isOkRelation ? 'active' : 'disable'}.svg`} />
              <p className={`${styles.behaviourList__text} ${newRelation.type === 'question' && displayAdd ? styles.behaviourList__item_active : ''}`}>{`появляется задание`}</p>
              <img src={`/icons/menu/${newRelation.type === 'question' && displayAdd ? 'open' : 'close'}.svg`} />
            </div>
            {(newRelation.type === 'question') && displayAdd &&
              <>
                <p className={`${styles.behaviourList__text}`}>{
                  `При правильном ответе появлется "${newRelation.resultEntity ? newRelation.resultEntity.name : '____'}"`}
                  </p>
                <div className={styles.addList}>
                  {getFreeEntityToResult().filter((entity) => entity.id !== activeObject.id).map((entity) => (
                    <p key={`${entity.id}`} onClick={() => { addResult(entity) }} className={styles.addList__item}>{entity.title}</p>
                  ))}
                </div>
              </>}
            {templateType === 'list' &&
              <div onClick={() => changeRelationType('questionList', false)}
                style={{ cursor: 'pointer' }}
                className={`${styles.behaviourList__item}`}
              >
                <img src={`/icons/radiobutton/${newRelation.type === 'questionList' && isOkRelation ? 'active' : 'disable'}.svg`} />
                <p className={`${styles.behaviourList__text} ${newRelation.type === 'questionList'}`}>{`появляется задание в списке заданий `}</p>
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}