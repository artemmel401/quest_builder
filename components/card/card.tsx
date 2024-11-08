import styles from './card.module.scss'

type CardProps = {
  title?: string
  description?: string
  onClick: () => void
}

export default function Card({title, description, onClick}: CardProps){
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.container__preview}></div>
      <div className={styles.container__content}>
        <h3 className={styles.container__title}>{title}</h3>
        <p className={styles.container__text}>{description}</p>
      </div>
    </div>
  )
}