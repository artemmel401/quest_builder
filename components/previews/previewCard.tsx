import { BackgroundType } from '@/types/background'
import styles from './previewCard.module.scss'

type PreviewCardProps = {
  background?: BackgroundType
  isRoom?: boolean
}

export default function PreviewCard({background, isRoom}:PreviewCardProps){
  return (
    <div className={styles.container} style={background && (background.type === 'color' ? {backgroundColor: background.value} : {backgroundImage: `url(/img/backgrounds/${background.value})`}) }>
      {isRoom && <img className={styles.container__book} alt='книжка' src='/img/openedBook.png'/>}
    </div>
  )
}