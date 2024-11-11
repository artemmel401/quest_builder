import Head from 'next/head'
import styles from './edit.module.scss'
import Header from '@/components/header/header'
import { useEffect, useState } from 'react'
import {DropdownListInput, Input} from '@/components/input/input'
import { Button } from '@/components/button/button'
import { QUEST_TYPE } from '@/const'

export default function QuestConstructor(){

  const [stage, setStage] = useState(0)

  const [questTitle, setQuestTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [typeValue, setTypeValue] = useState<string>()

  useEffect(()=>{
    console.log(typeValue)
  },[typeValue])


  return (
    <>
      <Head>
        <title>Редактирование</title>
      </Head>
      <div>
        <Header isNewQuest/>
        <main className={styles.main}>
          <div className={styles.container}>
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
          </div>
        </main>
      </div>
    </>
  )
}