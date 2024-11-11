import styles from './previewCard.module.scss'

type PreviewCardProps = {
  background: string
  isRoom?: boolean
}

export default function PreviewCard({background, isRoom}:PreviewCardProps){
  return (
    <div className={styles.container} style={{background: background}}>
      {isRoom && <img className={styles.container__book} alt='книжка' src='/img/openedBook.png'/>}
    </div>
  )
}