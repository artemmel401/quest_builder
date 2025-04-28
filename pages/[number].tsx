import { useParams } from 'next/navigation'
import styles from './quest.module.scss'
import { useEffect, useRef, useState } from 'react'
import { Quest, QuestionType, Task, UserTask, VariantQuestionType } from '@/types/quest'
import { Template } from '@/types/template'
import { checkUserTask, getGameQuest, getQuest, getTemplate } from '@/utils/requests'
import { LoaderFullScreen } from '@/components/loaders/Loaders'
import UserGameboard from '@/components/questBuilder/userGameboard/userGameboard'
import { Button } from '@/components/button/button'
import { GameObject, GameSubject, GameTask } from '@/types/game'
import { EntityRelationType, Relation } from '@/types/relation'
import { Room } from '@/types/room'
import { toast, ToastContainer } from 'react-toastify'
import Question from '@/components/questBuilder/question/question'

export default function QuestPage() {

  const notify = (message: string) => toast(message);

  const params = useParams();
  const [quest, setQuest] = useState<Quest>();
  const [template, setTemplate] = useState<Template>();
  const [variant, setVariant] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeRoom, setActiveRoom] = useState<Room>();
  const [stage, setStage] = useState(0);
  const [containerSize, setContainerSize] = useState<DOMRect>();
  const [isFinish, setIsFinish] = useState(false);

  const [activeEntities, setActiveEntities] = useState<(GameObject | GameSubject)[]>()
  const [backpack, setBackpack] =  useState<GameSubject[]>([])

  const [controlQuestion, setControlQuestion] = useState<GameTask>()
  const [questionList, setQuestionList] = useState<GameTask[]>([])
  const [activeQuestion, setActiveQuestion] = useState<{task: Task, index: number | 'control', type: VariantQuestionType, resultEntity?: EntityRelationType, object?: EntityRelationType}>()
  const [activeHelper, setActiveHelper] = useState<{objectId: string, text: string}>()
  const [isActiveLeft, setIsActiveLeft] = useState(false)
  const [activeTab, setActiveTab] = useState<'question' | 'backpack'>()

  const [selectedSubject, setSelectedSubject] = useState<GameSubject>()

  const onGetTemplate = async (id: string, quest:Quest, variantNumber: number) => {
    const userTemplate: Template[] = await getTemplate(id);
    const questionList:GameTask[] = []
    let questionNumber = 0
    let questionListNumber = 0
    setTemplate({...userTemplate[0], relations: userTemplate[0].relations.map((rel)=>{
      if (rel.type === 'question') {
        questionNumber++
        return {...rel, questionIndex: questionNumber - 1}
      } else if (rel.type === 'questionList') {
        questionListNumber++
        questionList.push({...quest.variants[variantNumber].questionListTasks[questionListNumber - 1], status: 'notFind'})
        return {...rel, questionIndex: questionListNumber - 1}
      }
      return {...rel}
    })});
    setQuestionList(questionList)
    setActiveRoom(userTemplate[0].rooms[0]);
    setActiveEntities(initEntities(userTemplate[0]))
  };

  const onGetQuest = async (number: number) => {
    const userQuest: Quest = await getGameQuest(number);
    const variant = Math.floor(Math.random() * userQuest.variants.length)
    setQuest(userQuest);
    setVariant(variant)
    setControlQuestion({...userQuest.variants[variant].controlQuestion[0], status: 'notStarted'})
    onGetTemplate(userQuest.templateId, userQuest, variant)
  };

  const initEntities = (template: Template) => {
    if (!template) return [];
  
    // Индексы для быстрого доступа к отношениям
    const relationsByResultEntityId = new Map<string, Relation[]>();
    const relationsByObjectId = new Map<string, Relation[]>();
  
    // Заполнение индексов
    template.relations.forEach((relation) => {
      // Индекс по resultEntity.id для типов 'object' и 'question'
      if (relation.type === 'object' || relation.type === 'question') {
        const key = relation.resultEntity.id;
        const relations = relationsByResultEntityId.get(key) || [];
        relations.push(relation);
        relationsByResultEntityId.set(key, relations);
      }
  
      // Индекс по object.id для всех отношений
      const objectKey = relation.object.id;
      const objectRelations = relationsByObjectId.get(objectKey) || [];
      objectRelations.push(relation);
      relationsByObjectId.set(objectKey, objectRelations);
    });
  
    const entities: (GameObject | GameSubject)[] = [];
  
    // Обработка объектов
    template.rooms.forEach((room) => {
      room.objects.forEach((object) => {
        const isDisplay = !hasRelationsOfTypeObjectOrQuestion(object.id, relationsByResultEntityId);
        const relation = getLastValidRelation(object.id, relationsByObjectId, relationsByResultEntityId);
  
        const gameObject: GameObject = {
          ...object,
          isDisplay,
          relation,
          roomId: room.id
        };
  
        entities.push(gameObject);
      });
    });
  
    // Обработка субъектов
    template.subjects.forEach((subject) => {
      const isDisplay = !hasRelationsOfTypeObjectOrQuestion(subject.id, relationsByResultEntityId);
  
      const gameSubject: GameSubject = {
        ...subject,
        isDisplay,
      };
  
      entities.push(gameSubject);
    });
    console.log(entities)
    return entities;
  };
  
  const hasRelationsOfTypeObjectOrQuestion = (
    entityId: string,
    relationsMap: Map<string, Relation[]>,
  ): boolean => {
    const relations = relationsMap.get(entityId) || [];
    return relations.length > 0;
  };
  
  const getLastValidRelation = (
    objectId: string,
    relationsByObject: Map<string, Relation[]>,
    relationsByResult: Map<string, Relation[]>,
  ): Relation | undefined => {
    const objectRelations = relationsByObject.get(objectId) || [];
    const resultRelations = relationsByResult.get(objectId) || [];
  
    const validRelations = objectRelations.filter(
      (rel) => !resultRelations.includes(rel),
    );
  
    return validRelations.length > 0 ? validRelations[validRelations.length - 1] : undefined;
  };

  const getEntitiesToRender = () => {
    if (!activeEntities || !activeRoom) return []
    return activeEntities.filter((entity) => entity.roomId === activeRoom.id && entity.isDisplay)
  }

  const onClickObject = (entity: GameObject | GameSubject) => {
    if (!template || !quest || !activeEntities) return
    if (entity.type === 'object') {
      if (entity.relation) {
        const entityRelationId = entity.relation.id
        const relation = template.relations.filter((relation) => relation.id === entityRelationId)[0]
        let questionIndex = -1
        if (relation.type === 'question' || relation.type === 'questionList') {
          questionIndex = relation.questionIndex !== undefined ? relation.questionIndex : -1
        }
        switch (entity.relation.type) {
          case 'object':
            break;
          case 'room':
            const roomId = entity.relation.room.id
            const room = template.rooms.filter((room) => room.id === roomId)[0]
            setActiveRoom(room ? room : activeRoom)
            break
          case 'text':
            setActiveHelper({objectId: entity.id, text: entity.relation.text})
            break
          case 'question':
            if (questionIndex !== -1) {
              setActiveTab('question')
              setIsActiveLeft(true)
              setActiveQuestion(
                {
                  task: quest.variants[variant].tasks[questionIndex], 
                  index: questionIndex, 
                  type: 'tasks', 
                  resultEntity: entity.relation.resultEntity,
                  object: entity.relation.object
                }
              )
            }
            break
          case 'exit':
            setIsFinish(true)
            break
          case 'questionList':
            if (questionIndex !== -1) {
              const newQuestionList:GameTask[] = JSON.parse(JSON.stringify(questionList))
              newQuestionList[questionIndex].status = 'notStarted'
              setQuestionList(newQuestionList)
              setActiveEntities([...activeEntities].map((entity)=>{
                if (entity.id === relation.object.id) {
                  return {...entity, isDisplay: false}
                }
                return entity
              }))
              notify('Вы нашли вопрос, проверьте список!')
            }
            break
        }
      }
    } else {
      notify('Предмет добавлен в рюкзак')
      setActiveEntities([...activeEntities].map((item)=>({...item, isDisplay : item.id === entity.id ? false : item.isDisplay})))
      setBackpack([...backpack, entity])
    }
  }

  const onSuccessHoverRelation = (subjectId: string) => {
    if (!template || !activeEntities) {
      return
    }
    template.relations.forEach((rel)=>{
      if (rel.type === 'object' && rel.subject.id === subjectId) {
        setActiveEntities([...activeEntities].map((entity)=>{
          if (entity.id === rel.resultEntity.id) {
            return {...entity, isDisplay: true}
          } else if (entity.id === rel.object.id) {
            return {...entity, isDisplay: false}
          }
          return entity
        }))
        setBackpack([...backpack].filter((el)=>el.id !== subjectId))
      }
    })
  }

  const checkAnswers = async (task: UserTask, type: VariantQuestionType, index: number) => {
    if (!activeQuestion) return
    let isCorrect = false
    if (type === 'controlQuestion' && controlQuestion) {
      isCorrect = await checkUserTask(Number(params.number), variant, 0, task.userAnswers, type)
      setControlQuestion({...controlQuestion, status: isCorrect ? 'right' : 'incorrect'})
      setActiveQuestion(undefined)
    } else {
      isCorrect = await checkUserTask(Number(params.number), variant, index, task.userAnswers, type)
      if (isCorrect && type === 'tasks' && activeEntities && activeQuestion.resultEntity) {
        const resultEntityId = activeQuestion.resultEntity.id
        setActiveQuestion(undefined)
        setActiveTab(undefined)
        setIsActiveLeft(false)
        setActiveEntities(activeEntities.map((entity) => {
          if (entity.id === resultEntityId) {
            return { ...entity, isDisplay: true }
          } else if (entity.id === activeQuestion.object?.id) {
            return { ...entity, isDisplay: false }
          }
          return { ...entity }
        }))
      }
      console.log(isCorrect, index)
      if (type === 'questionListTasks') {
        setQuestionList([...questionList].map((question)=>({...question, status: question.id === task.id ? isCorrect ? 'right' : 'incorrect' : question.status})))
        setActiveQuestion(undefined)
      }
    }
    console.log(isCorrect)
  }

  const isDisplayFinishButton = () => {
    if (!template) return false;
  
    if (template.type === 'question') {
      return controlQuestion?.status === 'right';
    }
  
    if (template.type === 'list') {
      if (!questionList?.length) return false;
      return questionList.every(question => question.status === 'right');
    }
    return false;
  };

  useEffect(() => {
    if (params?.number) {
      onGetQuest(Number(params.number));
    }
  }, [params]);

  useEffect(() => {
    if (!contentRef.current) return;
    
    const updateSize = () => {
      setContainerSize(contentRef.current?.getBoundingClientRect());
    };
    
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [quest, template]);


  if (!quest || !template || !activeRoom) {
    return <LoaderFullScreen />;
  }

  return (
    <>
    <ToastContainer/>
    <div ref={contentRef} className={styles.container}>
      {stage === 0 && !isFinish &&
        <div className={styles.welcome}>
          <div className={styles.welcome__header}>
            <img src='/images/Joyteka_main.svg'/>
          </div>
          <div className={styles.welcome__content}>
            <p className={styles.welcome__description}>{quest.description}</p>
            <Button text={'начать'} onClick={() => setStage(1)} mainClass='ld_button_secondary1'/>
          </div>
        </div>
      }
      {stage === 1 && !isFinish &&
        <>
          <div 
            onMouseEnter={()=>{setIsActiveLeft(true)}} 
            className={`${styles.hoverControls} ${isActiveLeft ? styles.hoverControls_disable : styles.hoverControls_active}`}>
            <div className={styles.hoverControls__arrow}>
              <img src='/questBuilder/icons/arrowRightWhite.svg'/>
            </div>
          </div>
          <div onMouseLeave={()=>{!activeTab && setIsActiveLeft(false)}} 
            className={`
              ${styles.controls} 
              ${activeTab === 'question' && !activeQuestion ? styles.controls_notFull : ''}
              ${((activeTab === 'question' && activeQuestion) || activeTab === 'backpack') && !selectedSubject ? styles.controls_full : ''} 
              ${isActiveLeft ? styles.controls_active : styles.controls_disable}`
            }>
            {isActiveLeft && !selectedSubject &&
              <>
                {activeTab === undefined && <>
                  <div className={styles.controls__logo}>
                    <img src='/images/Joyteka.svg' />
                  </div>
                  <div className={styles.controls__buttons}>
                    <div onClick={() => setActiveTab('backpack')} className={styles.controls__backpack}>
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_765_20334)">
                          <path d="M35.5709 33.5264H12.36C11.497 33.5264 10.7969 34.2263 10.7969 35.0895C10.7969 35.9527 11.497 36.6525 12.36 36.6525H14.6656V37.6684C14.6656 38.5316 15.3654 39.2314 16.2285 39.2314C17.0918 39.2314 17.7916 38.5316 17.7916 37.6684V36.6525H35.571C36.434 36.6525 37.1338 35.9527 37.1338 35.0895C37.1337 34.2263 36.4339 33.5264 35.5709 33.5264Z" fill="#828282" />
                          <path d="M46.0212 30.3525H42.0335V23.2263C42.0335 15.6347 37.3271 9.12259 30.679 6.45236C30.5374 2.87063 27.581 0 23.9651 0C20.3493 0 17.3925 2.87079 17.2511 6.45236C10.603 9.12275 5.89662 15.6347 5.89662 23.2263V30.3525H1.98503C1.12167 30.3525 0.421875 31.0524 0.421875 31.9156V38.859C0.421875 41.9085 2.79181 44.3897 5.70462 44.3897H6.45808C7.44749 46.4957 9.63335 48 12.1017 48H35.9378C38.4138 48 40.5486 46.5149 41.5016 44.3895H42.3015C45.2143 44.3895 47.5844 41.9084 47.5844 38.8588V31.9155C47.5844 31.0524 46.8846 30.3525 46.0212 30.3525ZM23.9651 3.12598C25.5094 3.12598 26.8291 4.10505 27.3369 5.47475C26.2441 5.26772 25.1173 5.15798 23.9651 5.15798C22.813 5.15798 21.686 5.26772 20.5933 5.47475C21.1008 4.10489 22.4206 3.12598 23.9651 3.12598ZM23.9651 8.28396C32.2043 8.28396 38.9077 14.9872 38.9077 23.2263V28.3686H37.0163V23.4091C37.0163 16.2098 31.1618 10.3526 23.9651 10.3526C16.7689 10.3526 10.914 16.2098 10.914 23.4091V28.3686H9.0226V23.2263C9.0226 14.987 15.7258 8.28396 23.9651 8.28396ZM33.8903 28.3686H14.04V23.4091C14.04 17.9334 18.4923 13.4788 23.9651 13.4788C29.438 13.4788 33.8903 17.9334 33.8903 23.4091V28.3686ZM5.89662 41.2634C4.70761 41.2634 3.54785 40.1847 3.54785 38.8588V33.4785H5.89662V41.2634ZM35.938 44.874H12.1017C10.4329 44.874 9.02244 43.514 9.02244 41.9042V31.4946H38.9075V41.9042C38.9077 43.5418 37.5752 44.874 35.938 44.874ZM42.0337 41.2634V33.4785H44.4586V38.8588C44.4584 40.1849 43.2227 41.2634 42.0337 41.2634Z" fill="#828282" />
                        </g>
                        <defs>
                          <clipPath id="clip0_765_20334">
                            <rect width="48" height="48" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div onClick={() => setActiveTab('question')} className={styles.controls__questionList}>
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M41.6298 5.79408C41.2377 5.40201 40.7059 5.18189 40.1515 5.18189L33.8787 5.18368V3.09095C33.8787 2.47274 33.6053 1.88632 33.1317 1.48903C32.6581 1.09174 32.0332 0.924455 31.4242 1.03182L7.72734 5.21612C6.72827 5.39257 6 6.26073 6 7.27507V40.7273C6 41.7419 6.72845 42.6101 7.72752 42.7864L31.4246 46.9682C31.5456 46.9895 31.6671 47 31.788 47C32.2756 47 32.7525 46.8292 33.1319 46.5109C33.6054 46.1136 33.8789 45.5272 33.8789 44.9092V42.8182H40.1516C41.3064 42.8182 42.2426 41.882 42.2426 40.7273V7.27274C42.2424 6.71813 42.022 6.18616 41.6298 5.79408ZM29.697 7.27525V40.7274V43.0326L10 40V8L29.697 4.90645V7.27525ZM38.5 39H33.8787V9H38.5V39Z" fill="#828282" />
                        <path d="M24.9059 23.9151C24.517 23.5262 23.9775 23.3032 23.4269 23.3032C22.8762 23.3032 22.3368 23.5262 21.9479 23.9151C21.5589 24.3041 21.3359 24.8435 21.3359 25.3942C21.3359 25.9448 21.5589 26.4828 21.9479 26.8732C22.3381 27.2621 22.8762 27.4851 23.4269 27.4851C23.9775 27.4851 24.517 27.2621 24.9059 26.8732C25.2948 26.4829 25.5178 25.9448 25.5178 25.3942C25.5178 24.8435 25.2948 24.3041 24.9059 23.9151Z" fill="#828282" />
                      </svg>
                    </div>
                  </div>
                </>}
                {activeTab === 'backpack' &&
                  <div className={styles.controls__block}>
                    <div className={styles.controls__header}>
                      <p className={styles.controls__title}>НАйденные предметы</p>
                      <Button text='Назад в комнату' mainClass='ld_button_secondary1' onClick={() => setActiveTab(undefined)} />
                    </div>
                    <div className={styles.controls__main}>
                      <p className={styles.main__title}>Нажмите и удерживайте предмет, чтобы перетащить его в комнату</p>
                      <div className={styles.main__subjects}>
                        {backpack.map((subject) => (
                          <div key={subject.id} onMouseDown={() => { setSelectedSubject(subject); setActiveTab(undefined) }} className={styles.main__subject}>
                            <img src={subject.src} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }
                {activeTab === 'question' && !activeQuestion &&
                  <div className={styles.controls__questions}>
                    <h2 className={styles.questions__title}>Хотите выбраться из комнаты?</h2>
                    <p className={styles.questions__info}>{template.type === 'list' ?
                      'Взаимодействуйте с предметами в комнате, находите задания и решите все их верно, чтобы завершить квест.' :
                      'Взаимодействуйте с предметами в комнате, и правильно ответьте на вопрос'
                    }</p>
                    <p className={styles.questions__text}>{template.type === 'list' ? 'Решено заданий:' : 'Контрольный вопрос:'}</p>
                    <div className={styles.questions__list}>
                      {template.type === 'question' && controlQuestion &&
                        <div onClick={() => setActiveQuestion({task: controlQuestion, index: 'control', type: 'controlQuestion'})} className={`${styles.questions__question} ${styles[`questions__question_${controlQuestion.status}`]}`}>
                          <p>1</p>
                          {controlQuestion.status !== 'notStarted' && <img className={styles.questions__question__status} src={`/questBuilder/icons/answerStatus/${controlQuestion.status}.svg`} />}
                        </div>
                      }
                      {template.type === 'list' &&
                        questionList.map((question, index) => (
                          <div key={question.id} onClick={question.status !== 'notFind' ? () => {setActiveQuestion({task: question, index: index, type: 'questionListTasks'})} : undefined} className={`${styles.questions__question} ${styles[`questions__question_${question.status}`]}`}>
                            <p>{index + 1}</p>
                            {question.status !== 'notStarted' && <img className={styles.questions__question__status} src={`/questBuilder/icons/answerStatus/${question.status}.svg`} />}
                          </div>
                        ))
                      }
                    </div>
                    {isDisplayFinishButton() ? 
                      <Button text={'Выйти из квеста'} mainClass='ld_button_secondary1' onClick={() => {setIsFinish(true)}} />
                      :
                      <Button text={'Продолжить'} mainClass='ld_button_secondary1' onClick={() => {setActiveTab(undefined); setIsActiveLeft(false)}} />
                    }
                  </div>
                }
                {activeTab === 'question' && activeQuestion &&
                  <Question 
                    confirmAnswers={(task)=>checkAnswers(task, activeQuestion.type, activeQuestion.index === 'control' ? 0 : activeQuestion.index)} 
                    taskIndex={activeQuestion.index} 
                    task={activeQuestion.task} 
                  />
                }
              </>
            }
          </div>
        </>
      }
      {
        isFinish &&
          <div className={styles.finish}>
            <div className={styles.finish__header}>
              <p className={styles.finish__text}>квест завершен</p>
              <Button text={'готово'} onClick={() => {setIsFinish(false);setIsActiveLeft(false);setActiveTab(undefined)}} mainClass='ld_button_secondary1' />
            </div>
            <div className={styles.finish__content}>
              <p className={styles.finish__description}>{quest.description}</p>
            </div>
          </div>
      }
      <div className={`${styles.gameboard} ${stage === 0 || isFinish ? styles.gameboard_hidden : ''}`}>
        {containerSize && (
          <UserGameboard
            selectedSubject={selectedSubject}
            size={containerSize}
            helper={activeHelper}
            resetHelper={() => setActiveHelper(undefined)}
            onSuccessHover={onSuccessHoverRelation}
            resetSelectedSubject={()=>setSelectedSubject(undefined)}
            background={
              activeRoom.background.type === 'color'
                ? { type: 'color', value: activeRoom.background.value }
                : { type: 'file', value: `/img/backgrounds/${activeRoom.background.value}` }
            }
            entities={stage === 0 ? [] : getEntitiesToRender()}
            onSelect={onClickObject}
          />
        )}
      </div>
    </div>
    </>
  );
}