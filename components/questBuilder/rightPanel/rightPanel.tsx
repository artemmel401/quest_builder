import { useEffect, useState } from 'react'
import styles from './rightPanel.module.scss'
import { Subject } from '@/types/subject'
import { Click, ClickType, Object } from '@/types/object'
import { Position } from '@/types/position'
import { ClickTypeList } from '@/consts/click'
import { itemIsSubject } from '@/utils'

type RightPanelProps = {
  selectedEntity: Subject | Object
  onChangeTitle: (value: string) => void
  changeHoverWith: (object: Object, subject: Subject) => void
  changeHoverResult: (resultObject: Object, subject: Subject, objectId: string) => void
  changeSize: (value: number, field: "x" | "y") => void
  changePosition: (value: number, field: keyof Position) => void
  changeClick: (object: Object, clicktype: ClickType) => void
  freeObjectsToHover: Object[]
  freeSubjects: Subject[]
  freeObjectsToHoverResult: Object[]
  roomIds: {name: string, id: string}[]
}

type BehaviourSubjectListType = {
  title: string;
  isOk?: boolean;
  list?: Object[];
  secondList?: Object[];
  clickList?: {title: string, name: Click}[]
  roomIds?: {name: string, id: string}[]
}

type Action = 'hover' | 'hoverResult'

export default function RightPanel({ 
  selectedEntity, 
  freeSubjects, freeObjectsToHover, freeObjectsToHoverResult, roomIds, 
  onChangeTitle, changeHoverWith, changeHoverResult, changeSize, changePosition, changeClick
}: RightPanelProps) {

  const [isDisplayInput, setIsDisplayInput] = useState(false)

  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const [entity, setEntity] = useState(selectedEntity)

  const itemIsSubject = (item: Subject | Object): item is Subject => {
    return 'roomId' in item
  }

  const [behaviourSubjectList, setBehaviourSubjectList] = useState<BehaviourSubjectListType[]>([])

  const changeEntity = (point: Subject | Object, action: Action, result?: Object) => {
    switch (action) {
      case 'hover':
        onChangeHoverWith(point)
        break
    }
  }

  const onChangeHoverWith = (point: Subject | Object) => {
    if (itemIsSubject(point) && !itemIsSubject(selectedEntity)) {
      changeHoverWith(selectedEntity, point)
    } else if (!itemIsSubject(point) && itemIsSubject(selectedEntity)) {
      changeHoverWith(point, selectedEntity)
    }
  }
  const onChangeHoverResult = (result: Object) => {
    if (itemIsSubject(selectedEntity) && selectedEntity.hoverWith) {
      changeHoverResult(result, selectedEntity, selectedEntity.hoverWith)
    }
  }

  const onChangeSize = (value: string, field: 'x' | 'y') => {
    changeSize(parseInt(value), field)
  }
  const onChangePostition = (value: string, field: keyof Position) => {
    changePosition(parseInt(value), field)
  }
  const onChangeClick = (object: Object, clicktype: ClickType) => {
    changeClick(object, clicktype)
  }

  useEffect(() => {
    setEntity(selectedEntity)
    let newBehaviourSubjectList: BehaviourSubjectListType[] = [];
    if (itemIsSubject(selectedEntity)) {
      newBehaviourSubjectList = [
        { title: `При наведении на предмет он исчезает из коллекции` },
        {
          title: `При наведении на объект "${selectedEntity.hoverWithName ? selectedEntity.hoverWithName : '...'}” появляется новый объект 
          "${selectedEntity.hoverResultName ? selectedEntity.hoverResultName : '...'}"`,
          isOk: selectedEntity.hoverWithName ? true : false,
          list: freeObjectsToHover,
          secondList: freeObjectsToHoverResult
        },
      ];
    } else {
      newBehaviourSubjectList = [
        { title: `При наведении увеличивается масштаб` },
        {
          title: `При наведении предмета "${selectedEntity.hoverWithName ? selectedEntity.hoverWithName : '...'}” появляется новый объект 
          "${selectedEntity.hoverResultName ? selectedEntity.hoverResultName : '...'}"`,
          isOk: selectedEntity.hoverWithName ? true : false,
          list: freeSubjects,
          secondList: freeObjectsToHoverResult
        },
        {
          title: `По нажатию`,
          isOk: selectedEntity.onClick ? true : false,
          clickList: ClickTypeList,
          list: [],
          roomIds: roomIds
        }
      ];
    }
    setBehaviourSubjectList(newBehaviourSubjectList);
  }, [selectedEntity])

  return (
    <div className={styles.container}>
      <div className={styles.container__input}>
        <input className={styles.container__inputTitle} disabled={!isDisplayInput} value={entity.title} onChange={(e) => { onChangeTitle(e.target.value) }} />
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
          activeTabIndex === 1 &&
          <>
            {behaviourSubjectList.map((point) => (
              <BehaviourList
                selectedEntity={selectedEntity}
                key={point.title}
                title={point.title}
                isOk={point.isOk}
                list={point.list}
                clickList={point.clickList}
                secondList={point.secondList}
                roomIds={point.roomIds}
                changeSelected={changeEntity}
                changeHoverResult={onChangeHoverResult} 
                changeClickAction={onChangeClick}/>
            ))}
          </>
        }
      </div>
    </div>
  )
}

type BehaviourListProps = {
  title: string
  isOk?: boolean
  list?: (Object | Subject)[]
  secondList?: (Object)[]
  clickList?: {title: string, name: Click}[]
  selectedEntity: Object | Subject
  roomIds?: {name: string, id: string}[]
  changeSelected: (item: Object | Subject, action: Action, result?: Object) => void
  changeHoverResult?: (result: Object) => void
  changeClickAction?: (item: Object, clickType: ClickType) => void
}
function BehaviourList({ title, list, isOk, secondList, clickList, selectedEntity, roomIds, changeSelected, changeClickAction, changeHoverResult }: BehaviourListProps) {

  const [displayList, setIsDisplayList] = useState(false)

  const [notFullSelected, setNotFullSelected] = useState<Click>()

  const [inputValue, setInputValue] = useState<string>()

  const getClickName = () => {
    if (itemIsSubject(selectedEntity)){
      return ''
    } else {
      if (selectedEntity.onClick) {
        return `${getTitleClickByName(selectedEntity.onClick.type)} ${selectedEntity.onClick.content.length !== 0 ? `"${selectedEntity.onClick.content}"` : ''}`
      } else if (notFullSelected){
        return getTitleClickByName(notFullSelected)
      }
      return ''
    }
  }

  const selectFirstClickList = (name: Click) => {
    if (name === 'room'){
      setNotFullSelected(name)
    } else if (!itemIsSubject(selectedEntity) && changeClickAction) {
      changeClickAction(selectedEntity, {id: '', content: '', type: name})
    }

  }

  const getTitleClickByName = (name: Click) => {
    if (!ClickTypeList){
      return
    } 
    return ClickTypeList.filter((type)=>type.name === name)[0].title
  }

  const isDisplayRoomInList = (roomId: string) => {
    if (!itemIsSubject(selectedEntity) && selectedEntity.onClick){
      return !(selectedEntity.onClick.id === roomId)
    }
    return true
  }

  useEffect(()=>{
    if (!itemIsSubject(selectedEntity)){
      setInputValue(selectedEntity.onClick?.content)
    }
  },[])

  return (
    <div className={styles.behaviourList}>
      <div onClick={() => setIsDisplayList(list ? !displayList : false)} style={list && { cursor: 'pointer' }} className={`${styles.behaviourList__content} ${displayList && styles.behaviourList__content_active}`}>
        {(isOk || !list) &&
          <div className={styles.behaviourList__icon}>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.7929 3.29289C13.1834 2.90237 13.8166 2.90237 14.2071 3.29289C14.5976 3.68342 14.5976 4.31658 14.2071 4.70711L7.20711 11.7071C7.15829 11.7559 7.10569 11.7986 7.05024 11.8352C6.66209 12.0915 6.1346 12.0488 5.7929 11.7071L2.79289 8.70711C2.40237 8.31658 2.40237 7.68342 2.79289 7.29289C3.18342 6.90237 3.81658 6.90237 4.20711 7.29289L6.5 9.58579L12.7929 3.29289Z" fill="#006666" />
            </svg>
          </div>}
        {!clickList && <p className={styles.behaviourList__title}>{title}</p>}
        {clickList && <p className={styles.behaviourList__title}>{`${title} ${getClickName()}`}</p>}
        {list &&
          <div className={styles.behaviourList__arrow}>
            <svg className={`${displayList ? styles.behaviourList__arrow_transform : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M21.0002 8.00025C21.0002 8.25625 20.9023 8.51225 20.7073 8.70725L12.7072 16.7072C12.3162 17.0982 11.6842 17.0982 11.2933 16.7072L3.29325 8.70725C2.90225 8.31625 2.90225 7.68425 3.29325 7.29325C3.68425 6.90225 4.31625 6.90225 4.70725 7.29325L12.0002 14.5862L19.2932 7.29325C19.6842 6.90225 20.3162 6.90225 20.7073 7.29325C20.9023 7.48825 21.0002 7.74425 21.0002 8.00025Z" fill={displayList ? "#006666" : "#333333"} />
            </svg>
          </div>}
      </div>
      {list && displayList && secondList && <div>
        <p className={styles.behaviourList__title}>При наведении на:</p>
        {list.map((item) => (
          (selectedEntity.hoverResult && item.id === selectedEntity.hoverResult) ||
          <p key={item.id} onClick={() => changeSelected(item, 'hover')} className={styles.behaviourList__point}>{item.title}</p>
        ))}
        <>
          {selectedEntity.hoverWith && changeHoverResult &&
            <>
              <p className={styles.behaviourList__title}>Появляется:</p>
              {
                secondList.map((item) => (
                  (item.id === selectedEntity.hoverWith) ||
                  <p key={item.id} 
                    onClick={() => changeHoverResult(item)} 
                    className={styles.behaviourList__point}>
                    {item.title}
                  </p>
                ))}
            </>
          }
        </>
      </div>}
      {!notFullSelected && clickList && !itemIsSubject(selectedEntity) && (!selectedEntity.onClick) && clickList.map((item) => (
        <p key={item.name}
          onClick={()=>selectFirstClickList(item.name)}
          className={styles.behaviourList__point}>
          {item.title}
        </p>
      ))}
      {(notFullSelected === 'room' || 
      (!itemIsSubject(selectedEntity) && selectedEntity.onClick?.type === 'room') ) && changeClickAction && roomIds &&
      roomIds.map((room)=>(
        isDisplayRoomInList(room.id) && <p key={room.id}
        onClick={()=>{changeClickAction(selectedEntity, {id: room.id, type: 'room', content: room.name});setNotFullSelected(undefined)}}
        className={styles.behaviourList__point}>
        {room.name}
      </p>
      ))}
      {roomIds && changeClickAction && !itemIsSubject(selectedEntity) && (notFullSelected === 'text' || selectedEntity.onClick?.type == 'text') &&
        <div className={styles.behaviourList__answerBlock}>
          <p className={styles.behaviourList__point}>Текст подсказки</p>
          <input 
            onChange={(e)=>{setInputValue(e.target.value)}}
            value={inputValue}
            onBlur={(e)=>{changeClickAction(selectedEntity, {id: '', type: 'text', content: e.target.value})}} 
            className={styles.behaviourList__input}
          />
        </div>
      }
    </div>
  )
}