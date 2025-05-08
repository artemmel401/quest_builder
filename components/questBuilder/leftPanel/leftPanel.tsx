import { useEffect, useState } from 'react'
import styles from './leftPanel.module.scss'
import { Room } from '@/types/room'
import { BackgroundType } from '@/types/background'
import { Button } from '@/components/button/button'
import { getDirectoriesInDirectory, getFilesFromDirectory } from '@/utils/requests'
import { EntityType } from '@/types/entity'
import { FileInput } from '@/components/input/input'
import { BASKET_URL } from '@/const'

type LeftPanelProps = {
  rooms: Room[]
  selectedRoomId?: string
  templateId: string
  changeSelectedImage: (image?:{type: EntityType, src: string}) => void
  changeActiveRoom: (id: string) => void
  createRoom: () => void
  changeBackground: (newValue: string, roomId: string) => void
  createUserImage: (url: string, type: 'Room' | EntityType) => void
  deleteUserImage: (url: string) => void
  userImages: {url: string, type: 'Room' | EntityType}[]
}


export default function LeftPanel(
  {rooms, selectedRoomId, changeBackground, changeSelectedImage, changeActiveRoom, createRoom, templateId, createUserImage, userImages, deleteUserImage}
  :LeftPanelProps
){

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [isDisplay, setIsDisplay] = useState(false)
  const [backgrounds, setBackgrounds] = useState<string[]>([])
  const [objectNames, setObjectNames] = useState<{directory: string, files: string[]}[]>([])

  const acceptedFiles = ['png', 'jpeg', 'jpg', 'bmp', 'JPEG', 'JPG'];

  async function updateFileContent(file: File, type: 'Room' | EntityType) {
    const formData = new FormData();
    formData.append('activityNumber', templateId);
    formData.append('file', file);
    let response = await fetch('/api/s3/upload', {
      method: 'POST',
      headers: {},
      body: formData
    });
    const result = await response.json();
    console.log(result)
    if (result.result === 'ok') {
      createUserImage(result.url, type)
      return 'done'
    }
    else return 'error';
  }
  async function deleteFileContent(previewImage: string) {
    let response = await fetch('/api/s3/delete', {
      method: 'POST', headers: {}, body: previewImage.replace(`${BASKET_URL}`, ''),
    });
    const result = await response.json();
    if (result.result === 'ok') {
      deleteUserImage(previewImage)
      return 'done'
    }
    else return 'error';
  }

  const isCanDeleteImage = (url: string) => {
    return !rooms.some((room)=>room.background.value === url)
  }

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
    <div className={`${styles.container} ${!isDisplay ? styles.container_hide : ''}`}>
      {isDisplay ?<div className={styles.content}>
        <div className={styles.container__tabs}>
          <Tab name='комнаты' icon='/questBuilder/edit/tabs/room.svg' isActive={selectedTabIndex === 0} onClick={() => { setSelectedTabIndex(0) }} />
          <Tab name='фон' icon='/questBuilder/edit/tabs/background.svg' isActive={selectedTabIndex === 1} onClick={() => { selectedRoomId && setSelectedTabIndex(1) }} />
          <Tab name='объекты' icon='/questBuilder/edit/tabs/object.svg' isActive={selectedTabIndex === 2} onClick={() => { selectedRoomId && setSelectedTabIndex(2) }} />
          <Tab name='предметы' icon='/questBuilder/edit/tabs/subject.svg' isActive={selectedTabIndex === 3} onClick={() => { selectedRoomId && setSelectedTabIndex(3) }} />
        </div>
        <div className={styles.container__content}>
          {selectedTabIndex === 0 &&
            <div className={styles.rooms}>
              {rooms.map((room) => (
                <RoomPreview isActive={selectedRoomId === room.id} key={room.id} title={room.title} background={room.background}
                  onClick={() => { changeActiveRoom(room.id) }}
                />))}
              {rooms.length === 0 && <p className={styles.container__emptyRooms}>Не создано ни одной комнаты<br />
                Для создания нажмите на кнопку</p>}
              <div className={styles.container__createRoom}>
                <Button text='Создать комнату' mainClass='ld_button_secondary2' onClick={createRoom} />
              </div>
            </div>
          }
          {selectedRoomId && selectedTabIndex === 1 &&
            <>
            <div className={styles.fileInput}>
              <FileInput acceptedFiles={acceptedFiles}
                moveOrClick={'Перетащите сюда файлы или нажмите, чтобы загрузитиь изображение или аудио'}
                format={'Формат: PNG, JPEG, до 20 МБ'}
                previewImage={undefined}
                disabled={false}
                onDeleteFileContent={async () => { return await deleteFileContent('image') }}
                onChange={async (file) => { return await updateFileContent(file, 'Room') }}
              />
            </div>
            {userImages.filter((image)=>image.type === 'Room').map((background) => (
              <div
                onClick={() => { changeBackground(background.url, selectedRoomId) }}
                style={{ backgroundImage: `url(${background.url})` }}
                key={background.url} className={`${styles.room}`}>
                {isCanDeleteImage(background.url)&&
                <svg onClick={(e) => { e.stopPropagation(); deleteFileContent(background.url) }} className={styles.room__delete} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9999 6.73046C20.9799 6.73046 20.9499 6.73046 20.9199 6.73046C15.6299 6.20046 10.3499 6.00046 5.11992 6.53046L3.07992 6.73046C2.65992 6.77046 2.28992 6.47046 2.24992 6.05046C2.20992 5.63046 2.50992 5.27046 2.91992 5.23046L4.95992 5.03046C10.2799 4.49046 15.6699 4.70046 21.0699 5.23046C21.4799 5.27046 21.7799 5.64046 21.7399 6.05046C21.7099 6.44046 21.3799 6.73046 20.9999 6.73046Z" fill="#EF302B" />
                  <path d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z" fill="#EF302B" />
                  <path d="M15.2099 22.7496H8.7899C5.2999 22.7496 5.1599 20.8196 5.0499 19.2596L4.3999 9.18959C4.3699 8.77959 4.6899 8.41959 5.0999 8.38959C5.5199 8.36959 5.8699 8.67959 5.8999 9.08959L6.5499 19.1596C6.6599 20.6796 6.6999 21.2496 8.7899 21.2496H15.2099C17.3099 21.2496 17.3499 20.6796 17.4499 19.1596L18.0999 9.08959C18.1299 8.67959 18.4899 8.36959 18.8999 8.38959C19.3099 8.41959 19.6299 8.76959 19.5999 9.18959L18.9499 19.2596C18.8399 20.8196 18.6999 22.7496 15.2099 22.7496Z" fill="#EF302B" />
                  <path d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z" fill="#EF302B" />
                  <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="#EF302B" />
                </svg>}
              </div>
              ))}
            {backgrounds.map((background) => (
              <div
                onClick={() => { changeBackground('/img/backgrounds/' + background, selectedRoomId) }}
                style={{ backgroundImage: `url(/img/backgrounds/${background})` }}
                key={background} className={`${styles.room}`}>
              </div>
              ))}
            </>}
          {selectedTabIndex !== 1 && selectedTabIndex !== 0 &&
            <>
              <div className={styles.fileInput}>
              <FileInput acceptedFiles={acceptedFiles}
                moveOrClick={'Перетащите сюда файлы или нажмите, чтобы загрузитиь изображение'}
                format={'Формат: PNG, JPEG, BMP до 20 МБ'}
                previewImage={undefined}
                disabled={false}
                onDeleteFileContent={async () => { return await deleteFileContent('image') }}
                onChange={async (file) => { return await updateFileContent(file, selectedTabIndex === 2 ? 'Object' : 'Subject') }}
              />
            </div>
            {userImages.filter((image)=>image.type !== 'Room').map((img) => (
              <div onMouseDown={()=>{selectImage(selectedTabIndex === 2 ? 'Object' : 'Subject', `${img.url}`);setIsDisplay(false)}} 
              onMouseUp={()=>{selectImage(selectedTabIndex === 2 ? 'Object' : 'Subject', undefined);setIsDisplay(false)}} key={img.url} style={{maxHeight: 'none'}} className={styles.objectList__point}>
                <img
                  className={styles.objectList__img} src={`${img.url}`}
                />
              </div>
              ))}
              {objectNames.map((el, index) => (
                <div key={`${el.directory}--${index}`} className={styles.container__objects}>
                  <ObjectList
                    onSelect={(src) => selectImage(selectedTabIndex === 2 ? 'Object' : 'Subject', src)}
                    name={el.directory} list={el.files}
                  />
                </div>
              ))}
            </>}
        </div>
        <div onClick={()=>{setIsDisplay(false)}} className={styles.content__closeArrow}>
          <img className={styles.transformArrow} src='/questBuilder/icons/arrowRightWhite.svg'/>
        </div>
      </div> :
      <div onClick={()=>{setIsDisplay(true)}} className={styles.content__arrow}>
        <img src='/questBuilder/icons/arrowRightWhite.svg'/>
      </div>
    }
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

type RoomPreviewProps = {
  background: BackgroundType
  title: string
  isActive: boolean
  onClick: () => void
}

function RoomPreview ({background, title, isActive, onClick}:RoomPreviewProps) {
  return (
    <div 
      onClick={onClick} 
      style={background.type === 'color' ? {backgroundColor: background.value} : {backgroundImage: `url(${background.value})`} } 
      className={`${styles.room} ${isActive ? styles.room_active : ''}`}>
      <p className={styles.room__title}>{title}</p>
    </div>
  )
}

type ObjectListProps = {
  name: string
  list: string[]
  onSelect: (src?: string) => void
}

function ObjectList ({name, list, onSelect}:ObjectListProps) {
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