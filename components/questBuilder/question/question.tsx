import { UserTask } from '@/types/quest'
import styles from './question.module.scss'
import { Button } from '@/components/button/button'
import { CheckBox, RadioButton } from '@/components/newComponents/selectors/selectors'
import { useRef, useState } from 'react'
import { Input } from '@/components/input/input'
import { BASKET_URL } from '@/const'

type QuestionProps = {
  task: UserTask
  taskIndex: number | 'control'
  confirmAnswers: (task: UserTask) => void
}

export default function Question({task, taskIndex, confirmAnswers}: QuestionProps){

  const [newUserTask, setNewUserTask] = useState(task)

  const fileRef = useRef<HTMLImageElement>(null)

  const changeRadioQuestion = (questionId: string) => {
    const newTask:UserTask = JSON.parse(JSON.stringify(newUserTask))
    if (newTask.userAnswers === questionId) {
      newTask.userAnswers = undefined
    } else {
      newTask.userAnswers = questionId
    }
    setNewUserTask(newTask)
  }

  const changeCheckboxQuestion = (questionId: string) => {
    const newTask:UserTask = JSON.parse(JSON.stringify(newUserTask))
    if (newTask.userAnswers == null) {
      newTask.userAnswers = []
    }
    if (Array.isArray(newTask.userAnswers)) {
      if (newTask.userAnswers.includes(questionId)) {
        newTask.userAnswers = newTask.userAnswers.filter((id)=>id!==questionId)
      } else {
        newTask.userAnswers = [...newTask.userAnswers, questionId]
      }
    }
    setNewUserTask(newTask)
  }
  const changeInputValue = (value: string) => {
    const newTask:UserTask = JSON.parse(JSON.stringify(newUserTask))
    newTask.userAnswers = value
    setNewUserTask(newTask)
  }
  console.log(newUserTask)
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <p>{taskIndex !== 'control' ? `Задание ${taskIndex + 1}` : 'Контрольное задание'}</p>
        <Button text='Готово' mainClass='ld_button_secondary1' onClick={()=>{confirmAnswers(newUserTask)}}/>
      </div>
      <div className={styles.container__main}>
        <div className={styles.question}>
          <p className={styles.question__content}>{newUserTask.content}</p>
          {newUserTask.image && <img src={'' + BASKET_URL +  newUserTask.image}/>}
          {newUserTask.type !== 'text' ? 
            <div className={styles.question__buttons}>
              {newUserTask.answers.map((answer)=>(
                <div className={styles.answer} key={answer.id}>
                  <div 
                    onClick={()=>newUserTask.type === 'radio' ? changeRadioQuestion(answer.id) : changeCheckboxQuestion(answer.id)} 
                    className={styles.answer__content}
                  >
                    {newUserTask.type === 'radio' ? 
                      <RadioButton isChecked={newUserTask.userAnswers === answer.id} size='s'/> : 
                      <CheckBox isChecked={Array.isArray(newUserTask.userAnswers) && newUserTask.userAnswers.includes(answer.id)} size='s'/>
                    }
                    <p className={styles.answer__text}>{answer.content}</p>
                  </div>
                  {answer.fileUrl && 
                    <div className={styles.answer_img}>
                      <img ref={fileRef} src={'' + BASKET_URL +  answer.fileUrl}/>
                      <div onClick={()=>{fileRef.current&&fileRef.current.requestFullscreen()}} className={styles.answer_img_full}>
                        <img src='/images/icons/file_input/full_image.svg'/>
                      </div>
                    </div>
                  }
                </div>
              ))}
            </div> 
            : 
            <div className={styles.question__input}>
              <Input onChange={(val)=>changeInputValue(val.toString())} placeholder='Введите ответ' value={!Array.isArray(newUserTask.userAnswers) ? newUserTask.userAnswers : ''}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}