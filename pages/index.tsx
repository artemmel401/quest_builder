import styles from './index.module.scss'
import Header from "@/components/header/header"
import { Button } from "@/components/button/button"
import Card from "@/components/card/card"
import { useRouter } from "next/router"
import { deleteQuest, getQuests } from "../utils/requests"
import { useEffect, useState } from 'react'
import { LoaderFullScreen } from '@/components/loaders/Loaders'
import { Quest } from '@/types/quest'

export default function Home(){

  const [quests, setQuests] = useState<Quest[]>()

  const router = useRouter()

  const onCreateQuest = async () => {
    router.push(`/create`)
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
          <Button onClick={onCreateQuest} mainClass="ld_button_secondary2" text='СОЗДАТЬ КВЕСТ' style={{width: '345px', height: '55px', fontSize: '20px'}}/>
        </div>
        <div className={styles.main__cards}>
          {quests.map((quest)=>(<Card onDelete={()=>onDeleteQuest(quest.number)} background={{type:'color', value:'#000'}} title={quest.title} description={quest.description} onClick={()=>{router.push(`/edit/${quest.number}`)}}/>))}
        </div>
      </main>
    </>
  )
}