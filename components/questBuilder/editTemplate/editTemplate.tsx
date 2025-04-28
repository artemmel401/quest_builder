import { TemplateContent } from '@/types/template'
import styles from './editTemplate.module.scss'
import LeftPanel from '../leftPanel/leftPanel'
import { useEffect, useRef, useState } from 'react'
import { Room } from '@/types/room'
import { nanoid } from 'nanoid'
import { Subject } from '@/types/subject'
import { Object } from '@/types/object'
import RightPanel from '../rightPanel/rightPanel'
import { EntityType } from '@/types/entity'
import { itemIsSubject } from '@/utils'
import { Size } from '@/types/size'
import { Position } from '@/types/position'
import { Relation } from '@/types/relation'
import { GameBoard } from '../gameBoard/gameBoard'

type EditTemplateProps = {
  template: TemplateContent
  onChangeField: (newValue: Room[] | Subject[] | Relation[], field: 'rooms' | 'subjects' | 'relations') => void
}

export default function EditTemplate({ template, onChangeField }: EditTemplateProps) {

  const [subjects, setSubjects] = useState<Subject[]>(template.subjects)
  const [activeRoom, setActiveRoom] = useState<Room | undefined>()
  const [rooms, setRooms] = useState(template.rooms)
  const [relations, setRelations] = useState(template.relations)
  const [selectedImage, setSelectedImage] = useState<{ type: EntityType, src: string }>()
  const [seletedSubject, setSeletedSubject] = useState<Subject | Object>()
  const [questionCount, setQuestionCount] = useState(0)

  const contentRef = useRef<HTMLDivElement>(null);

  const changeActiveRoom = (id: string) => {
    for (let room of rooms) {
      if (room.id === id) {
        setSeletedSubject(undefined)
        setActiveRoom(room)
        return
      }
    }
  }
  const changeRoomBackground = (newValue: string, roomId: string) => {
    const newRooms = rooms.slice()
    for (let room of newRooms) {
      if (room.id === roomId) {
        room.background = { type: 'file', value: newValue }
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
      background: { type: 'color', value: '#4f4f4f' },
      objects: []
    })
    setRooms(newRooms)

  }

  const updateObjectInRoom = (object: Object, toDelete?: boolean) => {
    if (!activeRoom) {
      return
    }
    if (seletedSubject && object.id === seletedSubject.id && toDelete) {
      setSeletedSubject(undefined)
    }
    const newRooms = rooms.slice()
    const roomIndex = rooms.findIndex((room) => room.id === activeRoom.id)
    let newObjects = newRooms[roomIndex].objects.slice()
    if (toDelete) {
      newObjects = newObjects.filter((item) => item.id !== object.id)
      setRelations(relations.filter((rel)=>{
        if (rel.object.id === object.id){
          return false
        }  else if ((rel.type === 'question' || rel.type === 'object') && rel.resultEntity.id === object.id) {
          return false
        }
        return true
      }))
    } else {
      const objectIndex = newObjects.findIndex((item) => item.id === object.id)
      if (objectIndex === -1) {
        newObjects.push(object)
      } else {
        newObjects[objectIndex] = object
      }
    }
    newRooms[roomIndex].objects = newObjects
    setRooms(newRooms)
    onChangeField(newRooms, 'rooms')
  }
  const updateSubject = (subject: Subject, toDelete?: boolean) => {
    if (!activeRoom) {
      return
    }
    if (seletedSubject && subject.id === seletedSubject.id && toDelete) {
      setSeletedSubject(undefined)
    }
    let newSubjects = subjects.slice()
    if (toDelete){
      newSubjects = newSubjects.filter((item)=>item.id !== subject.id)
      setRelations(relations.filter((rel)=>(rel.type === 'object' && rel.subject.id !== subject.id)))
    } else {
      const subjectIndex = newSubjects.findIndex((item) => item.id === subject.id)
      if (subjectIndex === -1) {
        newSubjects.push(subject)
      } else {
        newSubjects[subjectIndex] = subject
      }
    }
    setSubjects(newSubjects)
    onChangeField(newSubjects, 'subjects')
  }

  const changeEntityPosition = (item: Subject | Object) => {
    console.log(item.position)
    setSeletedSubject(undefined)
    if (!activeRoom) {
      return
    }
    if (item.type === 'subject') {
      updateSubject({...item})
    } else {
      updateObjectInRoom({...item})
    }
    setSeletedSubject({...item, position: {...item.position}})
  }

  const updateTitleInSelected = (value: string, item: Subject | Object) => {
    if (!('roomId' in item)) {
      updateObjectInRoom({...item, title: value})
    } else if ('roomId' in item) {
      updateSubject({...item, title: value})
    }
    item.title = value
    setSeletedSubject({...item})
  }

  const changeSelectedImage = (object?: { type: EntityType, src: string }) => {
    setSelectedImage(object)
  }
  const addEntityToField = (entity: { type: EntityType, src: string }) => {
    const id = nanoid()
    if (!activeRoom) {
      return
    }
    setSelectedImage(undefined)
    if (entity.type === 'Subject') {
      const subject: Subject = {
        type: 'subject',
        id: id,
        title: `Предмет_${id.slice(0,5)}`,
        position: { x: 100, y: 100, rotate: 0 },
        roomId: activeRoom.id,
        src: entity.src,
        size: 'default'
      }
      updateSubject(subject)
    } else {
      const object: Object = {
        type: 'object',
        id: id,
        title: `Объект_${id.slice(0,5)}`,
        position: { x: 100, y: 100, rotate: 0 },
        src: entity.src,
        size: 'default'
      }
      updateObjectInRoom(object)
    }
  }

  const changeSize = (value: number, field: 'x' | 'y') => {
    if (seletedSubject) {
      let defaultSize: Size = seletedSubject.size
      if (defaultSize === 'default') {
        defaultSize = { x: 96, y: 96 }
        defaultSize = { ...defaultSize, [field]: value }
      }
      defaultSize = { ...defaultSize, [field]: value }
      console.log(defaultSize)
      const item = seletedSubject
      if (!itemIsSubject(item)) {
        updateObjectInRoom({ ...item, size: defaultSize })
      } else {
        updateSubject({ ...item, size: defaultSize })
      }
      setSeletedSubject({...item, size: defaultSize })
    }
  }
  const changePosition = (value: number, field: keyof Position) => {
    if (!seletedSubject) {
      return
    }
    const item = seletedSubject
    if (!itemIsSubject(item)) {
      updateObjectInRoom({ ...item, position: { ...item.position, [field]: value } })
    } else {
      updateSubject({ ...item, position: { ...item.position, [field]: value } })
    }
    setSeletedSubject({...item, position: {...item.position, [field]: value} })
  }

  const countQuestions = (relations: Relation[]) => {
    let count = 0
    for (const relation of relations) {
      if (relation.type === 'question' || relation.type === 'questionList') {
        count++
      }
    }
    return count
  }

  useEffect(() => {
    onChangeField(rooms, 'rooms')
  }, [rooms])

  useEffect(()=>{
    onChangeField(relations, 'relations')
    setQuestionCount(countQuestions(relations))
  },[relations])

  useEffect(() => {
    const targetElement = contentRef.current;
    const handleMouseEnter = () => {
      if (selectedImage) {
        addEntityToField(selectedImage)
      }
    };
    if (targetElement) {
      targetElement.addEventListener('mouseenter', handleMouseEnter);
    }
    return () => {
      if (targetElement) {
        targetElement.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [selectedImage]);

  return (
    <div className={styles.container}>
      <LeftPanel 
        changeSelectedImage={changeSelectedImage} 
        changeBackground={changeRoomBackground} 
        selectedRoomId={activeRoom?.id} 
        createRoom={createRoom} 
        changeActiveRoom={changeActiveRoom} 
        rooms={rooms} 
      />
      <div ref={contentRef} className={styles.container__content}>
        {contentRef.current && activeRoom ? 
          <GameBoard 
            size={contentRef.current.getBoundingClientRect()} 
            background={
              activeRoom.background.type === 'color' ? 
                {type: 'color', value: activeRoom.background.value} : 
                {type: 'file', value: `/img/backgrounds/${activeRoom.background.value}`} }
            entities={[...subjects.filter((item)=>item.roomId === activeRoom.id), ...activeRoom.objects]}
            onSelect={setSeletedSubject}
            changePosition={(item, position)=>{changeEntityPosition({...item, position: position})}}
            deleteEntity={(entity)=>{entity.type === 'object' ? updateObjectInRoom(entity, true) : updateSubject(entity, true)}}
            /> : 
          <p className={styles.container__empty}>Выберите комнату или создайте новую</p> 
        }
      </div>
      {seletedSubject && activeRoom &&
        <RightPanel
          key={`${seletedSubject.id}--${seletedSubject.position.x}--${seletedSubject.position.y}`}
          templateType={template.type}
          relations={relations} 
          allObjects={activeRoom.objects}
          allSubjects={subjects}
          updateRelations={setRelations}
          changeSize={changeSize}
          changePosition={changePosition}
          roomIds={rooms.filter((room)=>room.id !== activeRoom.id).map((room)=>({id: room.id, name: room.title}))}
          selectedEntity={seletedSubject} 
          onChangeTitle={(title)=>updateTitleInSelected(title, seletedSubject)}
        />
      }
    </div>
  )
}