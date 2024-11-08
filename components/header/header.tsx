import styles from './header.module.scss'

type HeaderProps = {
  children: JSX.Element
}

export default function Header({children}:HeaderProps){
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}