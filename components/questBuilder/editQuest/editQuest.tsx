import { Quest, QuestContent } from '@/types/quest'
import styles from './editQuest.module.scss'
import LeftPanel from '../leftPanel/leftPanel'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Room } from '@/types/room'
import { nanoid } from 'nanoid'
import { ClickType } from '@/types/object'

type EditQuest = {
  quest: QuestContent
  selectedRoom?: string
  onChangeField: (newValue: any, field: 'rooms' | 'subjects') => void
}

export default function EditQuest({quest, onChangeField}:EditQuest) {

  const [activeRoom, setActiveRoom] = useState<Room | undefined>(quest.rooms[0])
  const [rooms, setRooms] = useState(quest.rooms)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const changeActiveRoom = (id: string) => {
    for (let room of quest.rooms) {
      if (room.id === id) {
        setActiveRoom(room)
        return
      }
    }
  }
  const changeRoomBackground = (newValue: string, roomId: string) => {
    const newRooms = rooms.slice()
    for (let room of newRooms) {
      if (room.id === roomId) {
        room.background = {type: 'file', value: newValue}
        setRooms(newRooms)
        return
      }
    }
  }

  const createRoom = () => {
    const newRooms = rooms.slice()
    newRooms.push({
      id: nanoid(),
      title: `Комната ${rooms.length + 1}`,
      background: {type: 'color', value: '#4f4f4f'},
      objects: []
    })
    setRooms(newRooms)

  }

  const onSelect = (value: string, type: ClickType) => {

  }

  useEffect(()=>{
    onChangeField(rooms, 'rooms')
  },[rooms])

  return (
    <div className={styles.container}>
      <LeftPanel changeBackground={changeRoomBackground} selectedRoomId={activeRoom?.id} onSelect={onSelect} createRoom={createRoom} changeActiveRoom={changeActiveRoom} rooms={quest.rooms} />
      <div className={styles.container__content}>
        {activeRoom ? 
          <div className={styles.content} 
            style={activeRoom.background.type === 'color' ? {backgroundColor: activeRoom.background.value} : {backgroundImage: `url(/img/backgrounds/${activeRoom.background.value})`} }>
            {/* <img className={styles.content__background} width={dimensions.width} height={dimensions.height} src={`/img/backgrounds/${activeRoom.background.value}`}/> */}
          </div> :
          <p className={styles.container__empty}>Выберите комнату или создайте новую</p>
        }
      </div>
    </div>
  )
}