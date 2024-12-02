import { Quest } from '@/types/quest'
import styles from './editQuest.module.scss'
import LeftPanel from '../leftPanel/leftPanel'

type EditQuest = {
  quest: Quest
  selectedRoom?: string
  onChangeField: (newValue: any, field: string) => void
}

export default function EditQuest({quest, onChangeField}:EditQuest) {
  return (
    <div className={styles.container}>
      <LeftPanel/>
      <div className={styles.container__content}>

      </div>
    </div>
  )
}