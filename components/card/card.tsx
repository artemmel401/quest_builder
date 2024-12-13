import { BackgroundType } from '@/types/background'
import PreviewCard from '../previews/previewCard'
import styles from './card.module.scss'

type CardProps = {
  title?: string
  description?: string
  background?: BackgroundType
  onClick: () => void
}

export default function Card({title, description, background, onClick}: CardProps){
  return (
    <div className={styles.container} onClick={onClick}>
      <PreviewCard background={background} isRoom/>
      <div className={styles.container__content}>
        <h3 className={styles.container__title}>{title}</h3>
        <p className={styles.container__text}>{description}</p>
      </div>
    </div>
  )
}