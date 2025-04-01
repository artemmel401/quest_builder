import { useParams } from 'next/navigation'
import styles from './edit.module.scss'
import Header from '@/components/header/header'
import { useEffect, useState } from 'react'
import { EmptyTemplate, Template } from '@/types/template'
import { changeTemplateField, getTemplate } from '@/utils/requests'
import { LoaderFullScreen } from '@/components/loaders/Loaders'
import { DropdownListInput, Input } from '@/components/input/input'
import { QUEST_TYPE, QUEST_TYPE_REQUEST } from '@/const'
import { Button } from '@/components/button/button'
import EditTemplate from '@/components/questBuilder/editTemplate/editTemplate'
import { useRouter } from 'next/router'

export default function CreateTemplate() {

  const params = useParams()
  const router = useRouter()

  const [stage, setStage] = useState(0)
  
  
  const [templateTitle, setTemplateTitle] = useState<string>()
  const [typeValue, setTypeValue] = useState<string>()
  
  const [templateId, setTemplateId] = useState<string>()
  const [template, setTemplate] = useState<Template | EmptyTemplate>()

  const onGetTemplate = async (id: string) => {
    const userTemplate:(Template | EmptyTemplate)[] = await getTemplate(id)
    setTemplate(userTemplate[0])
    setTemplateId(id)
    setTemplateTitle(userTemplate[0].title)
    setTypeValue(userTemplate[0].type)
    if (userTemplate[0].type !== '') {
      setStage(2)
    }
  }


  const changeTemplateContentField = (newValue: any, field: 'rooms' | 'subjects' | 'relations') => {
    changeTemplateField(templateId, field, newValue)
  }

  const finishTemplate = () => {
    router.push('/create')
  }

  useEffect(()=>{
    if (params && typeof params.templateId === 'string') {
      onGetTemplate(params.templateId)
    }
  },[params])
  
  useEffect(()=>{
    if (templateId) {
      changeTemplateField(templateId, 'title', templateTitle)
    }
  },[templateTitle])

  useEffect(()=>{
    if (templateId && typeValue !== '') {
      const type = QUEST_TYPE_REQUEST.filter((item)=>item.value === typeValue)[0]
      if (type) {
        changeTemplateField(templateId, 'type', type.name)
      }
    }
  },[typeValue])

  if (!template) {
    return <LoaderFullScreen/>
  }

  return (
      <div className={styles.content}>
        <Header isNewQuest>
          {stage !== 0 ? <div className={styles.header__button}><Button text={'готово'} onClick={finishTemplate} mainClass='ld_button_secondary2'/></div> : <></>}
        </Header>
        <main className={`${styles.main} ${stage == 2 ? styles.main_notPadding : ''}`}>
          {stage === 0 ? <div className={styles.container}>
            <h1 className={styles.main__title}>{stage === 0 ? 'создать новый квест' : !templateTitle ? 'Безымянный' : templateTitle}</h1>
            <h2 className={styles.main__subtitle}>{'придумайте название и тип квеста'}</h2>
            <>
              <div className={styles.main__inputs}>
                <Input onChange={(value) => { setTemplateTitle(value.toString()) }} value={templateTitle} placeholder={'Впишите название'} label='Введите название квеста' />
              </div>
              <DropdownListInput list={QUEST_TYPE} placeholder='Выберите тип задания' value={typeValue} onChange={(value) => { setTypeValue(value) }} label='Тип квеста' />
            </> 
            <div className={styles.main__button_container}>
              <Button text={stage === 0 ? 'СОЗДАТЬ Шаблон' : 'ПРОДОЛЖИТЬ'} onClick={()=>{setStage(stage + 1)}} mainClass='ld_button_secondary2' style={{width: '345px'}}/>
            </div>
          </div> :
          <EditTemplate template={template as Template} onChangeField={changeTemplateContentField}/>}
        </main>
      </div>
  )
}