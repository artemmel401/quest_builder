import { useEffect, useState } from 'react'
import styles from './leftPanel.module.scss'
import { Room } from '@/types/room'
import { ClickType } from '@/types/object'
import { BackgroundType } from '@/types/background'
import { Button } from '@/components/button/button'
import { getDirectoriesInDirectory, getFilesFromDirectory } from '@/utils/requests'
import { EntityType } from '@/types/entity'

type LeftPanelProps = {
  rooms: Room[]
  selectedRoomId?: string
  changeSelectedImage: (image?:{type: EntityType, src: string}) => void
  changeActiveRoom: (id: string) => void
  createRoom: () => void
  changeBackground: (newValue: string, roomId: string) => void
}


export default function LeftPanel({rooms, selectedRoomId, changeBackground, changeSelectedImage, changeActiveRoom, createRoom}:LeftPanelProps){

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const [backgrounds, setBackgrounds] = useState<string[]>([])
  const [objectNames, setObjectNames] = useState<{directory: string, files: string[]}[]>([])

  const getBackgrounds = async () => {
    const files:string[] = await getFilesFromDirectory('/img/backgrounds')
    setBackgrounds(files)
  }

  const getObjects = async () => {
    const objects:{name: string, path: string}[] = await getDirectoriesInDirectory('/questBuilder/objects')
    const result = []
    for (const directory of objects) {
      const files = await getFilesFromDirectory(`/questBuilder/objects/${directory.name}`)
      result.push({directory: directory.name, files: files})
    }
    setObjectNames(result)
  }

  const selectImage = (type: EntityType, src: string | undefined) => {
    if (!src) {
      changeSelectedImage()
    } else {
      changeSelectedImage({type, src})
    }
  }

  useEffect(()=>{
    getBackgrounds()
    getObjects()
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.container__tabs}>
        <Tab name='комнаты' icon='/questBuilder/edit/tabs/room.svg' isActive={selectedTabIndex === 0} onClick={()=>{setSelectedTabIndex(0)}}/>
        <Tab name='фон' icon='/questBuilder/edit/tabs/background.svg' isActive={selectedTabIndex === 1} onClick={()=>{selectedRoomId && setSelectedTabIndex(1)}}/>
        <Tab name='объекты' icon='/questBuilder/edit/tabs/object.svg' isActive={selectedTabIndex === 2} onClick={()=>{selectedRoomId && setSelectedTabIndex(2)}}/>
        <Tab name='предметы' icon='/questBuilder/edit/tabs/subject.svg' isActive={selectedTabIndex === 3} onClick={()=>{selectedRoomId && setSelectedTabIndex(3)}}/>
      </div>
      <div className={styles.container__content}>
        {selectedTabIndex === 0 &&
          <div className={styles.rooms}>
            {rooms.map((room)=>(
              <RoomPreview isActive={selectedRoomId === room.id} key={room.id} title={room.title} background={room.background} 
              onClick={()=>{changeActiveRoom(room.id)}}
            />))}
            {rooms.length === 0 && <p className={styles.container__emptyRooms}>Не создано ни одной комнаты<br/>
            Для создания нажмите на кнопку</p>}
            <div className={styles.container__createRoom}>
              <Button text='Создать комнату' mainClass='ld_button_secondary2' onClick={createRoom}/>
            </div>
          </div>
        }
        {selectedRoomId && selectedTabIndex === 1 &&
          <>
          {backgrounds.map((background) => (
            <div 
              onClick={()=>{changeBackground(background, selectedRoomId)}}
              style={{backgroundImage: `url(/img/backgrounds/${background})`}} 
              key={background} className={`${styles.room}`}>
            </div>
          ))}
          </>}
          {selectedTabIndex !== 1 && selectedTabIndex !== 0 && 
          <>
          {objectNames.map((el, index)=>(
            <div key={`${el.directory}--${index}`} className={styles.container__objects}>
              <ObjectList 
                onSelect={(src)=>selectImage(selectedTabIndex === 2 ? 'Object' : 'Subject', src)} 
                name={el.directory} list={el.files}
              />
            </div>
          ))}
          </>}
      </div>
    </div>
  )
}

type TabsProps = {
  name: string
  icon: string
  isActive: boolean
  onClick: () => void
}
function Tab (props:TabsProps){
  return (
    <div onClick={props.onClick} className={`${styles.tab} ${props.isActive ? styles.tab_isActive : ''}`}>
      <img className={styles.tab__icon} src={props.icon}/>
      <p className={styles.tab__text}>{props.name}</p>
      <svg className={styles.tab__arrow} width="36" height="10" viewBox="0 0 36 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.0002 0L35.3207 10H0.679688L18.0002 0Z" fill="white" />
      </svg>
    </div>
  )
}

type RoomPreview = {
  background: BackgroundType
  title: string
  isActive: boolean
  onClick: () => void
}

function RoomPreview ({background, title, isActive, onClick}:RoomPreview) {
  return (
    <div 
      onClick={onClick} 
      style={background.type === 'color' ? {backgroundColor: background.value} : {backgroundImage: `url(/img/backgrounds/${background.value})`} } 
      className={`${styles.room} ${isActive ? styles.room_active : ''}`}>
      <p className={styles.room__title}>{title}</p>
      <img className={styles.room__book} src='/img/openedBook.png'/>
    </div>
  )
}

type ObjectList = {
  name: string
  list: string[]
  onSelect: (src?: string) => void
}

function ObjectList ({name, list, onSelect}:ObjectList) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.objectList__container}>
      <div onClick={()=>{setIsOpen(!isOpen)}} className={styles.objectList__titleBlock}>
        <p className={styles.objectList__title}>{name}</p>
        <img src='/questBuilder/icons/arrowDown.svg'/>
      </div>
      {isOpen && 
        <div className={styles.objectList__list}>
          {list.map((el)=>(
            <div onMouseDown={()=>{onSelect(`/questBuilder/objects/${name}/${el}`)}} 
            onMouseUp={()=>onSelect(undefined)} key={el} className={styles.objectList__point}>
              <img
                className={styles.objectList__img} src={`/questBuilder/objects/${name}/${el}`}
              />
            </div>
          ))}
        </div>
      }
    </div>
  )
}