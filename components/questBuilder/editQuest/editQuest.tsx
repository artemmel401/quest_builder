import { QuestContent } from '@/types/quest'
import styles from './editQuest.module.scss'
import LeftPanel from '../leftPanel/leftPanel'
import { useEffect, useRef, useState } from 'react'
import { Room } from '@/types/room'
import { nanoid } from 'nanoid'
import Draggable from 'react-draggable'
import { Subject } from '@/types/subject'
import { Object } from '@/types/object'
import RightPanel from '../rightPanel/rightPanel'
import { EntityType } from '@/types/entity'
import { itemIsSubject } from '@/utils'
import { Size } from '@/types/size'
import { Position } from '@/types/position'
import { Relation } from '@/types/relation'
import { Stage, Sprite } from '@pixi/react'
import * as PIXI from 'pixi.js';

type EditQuest = {
  quest: QuestContent
  selectedRoom?: string
  onChangeField: (newValue: Room[] | Subject[] | Relation[], field: 'rooms' | 'subjects' | 'relations') => void
}

export default function EditQuest({ quest, onChangeField }: EditQuest) {

  const [subjects, setSubjects] = useState<Subject[]>(quest.subjects)
  const [activeRoom, setActiveRoom] = useState<Room | undefined>()
  const [rooms, setRooms] = useState(quest.rooms)
  const [relations, setRelations] = useState(quest.relations)
  const [selectedImage, setSelectedImage] = useState<{ type: EntityType, src: string }>()
  const [seletedSubject, setSeletedSubject] = useState<{type: EntityType, item: Subject | Object}>()

  const targetRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const changeActiveRoom = (id: string) => {
    for (let room of quest.rooms) {
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
    if (seletedSubject && object.id === seletedSubject.item.id && toDelete) {
      setSeletedSubject(undefined)
    }
    const newRooms = rooms.slice()
    const roomIndex = rooms.findIndex((room) => room.id === activeRoom.id)
    let newObjects = newRooms[roomIndex].objects.slice()
    if (toDelete) {
      newObjects = newObjects.filter((item) => item.id !== object.id)
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
    if (seletedSubject && subject.id === seletedSubject.item.id && toDelete) {
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
  const updateTitleInSelected = (value: string, item: {type: EntityType, item: Subject | Object}) => {
    if (!('roomId' in item.item)) {
      updateObjectInRoom({...item.item, title: value})
    } else if ('roomId' in item.item) {
      updateSubject({...item.item, title: value})
    }
    item.item.title = value
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
        position: { x: 0, y: 0, rotate: 0 },
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
        position: { x: 0, y: 0, rotate: 0 },
        src: entity.src,
        size: 'default'
      }
      updateObjectInRoom(object)
    }
  }

  const changeSize = (value: number, field: 'x' | 'y') => {
    if (seletedSubject) {
      let defaultSize: Size = seletedSubject.item.size
      if (defaultSize === 'default') {
        defaultSize = { x: 96, y: 96 }
        defaultSize = { ...defaultSize, [field]: value }
      }
      defaultSize = { ...defaultSize, [field]: value }
      console.log(defaultSize)
      const item = seletedSubject.item
      if (!itemIsSubject(item)) {
        updateObjectInRoom({ ...item, size: defaultSize })
      } else {
        updateSubject({ ...item, size: defaultSize })
      }
      setSeletedSubject({...seletedSubject, item: { ...item, size: defaultSize }})
    }
  }
  const changePosition = (value: number, field: keyof Position) => {
    if (!seletedSubject) {
      return
    }
    const item = seletedSubject.item
    if (!itemIsSubject(item)) {
      updateObjectInRoom({ ...item, position: { ...item.position, [field]: value } })
    } else {
      updateSubject({ ...item, position: { ...item.position, [field]: value } })
    }
    setSeletedSubject({...seletedSubject, item: { ...item, position: {...item.position, [field]: value} }})
  }

  useEffect(() => {
    onChangeField(rooms, 'rooms')
  }, [rooms])

  useEffect(()=>{
    onChangeField(relations, 'relations')
  },[relations])

  useEffect(() => {
    const targetElement = targetRef.current;
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
      <LeftPanel changeSelectedImage={changeSelectedImage} changeBackground={changeRoomBackground} selectedRoomId={activeRoom?.id} createRoom={createRoom} changeActiveRoom={changeActiveRoom} rooms={rooms} />
      <div ref={contentRef} className={styles.container__content}>
        {contentRef.current && activeRoom ? <GameBoard 
          size={contentRef.current.getBoundingClientRect()} 
          background={
            activeRoom.background.type === 'color' ? 
              {type: 'color', value: activeRoom.background.value} : 
              {type: 'file', value: `/img/backgrounds/${activeRoom.background.value}`} }
          entities={[...subjects.filter((item)=>item.roomId === activeRoom.id), ...activeRoom.objects]}
          onSelect={setSeletedSubject}
          changePosition={(item, position)=>{item.type === 'subject' ? updateSubject({...item, position: position}) : updateObjectInRoom({...item, position: position})}}
          deleteEntity={(entity)=>{entity.type === 'object' ? updateObjectInRoom(entity, true) : updateSubject(entity, true)}}
          /> : <p className={styles.container__empty}>Выберите комнату или создайте новую</p> }
      </div>
      {seletedSubject && activeRoom &&
        <RightPanel
          relations={relations} 
          allObjects={activeRoom.objects}
          allSubjects={subjects}
          updateRelations={setRelations}
          changeSize={changeSize}
          changePosition={changePosition}
          roomIds={rooms.filter((room)=>room.id !== activeRoom.id).map((room)=>({id: room.id, name: room.title}))}
          selectedEntity={seletedSubject.item} 
          onChangeTitle={(title)=>updateTitleInSelected(title, seletedSubject)}/>}
    </div>
  )
}

type GameBoardProps = {
  size: {width: number, height: number},
  background: {type: 'file' | 'color', value: string}
  entities: (Object | Subject)[]
  onSelect: (entity: {type: 'Subject' | 'Object', item: Object | Subject}) => void
  changePosition: (item: Object | Subject, position: {x: number, y: number, rotate: number}) => void
  deleteEntity: (entity: Object | Subject) => void
}

const GameBoard = (props:GameBoardProps) => {

  const appRef = useRef<PIXI.Application | null>(null);
  const pixiContainerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<Subject | Object>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const app = new PIXI.Application({ background: '#fff', width: props.size.width, height: props.size.height });
    appRef.current = app;
    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view as HTMLCanvasElement);
    }

    const backgroundTexture = PIXI.Texture.from(props.background.value);
    const backgroundSprite = new PIXI.Sprite(backgroundTexture);
    backgroundSprite.width = props.size.width;
    backgroundSprite.height = props.size.height;
    app.stage.addChild(backgroundSprite);

    for (const sprite of props.entities) {
      const texture = PIXI.Texture.from(sprite.src);
      const spriteObject = new PIXI.Sprite(texture);
      spriteObject.x = sprite.position.x;
      spriteObject.width = sprite.size === 'default' ? 96 : sprite.size.x;
      spriteObject.height = sprite.size === 'default' ? 96 : sprite.size.y;
      spriteObject.y = sprite.position.y;
      spriteObject.rotation = sprite.position.rotate%360 * (180 / Math.PI);
      spriteObject.eventMode = 'static'
      spriteObject.cursor = 'pointer'
      spriteObject.on('click', () => props.onSelect(({type: sprite.type === 'object' ? 'Object' : 'Subject' , item: sprite})));
      spriteObject.anchor.set(0.5);
      spriteObject.on('pointerdown', onDragStart, spriteObject);
      spriteObject.on('pointerup', 
        ()=>{onDragEnd();props.changePosition(sprite, {x: Math.round(spriteObject.x), y: Math.round(spriteObject.y), rotate: sprite.position.rotate})}, 
        spriteObject
      );
      spriteObject.on('pointerover', () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Очищаем таймер, если он есть
        }
        setHoveredEntity(sprite); // Устанавливаем текущий спрайт
      });

      spriteObject.on('pointerout', () => {
        // Устанавливаем таймер для задержки перед скрытием
        timeoutRef.current = setTimeout(() => {
          setHoveredEntity(undefined); // Скрываем блок через 2 секунды
        }, 500);
      });
      app.stage.addChild(spriteObject);
    }

    let dragTarget: PIXI.Sprite | null = null;
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;

    function onDragMove(event: PIXI.FederatedPointerEvent) {
      if (dragTarget) {
        dragTarget.parent.toLocal(event.global, undefined, dragTarget.position);
      }
    }

    function onDragStart(this: PIXI.Sprite) {
      this.alpha = 0.5;
      dragTarget = this;
      setHoveredEntity(undefined)
      app.stage.on('pointermove', onDragMove);
    }

    function onDragEnd() {
      if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
      }
    }

    return () => {
      console.log('unmount');
      app.destroy(true, true);
      if (pixiContainerRef.current && app.view) {
        pixiContainerRef.current.removeChild(app.view as unknown as Node);
      }
    };
  }, [props]);

  return (
    <div style={{position: 'relative'}}>
      <div id="pixi-container" ref={pixiContainerRef} />
      {hoveredEntity && (
        <div className={styles.content__imgContent}
        style={{
          width: hoveredEntity.size !== 'default' ? `${hoveredEntity.size.x + 5}px` : '104px',
          height: hoveredEntity.size !== 'default' ? `${hoveredEntity.size.y + 5}px` : '104px',
          top: hoveredEntity.position.y - ((hoveredEntity.size !== 'default' ? hoveredEntity.size.y : 96) / 2 + 5),
          left: hoveredEntity.position.x - ((hoveredEntity.size !== 'default' ? hoveredEntity.size.x : 96) / 2 + 5),
        }}
      >
        <input
          type="text"
          value={hoveredEntity.title}
          onChange={(e)=>setHoveredEntity({...hoveredEntity, title: e.target.value})}
          className={styles.content__title}
        />
        <div onClick={()=>props.deleteEntity(hoveredEntity)} className={styles.content__delete}>
          <img width={`16px`} height={`16px`} src='/icons/whiteTrash.svg'/>
        </div>
      </div>
      )}
    </div>
);
  
};



/* type EntityBlockProps = {
  item: Object | Subject
  deleteEntity: () => void
  changeTitle: (title: string) => void
  changePosition: (position: {x: number, y: number, rotate: number}) => void
  onSelect: () => void
  clearSelected: ()=>void
}

function EntityBlock({item, deleteEntity, changeTitle, changePosition, onSelect, clearSelected}:EntityBlockProps) {

  const blockRef = useRef<HTMLDivElement>(null)
  const [titleValue, setTitleValue] = useState(item.title)

  const updatePosition = () => {
    if (!blockRef.current){
      return
    }
    const style = blockRef.current.style.transform
    const positionX = style.slice(10, style.indexOf('px'))
    const positionY = style.slice(style.indexOf(', ') + 2, -3)
    changePosition({x: parseInt(positionX), y: parseInt(positionY), rotate: item.position.rotate})
  }

  return (
    <Draggable position={{x:item.position.x, y:item.position.y}} onStart={clearSelected} defaultPosition={{x:item.position.x, y:item.position.y}} cancel='input' onStop={updatePosition} bounds={{ top: 0, left: 0 }}>
      <div 
        ref={blockRef} className={styles.content__imgBlock} 
        onClick={onSelect}
        style={item.size !== 'default' ? { width: `${item.size.x}px`, height: `${item.size.y}px` } : 
        { width: '100px', height: '100px' }}
      >
        <div className={styles.content__imgContent}>
          <input className={styles.content__title} onBlur={()=>changeTitle(titleValue)} value={titleValue} onChange={(e)=>{setTitleValue(e.target.value)}}/>
          <img className={styles.content__img} style={item.position ? { rotate: `${item.position.rotate}deg` } : undefined} src={item.src} />
          {<div onClick={(e)=>{e.stopPropagation();deleteEntity()}} className={styles.content__delete}>
            <img width={`16px`} height={`16px`} src='/icons/whiteTrash.svg'/>
          </div>}
        </div>
      </div>
    </Draggable>
  )
} */