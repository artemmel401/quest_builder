import { useEffect, useState } from 'react'
import styles from './rightPanel.module.scss'
import { Subject } from '@/types/subject'
import { Object } from '@/types/object'
import { Position } from '@/types/position'
import BehaviourSubjectList from './behaviourSubjectList'
import { Relation } from '@/types/relation'
import BehaviourObjectList from './behaviourObjectList'
import { StrippedRoom } from '@/types/room'
import { ExitType } from '@/types/template'

type RightPanelProps = {
  selectedEntity: Subject | Object
  relations: Relation[]
  updateRelations: (newRelations: Relation[]) => void
  onChangeTitle: (value: string) => void
  changeSize: (value: number, field: "x" | "y") => void
  changePosition: (value: number, field: keyof Position) => void
  roomIds: StrippedRoom[]
  allSubjects: Subject[]
  allObjects: Object[]
  templateType: ExitType
}

export default function RightPanel({ 
  selectedEntity, relations, roomIds, allObjects, allSubjects, templateType,
  updateRelations, onChangeTitle, changeSize, changePosition
}: RightPanelProps) {

  const [isDisplayInput, setIsDisplayInput] = useState(false)

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const onChangeSize = (value: string, field: 'x' | 'y') => {
    changeSize(parseInt(value), field)
  }
  const onChangePostition = (value: string, field: keyof Position) => {
    changePosition(parseInt(value), field)
  }

  const getFreeObjectsToHover = () => {
    let resultObjects = [...allObjects]
    for (const relation of relations) {
      if (relation.type === 'object') {
        resultObjects = resultObjects.filter((obj)=>obj.id !== relation.object.id)
      }
    }
    return resultObjects
  }
  const getFreeEntityToResult = () => {
    let resultEntity = [...allObjects, ...allSubjects]
    for (const relation of relations) {
      if (relation.type === 'object') {
        resultEntity = resultEntity.filter((obj)=>obj.id !== relation.resultEntity.id)
      }
    }
    
    return resultEntity
  }
  const getActvieSubjectRelation = () => {
    for (const relation of relations) {
      if (relation.type === 'object' && relation.subject.id === selectedEntity.id) {
        return relation
      }
    }
  }
  const getActiveObjectRelation = () => {
    for (const relation of relations) {
      if (relation.object.id === selectedEntity.id) {
        return relation
      }
    }
  }
  
  const getFreeQuestions = () => {
    return []
  }
  const getFreeRooms = () => {
    let rooms = [...roomIds]
    return rooms
  }
  const getFreeSubjects = () => {
    let subjects = [...allSubjects]
    for (const relation of relations) {
      if (relation.type === 'object') {
        subjects = subjects.filter((subject)=>(subject.id !== relation.object.id))
      }
    }
    return subjects
  }

  const updateRelationList = (relation: Relation) => {
    const newRealtions = [...relations];
    let found = false;
  
    for (let i = 0; i < newRealtions.length; i++) {
      if (newRealtions[i].id === relation.id) {
        newRealtions[i] = { ...relation };
        found = true;
        break;
      }
    }
  
    if (!found) {
      newRealtions.push(relation);
    }
    console.log(newRealtions, 'new')
    updateRelations(newRealtions);
  };

  useEffect(() => {
    console.log(selectedEntity)
    setIsDisplayInput(false);
    setActiveTabIndex(0);
  }, [selectedEntity.id]); 

  return (
    <div className={styles.container}>
      <div className={styles.container__input}>
        <input className={styles.container__inputTitle} disabled={!isDisplayInput} value={selectedEntity.title} onChange={(e) => { onChangeTitle(e.target.value) }} />
        <svg
          onClick={() => setIsDisplayInput(!isDisplayInput)}
          className={styles.container__inputImg} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.2126 5.68135L2 13.8939V18.0002H6.10629L14.3189 9.78762M10.2126 5.68135L13.1574 2.73646L13.1593 2.73471C13.5646 2.32934 13.7676 2.12629 14.0017 2.05025C14.2079 1.98325 14.43 1.98325 14.6362 2.05025C14.87 2.12624 15.0729 2.32905 15.4777 2.73385L17.2637 4.51988C17.6702 4.92643 17.8736 5.12979 17.9498 5.36419C18.0168 5.57036 18.0167 5.79245 17.9498 5.99864C17.8737 6.23286 17.6706 6.43592 17.2646 6.84188L17.2637 6.84275L14.3189 9.78762M10.2126 5.68135L14.3189 9.78762" stroke="#333333" strokeWidth="2.48089" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tabs__content}>
          <p
            onClick={() => setActiveTabIndex(0)}
            className={`${styles.tabs__tab} ${activeTabIndex === 0 ? styles.tabs__tab_active : ''}`}>
            Свойства
          </p>
          <p
            onClick={() => setActiveTabIndex(1)}
            className={`${styles.tabs__tab} ${activeTabIndex === 1 ? styles.tabs__tab_active : ''}`}>
            Поведение
          </p>
        </div>
      </div>
      <div className={styles.content}>
        {activeTabIndex === 0 && <div className={styles.position}>
          <p className={styles.position__title}>размер и угол</p>
          <div className={styles.position__size}>
            <div className={styles.position__content}>
              <span className={styles.position__subTitle}>B</span>
              <input onChange={(e)=>onChangeSize(e.target.value, 'y')} className={styles.position__input} value={selectedEntity.size !== 'default' ? selectedEntity.size.y : 96} />
            </div>
            <div className={styles.position__content}>
              <span className={styles.position__subTitle}>Ш</span>
              <input onChange={(e)=>onChangeSize(e.target.value, 'x')} className={styles.position__input} value={selectedEntity.size !== 'default' ? selectedEntity.size.x : 96} />
            </div>
            <div className={styles.position__content}>
              <span className={styles.position__subTitle}>У</span>
              <input onChange={(e)=>onChangePostition(e.target.value, 'rotate')} className={styles.position__input} value={selectedEntity.position.rotate%360}/>
            </div>
          </div>
          <p className={styles.position__title}>Положение</p>
          <div style={{justifyContent: 'flex-start'}} className={styles.position__size}>
            <div className={styles.position__content}>
              <span className={styles.position__subTitle}>X</span>
              <input onChange={(e)=>onChangePostition(e.target.value, 'x')} className={styles.position__input} value={selectedEntity.position.x} />
            </div>
            <div className={styles.position__content}>
              <span className={styles.position__subTitle}>Y</span>
              <input onChange={(e)=>onChangePostition(e.target.value, 'y')}  className={styles.position__input} value={selectedEntity.position.y} />
            </div>
          </div>
          <div className={styles.position__buttons}>
            <button onClick={()=>onChangePostition((selectedEntity.position.y - 10).toString(), 'y')} className={styles.position__button}><img src={'/icons/up.svg'}/></button>
            <button onClick={()=>onChangePostition((selectedEntity.position.y + 10).toString(), 'y')} className={styles.position__button}><img src={'/icons/down.svg'}/></button>
            <button onClick={()=>onChangePostition((selectedEntity.position.rotate + 90).toString(), 'rotate')} className={styles.position__button}><img src={'/icons/rotateRight.svg'}/></button>
            <button onClick={()=>onChangePostition((selectedEntity.position.rotate + 180).toString(), 'rotate')} className={styles.position__button}><img src={'/icons/rotateUp.svg'}/></button>
          </div>
        </div>
        }
        {
          activeTabIndex === 1 && selectedEntity.type === 'subject' && 
            <BehaviourSubjectList 
              activeSubject={selectedEntity}
              activeRelation={getActvieSubjectRelation()}
              getFreeEntityToResult={getFreeEntityToResult}
              getFreeHoverObjects={getFreeObjectsToHover} 
              addNewRelation={updateRelationList} 
            />
        }
        {
          activeTabIndex === 1 && selectedEntity.type === 'object' &&
            <BehaviourObjectList
              templateType={templateType}
              activeObject={selectedEntity}
              activeRelation={getActiveObjectRelation()}
              addNewRelation={updateRelationList}
              getFreeEntityToResult={getFreeEntityToResult} 
              getFreeRooms={getFreeRooms}
              getFreeSubjects={getFreeSubjects}
            />
        }
      </div>
    </div>
  )
}