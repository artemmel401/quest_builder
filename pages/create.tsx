import Head from 'next/head'
import styles from './create.module.scss'
import Header from '@/components/header/header'
import { Button } from '@/components/button/button'
import { useEffect, useState } from 'react'
import { createQuest, createTemplate, deleteTemplate, getTemplates } from '@/utils/requests'
import { useRouter } from 'next/router'
import { Template } from '@/types/template'
import Card from '@/components/card/card'
import { LoaderFullScreen } from '@/components/loaders/Loaders'

export default function CreateQuest() {

  const router = useRouter()

  const [templates, setTemplates] = useState<Template[]>();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>()

  const onGetTemplates = async () => {
    const templates = await getTemplates()
    setTemplates(templates)
  }

  const onCreateQuest = async () => {
    if (selectedTemplateId) {
      const number = await createQuest(selectedTemplateId)
      router.push(`/edit/${number}`)
    }
  }

  const onCreateTemplate = async () => {
    const id = await createTemplate()
    router.push(`/edit/template/${id}`)
  }

  const onDeleteTemplate = (id:string) => {
    deleteTemplate(id)
    onGetTemplates()
  }

  const onClickCard = (id: string) => {
    setSelectedTemplateId(id)
    //router.push(`/edit/template/${id}`)
  }

  useEffect(() => {
    onGetTemplates()
  },[])

  if (!templates) { 
    return <LoaderFullScreen/> 
  }

  return (
    <>
      <Head>
        <title>Выбор шаблона</title>
      </Head>
      <div className={styles.content}>
        <Header isNewQuest/>
        <main className={`${styles.main} `}>
          <div className={styles.main__list}>
            <h1 className={styles.main__title}>ВАШИ ШАБЛОНЫ</h1>
            <Button onClick={selectedTemplateId ? onCreateQuest : onCreateTemplate} mainClass="ld_button_secondary2" text={selectedTemplateId ? 'СОЗДАТЬ КВЕСТ' : 'СОЗДАТЬ ШАБЛОН'} style={{width: '345px', height: '55px', fontSize: '20px'}}/>
          </div>
          <div className={styles.main__cards}>
            {templates.map((template)=>(<Card onDelete={()=>onDeleteTemplate(template._id)} background={template.rooms[0].background ? template.rooms[0].background : {type: 'color', value: '#ffffff'}} title={template.title} description={''} onClick={()=>{onClickCard(template._id)}}/>))}
          </div>
        </main>
      </div>
    </>
  )
}