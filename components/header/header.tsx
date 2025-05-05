import { useState } from 'react'
import styles from './header.module.scss'

type HeaderProps = {
  children?: JSX.Element
  isNewQuest?: boolean
  isHide?: boolean
}

export default function Header({children, isNewQuest, isHide}:HeaderProps){

  const [isHidden, setIsHidden] = useState(true)

  return (
    <div 
      onMouseEnter={()=>setIsHidden(false)} 
      onMouseLeave={()=>setIsHidden(true)} 
      className={`${styles.container} ${isHide && styles.container_absolute} ${isHide && isHidden && styles.container_hide}`}
    >
      {isHide && isHidden ? 
      <div className={styles.container__arrow}>
        <img src='/questBuilder/icons/arrowRightWhite.svg'/>
      </div> :
      <div>
      {isNewQuest &&
        <div className={styles.header__content}>
          <h2 className={styles.header__title}>КВЕСТРУКТОР</h2>
          <div className={styles.header__textContent}>
            <p className={styles.header__text}>Изменения сохраняются автоматически</p>
            <img src='/icons/warning.svg' />
          </div>
        </div>
      }
      {children}
    </div>
      }
    </div>
  )
}