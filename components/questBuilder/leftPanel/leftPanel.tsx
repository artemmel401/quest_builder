import { useState } from 'react'
import styles from './leftPanel.module.scss'


export default function LeftPanel(){
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  return (
    <div className={styles.container}>
      <div className={styles.container__tabs}>
        <Tab name='комнаты' icon='/questBuilder/edit/tabs/room.svg' isActive={selectedTabIndex === 0} onClick={()=>{setSelectedTabIndex(0)}}/>
        <Tab name='фон' icon='/questBuilder/edit/tabs/background.svg' isActive={selectedTabIndex === 1} onClick={()=>{setSelectedTabIndex(1)}}/>
        <Tab name='объекты' icon='/questBuilder/edit/tabs/object.svg' isActive={selectedTabIndex === 2} onClick={()=>{setSelectedTabIndex(2)}}/>
        <Tab name='предметы' icon='/questBuilder/edit/tabs/subject.svg' isActive={selectedTabIndex === 3} onClick={()=>{setSelectedTabIndex(3)}}/>
      </div>
      <div className={styles.container__content}>

      </div>
    </div>
  )
}

type TabsProps = {
  name: string
  icon: string
  isActive: boolean
  onClick: () => void
}
function Tab (props:TabsProps){
  return (
    <div onClick={props.onClick} className={`${styles.tab} ${props.isActive ? styles.tab_isActive : ''}`}>
      <img className={styles.tab__icon} src={props.icon}/>
      <p className={styles.tab__text}>{props.name}</p>
      <svg className={styles.tab__arrow} width="36" height="10" viewBox="0 0 36 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.0002 0L35.3207 10H0.679688L18.0002 0Z" fill="white" />
      </svg>
    </div>
  )
}