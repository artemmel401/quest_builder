import styles from './header.module.scss'

type HeaderProps = {
  children?: JSX.Element
  isNewQuest?: boolean
}

export default function Header({children, isNewQuest}:HeaderProps){
  return (
    <div className={styles.container}>
      {isNewQuest && 
        <div className={styles.header__content}>
          <h2 className={styles.header__title}>КВЕСТРУКТОР</h2>
          <div className={styles.header__textContent}>
            <p className={styles.header__text}>Изменения сохраняются автоматически</p>
            <img src='/icons/warning.svg'/>
          </div>
        </div>
      }
      {children}
    </div>
  )
}