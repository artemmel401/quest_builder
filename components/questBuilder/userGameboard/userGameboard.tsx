import { useEffect, useRef } from 'react';
import styles from './userGameboard.module.scss'
import * as PIXI from 'pixi.js';
import { GameObject, GameSubject } from '@/types/game';
import { BASKET_URL } from '@/const';

type UserGameboardProps = {
  size: { width: number, height: number },
  background: { type: 'file' | 'color', value: string }
  selectedSubject?: GameSubject
  helper?: {objectId: string, text: string}
  resetHelper: () => void
  entities: (GameObject | GameSubject)[]
  onSelect: (entity: GameObject | GameSubject) => void
  resetSelectedSubject: () => void
  onSuccessHover: (objectId: string) => void
}

export default function UserGameboard(props: UserGameboardProps) {
  const appRef = useRef<PIXI.Application | null>(null);
  const pixiContainerRef = useRef<HTMLDivElement | null>(null);


  const loadImage = async (sprite: GameObject | GameSubject, targetWidth: number, targetHeight: number) => {
      const img = new Image(targetWidth, targetHeight);
      if (sprite.src.includes(`${BASKET_URL}`)) {
        const proxyUrl = `/api/proxyEntity?url=${encodeURIComponent(sprite.src)}`;
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = proxyUrl;
        });
      } else {
        img.src = sprite.src;
      }
      return img;
    };

  const createSprite = async (entity: GameObject | GameSubject) => {
    const targetWidth = entity.size === 'default' ? 96 : entity.size.x;
    const targetHeight = entity.size === 'default' ? 96 : entity.size.y;

    const texture = PIXI.Texture.from(await loadImage(entity, targetWidth, targetHeight));

    const spriteObject = new PIXI.Sprite(texture)
    spriteObject.isSprite = true
    spriteObject.x = entity.position.x;
    spriteObject.y = entity.position.y;
    spriteObject.rotation = entity.position.rotate % 360 * (180 / Math.PI);
    spriteObject.width = targetWidth
    spriteObject.height = targetHeight
    spriteObject.eventMode = 'static'
    spriteObject.cursor = 'pointer'
    spriteObject.on('click', () => props.onSelect(entity));
    spriteObject.anchor.set(0.5);
    spriteObject.on('mouseenter', (e)=>{
      const sprite = e.currentTarget as PIXI.Sprite;
      sprite.width = targetWidth + 1.2;
      sprite.height = targetHeight + 1.2;
    })
    spriteObject.on('mouseleave', (e)=>{
      const sprite = e.currentTarget as PIXI.Sprite;
      sprite.width = targetWidth - 1.2;
      sprite.height = targetHeight - 1.2;
    })
    if (entity.type === 'object' && entity.relation && entity.relation.type === 'object') {
      spriteObject.name = entity.relation.subject.id
    } else if (entity.type === 'subject') {
      spriteObject.name = entity.id
    }
    return spriteObject
  }

  const createSprites = async (app: PIXI.Application) => {
    const toRemove = app.stage.children.filter(child => (child).isSprite);
    toRemove.forEach(child => {
      child.destroy({ children: true });
      app.stage.removeChild(child);
    });
    if (props.background.type === 'file') {
      let backgroundTexture
      if (props.background.value.includes(`${BASKET_URL}`)) {
        backgroundTexture = await PIXI.Texture.fromURL(`/api/proxyImage?url=${encodeURIComponent(props.background.value)}`);
      } else {
        backgroundTexture = PIXI.Texture.from(props.background.value);
      }
      const backgroundSprite = new PIXI.Sprite(backgroundTexture);
      backgroundSprite.width = props.size.width;
      backgroundSprite.height = props.size.height;
      backgroundSprite.isSprite = true
      app.stage.addChild(backgroundSprite);
    }
    for (const sprite of props.entities) {
      const spriteObject = await createSprite(sprite)
      app.stage.addChild(spriteObject);
    }

    let dragTarget: PIXI.Sprite | null = null;
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;

    if (props.selectedSubject) {
      const subjectSprite = await createSprite(props.selectedSubject)
      dragTarget = subjectSprite
      app.stage.on('pointermove', onDragMove);
      app.stage.addChild(subjectSprite);
      app.stage.on('pointerup', onDragEnd);
      app.stage.on('pointerupoutside', onDragEnd);
    }

    function onDragMove(event: PIXI.FederatedPointerEvent) {
      if (dragTarget && dragTarget.parent) {
        dragTarget.parent.toLocal(event.global, undefined, dragTarget.position);
      }
    }

    function isOverlapping(spriteA: PIXI.Sprite | null, spriteB: PIXI.Sprite | null): boolean {
      if (!spriteA || !spriteB) {
        return false
      }
      const a = spriteA.getBounds();
      const b = spriteB.getBounds();
      return a.x + a.width > b.x &&
             a.x < b.x + b.width &&
             a.y + a.height > b.y &&
             a.y < b.y + b.height;
  }

    function onDragEnd() {
      app.stage.off('pointermove', onDragMove);
      if (dragTarget) {
        app.stage.children.forEach(child => {
          if (child instanceof PIXI.Sprite && child !== dragTarget && !child.destroyed && !dragTarget?.destroyed) {
            if (dragTarget && isOverlapping(dragTarget, child) && dragTarget.name === child.name) {
              props.onSuccessHover(child.name ? child.name : '')
            }
          }
        });
        props.resetSelectedSubject()
        dragTarget.alpha = 1;
        dragTarget = null;
      }
    }
  }

  useEffect(() => {
    let app = appRef.current
    if (!app) {
      app = new PIXI.Application({ 
        background: props.background.type === 'color' ? 
        props.background.value : '#fff', 
        width: props.
        size.width, height: props.size.height 
      });
      appRef.current = app;
    }
    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view as HTMLCanvasElement);
    }
    app.stage.sortableChildren = true
    createSprites(app);

  }, [props]);

  const getHelperPosition = (objectId: string) => {
    const object = props.entities.find(entity => entity.id === objectId)
    if (object) {
      return {
        top: object.position.y - ((object.size !== 'default' ? object.size.y : 96) + 10),
        left: object.position.x - ((object.size !== 'default' ? object.size.x : 96) / 2 + 5),
      }
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={props.helper && props.resetHelper} id="pixi-container" ref={pixiContainerRef} />
      {props.helper && 
        <div style={getHelperPosition(props.helper.objectId)} className={styles.helper}>
          {props.helper.text}
          <img className={styles.helper__triangle} src='/questBuilder/icons/triangle.svg'/>
        </div>
      }
    </div>
  )
}