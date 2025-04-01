import Head from 'next/head'
import Header from '@/components/header/header'
import { useEffect, useState } from 'react'
import {DropdownListInput, Input} from '@/components/input/input'
import { Button } from '@/components/button/button'
import { QUEST_TYPE } from '@/const'
import { useParams } from 'next/navigation'
import { LoaderFullScreen } from '../../components/loaders/Loaders'
import { changeQuestField, getQuest } from '@/utils/requests'
import { Template } from '@/types/template'
import EditQuest from '@/components/questBuilder/editTemplate/editTemplate'
import { Quest } from '@/types/quest'
import EditTemplate from '@/components/questBuilder/editTemplate/editTemplate'

export default function QuestConstructor(){

  const params = useParams()

  const [stage, setStage] = useState(2)


  const [questTitle, setQuestTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
 
  const [number, setNumber] = useState<number>()
  const [quest, setQuest] = useState<Quest>()

  const onGetQuest = async (number: number) => {
    const userQuest:Quest[] = await getQuest(number)
    setQuest(userQuest[0])
    setQuestTitle(userQuest[0].title)
    setDescription(userQuest[0].description)
    setNumber(number)
  }

/*   const changeQuestContentField = (newValue: any, field: 'rooms' | 'subjects' | 'relations') => {
    const newVariants = quest?.variants
    if (newVariants){
      newVariants[0][field] = newValue
    }
    changeQuestField(number, 'variants', newVariants)
  } */

  useEffect(()=>{
    console.log(params)
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
        <title>КВЕСТ</title>
      </Head>
      <div>
        <Header isNewQuest/>
        <main>
          
        </main>
      </div>
    </>
  )
}