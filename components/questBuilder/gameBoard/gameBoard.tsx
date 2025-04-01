import { Subject } from "@/types/subject"
import { memo, useEffect, useRef, useState } from "react"
import * as PIXI from 'pixi.js';
import { Object } from "@/types/object";
import styles from './gameBoard.module.scss'

type GameBoardProps = {
  size: {width: number, height: number},
  background: {type: 'file' | 'color', value: string}
  entities: (Object | Subject)[]
  onSelect: (entity: {type: 'Subject' | 'Object', item: Object | Subject}) => void
  changePosition: (item: Object | Subject, position: {x: number, y: number, rotate: number}) => void
  deleteEntity: (entity: Object | Subject) => void
}

const GameBoardComponent = (props:GameBoardProps) => {

  const appRef = useRef<PIXI.Application | null>(null);
  const pixiContainerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredEntity, setHoveredEntity] = useState<Subject | Object>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log(props)
    const app = new PIXI.Application({ background: props.background.type === 'color' ? props.background.value : '#fff', width: props.size.width, height: props.size.height });
    appRef.current = app;
    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view as HTMLCanvasElement);
    }
    if (props.background.type === 'file') {
      const backgroundTexture = PIXI.Texture.from(props.background.value);
      const backgroundSprite = new PIXI.Sprite(backgroundTexture);
      backgroundSprite.width = props.size.width;
      backgroundSprite.height = props.size.height;
      app.stage.addChild(backgroundSprite);
    }

    for (const sprite of props.entities) {

      const targetWidth = sprite.size === 'default' ? 96 : sprite.size.x;
      const targetHeight = sprite.size === 'default' ? 96 : sprite.size.y;

      const img = new Image(targetWidth, targetHeight);
      img.src = sprite.src
      const texture = PIXI.Texture.from(img);

      const spriteObject = new PIXI.Sprite(texture)
      spriteObject.x = sprite.position.x;
      spriteObject.y = sprite.position.y;
      spriteObject.rotation = sprite.position.rotate%360 * (180 / Math.PI);
      spriteObject.width = targetWidth
      spriteObject.height = targetHeight
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
      console.log('unmount', props);
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
        <div className={styles.imgContent}
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
          className={styles.title}
        />
        <div onClick={()=>props.deleteEntity(hoveredEntity)} className={styles.delete}>
          <img width={`16px`} height={`16px`} src='/icons/whiteTrash.svg'/>
        </div>
      </div>
      )}
    </div>
);
  
};

export const GameBoard = memo(GameBoardComponent)