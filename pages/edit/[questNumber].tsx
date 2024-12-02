import Head from 'next/head'
import styles from './edit.module.scss'
import Header from '@/components/header/header'
import { useEffect, useState } from 'react'
import {DropdownListInput, Input} from '@/components/input/input'
import { Button } from '@/components/button/button'
import { QUEST_TYPE } from '@/const'
import { useParams } from 'next/navigation'
import { LoaderFullScreen } from '../../components/loaders/Loaders'
import { changeQuestField, getQuest } from '@/utils/requests'
import { Quest } from '@/types/quest'
import EditQuest from '@/components/questBuilder/editQuest/editQuest'

export default function QuestConstructor(){

  const params = useParams()

  const [stage, setStage] = useState(2)


  const [questTitle, setQuestTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [typeValue, setTypeValue] = useState<string>()
  const [selectedRoom, setSelectedRoom] = useState<string>()
 
  const [number, setNumber] = useState<number>()
  const [quest, setQuest] = useState<Quest>()

  const onGetQuest = async (number: number) => {
    const userQuest = await getQuest(number)
    setQuest(userQuest[0])
    setQuestTitle(userQuest[0].title)
    setDescription(userQuest[0].description)
    setSelectedRoom(userQuest[0].variants[0] ? userQuest[0].variants[0] : undefined)

    setNumber(number)
  }

  useEffect(()=>{
    if (params && typeof params.questNumber === 'string') {
      onGetQuest(parseInt(params.questNumber))
    }
  },[params])

  useEffect(()=>{
    if (number) {
      changeQuestField(number, 'title', questTitle)
    }
  },[questTitle])

  useEffect(()=>{
    if (number) {
      changeQuestField(number, 'description', description)
    }
  },[description])

  if (!quest) {
    return <LoaderFullScreen/>
  }

  return (
    <>
      <Head>
        <title>Редактирование</title>
      </Head>
      <div>
        <Header isNewQuest/>
        <main className={`${styles.main} ${stage == 2 ? styles.main_notPadding : ''}`}>
          {stage !== 2 ? <div className={styles.container}>
            <h1 className={styles.main__title}>{stage === 0 ? 'создать новый квест' : !questTitle ? 'Безымянный' : questTitle}</h1>
            <h2 className={styles.main__subtitle}>{stage === 0 ? 'придумайте название квеста' : 'выберите тип квеста'}</h2>
            {stage === 0 ? <div className={styles.main__inputs}>
              <Input onChange={(value)=>{setQuestTitle(value.toString())}} value={questTitle} placeholder={'Впишите название'} label='Введите название квеста'/>
              <Input onChange={(value)=>{setDescription(value.toString())}} value={description} placeholder={'Впишите краткое описание'} label='Добавьте предисловие перед созданием квеста'/>
            </div> :
            <DropdownListInput list={QUEST_TYPE} placeholder='Выберите тип задания' value={typeValue} onChange={(value)=>{setTypeValue(value)}} label='Тип квеста'/>}
            <div className={styles.main__button_container}>
              <Button text={stage === 0 ? 'СОЗДАТЬ КВЕСТ' : 'ПРОДОЛЖИТЬ'} onClick={()=>{setStage(stage + 1)}} mainClass='ld_button_secondary2' style={{width: '345px'}}/>
            </div>
          </div> :
          <EditQuest selectedRoom={selectedRoom} quest={quest} onChangeField={()=>{}}/>}
        </main>
      </div>
    </>
  )
}