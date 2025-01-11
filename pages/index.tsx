import styles from './index.module.scss'
import Header from "@/components/header/header"
import { Button } from "@/components/button/button"
import Card from "@/components/card/card"
import { useRouter } from "next/router"
import { createQuest, deleteQuest, getQuests } from "../utils/requests"
import { useEffect, useState } from 'react'
import { Quest } from '@/types/quest'
import { LoaderFullScreen } from '@/components/loaders/Loaders'

export default function Home(){

  const [quests, setQuests] = useState<Quest[]>()

  const router = useRouter()

  const onCreateQuest = async () => {
    const number = await createQuest()
    router.push(`/edit/${number}`)
  }

  const getAllQuests = async () => {
    const quests = await getQuests()
    console.log(quests)
    setQuests(quests)
  }

    const onDeleteQuest = (number:number) => {
      deleteQuest(number)
      getAllQuests()
    }

  useEffect(() => {
    getAllQuests()
  },[])


  if (!quests) {
    return <LoaderFullScreen/>
  }

  return (
    <>
      <Header isNewQuest/>
      <main className={styles.main}>
        <div className={styles.main__list}>
          <h1 className={styles.main__title}>ВАШИ КВЕСТЫ</h1>
          <div></div>
          <Button onClick={onCreateQuest} mainClass="ld_button_secondary2" text='СОЗДАТЬ КВЕСТ' style={{width: '345px', height: '55px', fontSize: '20px'}}/>
        </div>
        <div className={styles.main__cards}>
          {quests.map((quest)=>(<Card onDelete={()=>onDeleteQuest(quest.number)} background={quest.variants[0].rooms[0]?.background} title={quest.title} description={quest.description} onClick={()=>{router.push(`/edit/${quest.number}`)}}/>))}
        </div>
      </main>
    </>
  )
}