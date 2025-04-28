import Head from 'next/head'
import Header from '@/components/header/header'
import { useEffect, useState } from 'react'
import { Button, ButtonTask } from '@/components/button/button'
import { useParams } from 'next/navigation'
import { LoaderFullScreen } from '../../components/loaders/Loaders'
import { changeQuestField, getQuest, getTemplate } from '@/utils/requests'
import { Answer, Quest, QuestionType, Task, Variant, VariantQuestionType } from '@/types/quest'
import styles from './styles.module.scss'
import ImageInput, { DropdownList, FileInput, TextAreaInput, TextInput, TextInputSecondary } from '@/components/input/input'
import { CheckBox, Radio } from '@/components/selectors/Selectors'
import { Template } from '@/types/template'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import QrCode from '@/components/qrCode/qrCode'

export default function QuestConstructor() {

    const params = useParams()
    const router = useRouter()

    const [stage, setStage] = useState(1)

    const [questTitle, setQuestTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [variants, setVariants] = useState<Variant[]>()

    const [number, setNumber] = useState<number>()
    const [quest, setQuest] = useState<Quest>()
    const [template, setTemplate] = useState<Template>()
    const [questionCountForList, setQuestionCountForList] = useState(0)
    const [questionsCount, setQuestionsCount] = useState(0)
    const [isIncludeControl, setIsIncludeControl] = useState(false)

    const returnToAllQuests = () => {
        router.push('/')
    }

    const onGetTemplate = async (id: string) => {
        const userTemplate: Template[] = await getTemplate(id)
        let count = 0
        let countForList = 0
        console.log(userTemplate[0])
        for (const relation of userTemplate[0].relations) {
            if (relation.type === 'question') {
                count++
            }
            if (relation.type === 'questionList') {
                countForList++
            }
        }
        if (userTemplate[0].type === 'question') {
            setIsIncludeControl(true)
        }
        setQuestionsCount(count)
        setQuestionCountForList(countForList)
        setTemplate(userTemplate[0])
    }

    const onGetQuest = async (number: number) => {
        const userQuest: Quest[] = await getQuest(number)
        setQuest(userQuest[0])
        setQuestTitle(userQuest[0].title)
        setDescription(userQuest[0].description)
        setVariants(userQuest[0].variants)
        setNumber(number)
        onGetTemplate(userQuest[0].templateId)
        console.log(userQuest)
    }

    const changeQuestTitle = (title: string) => {
        if (!quest) return
        setQuestTitle(title)
        setQuest({ ...quest, title: title })
    }

    const changeQuestDescription = (description: string) => {
        if (!quest) return
        setDescription(description)
        setQuest({ ...quest, description: description })
    }

    const changeQuestVariants = (newVariants: Variant[]) => {
        if (!quest) return
        setQuest({ ...quest, variants: newVariants })
        setVariants(newVariants)
    }

    const onUpdateVariant = (index: number, variant: Variant) => {
        const newVariants: Variant[] = JSON.parse(JSON.stringify(variants));
        newVariants[index] = { ...variant };
        setVariants(newVariants)
    }

    const onDelVariant = (index: number) => {
        if (!quest) return
        const newVariants: Variant[] = JSON.parse(JSON.stringify(variants));
        newVariants.splice(index, 1);
        setVariants(newVariants)
        setQuest({ ...quest, variants: newVariants })
    }

    const createVarinatTaskArray = (length: number) => {
        return Array.from({ length: length }, (_, index) => ({
            id: index,
            type: 'radio' as QuestionType,
            answers: [] as Answer[],
            content: '',
        }))
    }

    const onAddVariant = () => {
        const newQuest: Quest = JSON.parse(JSON.stringify(quest));
        newQuest.variants.push({
            id: new Date().getTime(),
            tasks: createVarinatTaskArray(questionsCount),
            questionListTasks: createVarinatTaskArray(questionCountForList),
            controlQuestion: isIncludeControl ? createVarinatTaskArray(1) : createVarinatTaskArray(0)
        });
        changeQuestVariants(newQuest.variants)
    }

    useEffect(() => {
        console.log(params)
        if (params && typeof params.questNumber === 'string') {
            onGetQuest(parseInt(params.questNumber))
        }
    }, [params])


    useEffect(() => {
        if (number) {
            changeQuestField(number, 'title', questTitle)
        }
    }, [questTitle])

    useEffect(() => {
        if (number) {
            changeQuestField(number, 'description', description)
        }
    }, [description])

    useEffect(() => {
        if (number) {
            changeQuestField(number, 'variants', variants)
        }
    }, [variants])

    if (!quest || !number || !template) {
        return <LoaderFullScreen />
    }

    return (
        <>
            <Head>
                <title>КВЕСТ</title>
            </Head>
            <div>
                <Header isNewQuest>
                    {<div className={styles.edit}>
                        <Button text={stage === 1 ? 'Далее' : 'Готово'} mainClass='ld_button_secondary1' onClick={stage === 1 ? ()=>setStage(2) : returnToAllQuests}/>
                    </div>}
                </Header>
                {stage === 1 ? <main className={styles.editRoom}>
                    <div className={styles.editRoom__mainInfo}>
                        <div className={styles.editRoom__params}>
                            <div className={`${styles.editRoom__input} ${styles.editRoom__input_big}`}>
                                <TextInputSecondary placeholder={'Введите название квеста'} fullwidth={true}
                                    warningText={''}
                                    disabled={false}
                                    value={quest.title}
                                    onChange={changeQuestTitle}
                                    onFocus={() => { }} />
                            </div>
                            <div className={styles.editRoom__input}>
                                <TextAreaInput caption={'Описание квеста'}
                                    warning={false} placeholder={'Введите описание квеста'} fullwidth={true}
                                    disabled={false}
                                    defaultValue={quest.description}
                                    onChange={changeQuestDescription} />
                            </div>
                        </div>
                        <div className={styles.editRoom__questPreview}>
                            <div className={styles.editRoom__previewContainer}>
                                <div>
                                    <div className={styles.editRoom__previewTitle}>{'Посмотрите видео создания'}</div>
                                    <div className={styles.editRoom__previewVideo}>
                                        <video src={'/video/how-to-quests.mp4'} poster={'/images/quest-room/questCover.png'} controls></video>
                                    </div>
                                </div>
                                <div className={styles.editRoom__downloader}>
                                    <div className={`${styles.editRoom__file}`}>
                                        <div className={styles.editRoom__fileContainer}>
                                            <div className={styles.editRoom__fileIcon} />
                                            <div className={styles.editRoom__fileName}>Прохождение квеста (.pdf)</div>
                                        </div>
                                        {<img src={'/images/icons/download.svg'} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.editRoom__tasks}>
                        <div className={styles.editRoom__title}>{'Создайте задания'}</div>
                        <div className={styles.editRoom__main}>
                            {
                                quest.variants.map((variant, k) =>
                                    <VariantNew key={variant.id} variant={variant}
                                        variantNum={k}
                                        number={number}
                                        onChangeVariant={(newVariant) => { onUpdateVariant(k, newVariant) }}
                                        onDelVariant={onDelVariant}
                                    />
                                )
                            }
                        </div>
                        {
                            <div className={styles.editRoom__addVariant} onClick={() => { onAddVariant() }}>
                                <div className={styles.bigButton}>
                                    <div className={styles.bigButton__icon}><img src={'/images/icons/add_big.svg'} /></div>
                                    <div className={styles.bigButton__text}>{'Добавьте вариант'}</div>
                                </div>
                            </div>
                        }
                    </div>
                </main> :
                    <div className={styles.roomPublish}>
                        <div className={styles.roomPublish__pagetitle}>{'Вы создали квест!'}</div>
                        <div className={styles.roomPublish__group}>
                            <div className={styles.roomPublish__subtitle}>{'Поделитесь с участниками'}</div>
                            <div className={styles.roomPublish__param}>
                                <div className={styles.roomPublish__name}>Название:</div>
                                <div className={`${styles.roomPublish__value} ${styles.roomPublish__value_name}`}>
                                    {quest.title}
                                </div>
                            </div>
                            <div className={styles.roomPublish__param}>
                                <div className={styles.roomPublish__name}>Номер:</div>
                                <div className={`${styles.roomPublish__value} ${styles.roomPublish__value_number}`}>
                                    {quest.number}
                                </div>
                            </div>
                            <div className={styles.roomPublish__param}>
                                <div className={styles.roomPublish__name}>Прямая ссылка</div>
                                <div className={`${styles.roomPublish__value} ${styles.roomPublish__value_link}`}>
                                    <a href={`/${quest.number}`} target={"_blank"}>
                                        {`http://localhost:8080/${quest.number}`}
                                    </a>
                                </div>
                            </div>
                            <QrCode number={quest.number} />
                        </div>
                    </div>}
            </div>
        </>
    )
}

type VariantNewProps = {
    variant: Variant
    onChangeVariant: (variant: Variant) => void
    variantNum: number
    number: number
    onDelVariant: (variantNum: number) => void
}

function VariantNew(props: VariantNewProps) {
    //onChangeVariant
    const [variant, setVariant] = useState(props.variant);
    useEffect(() => {
        let newVariant: Variant = JSON.parse(JSON.stringify((variant)));
        if (!selectedBlockType) return 
        let tasks = newVariant[selectedBlockType];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].answers !== undefined) {
                tasks[i].answers = tasks[i].answers.filter((answer) => {
                    return answer.content !== '';
                })
            }
        }
        props.onChangeVariant(newVariant);
    }, [variant]);

    const [hide, setHide] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState<number>();
    const [selectedBlockType, setSelectedBlockType] = useState<VariantQuestionType>()
    const [typeList, setTypeList] = useState([
        { 'type': 'text', 'title': 'Открытый вопрос', },
        { 'type': 'checkbox', 'title': 'Множественный выбор', },
        { 'type': 'radio', 'title': 'Одиночный выбор', },
    ]);

    useEffect(() => {
        let newVariant = JSON.parse(JSON.stringify(variant));
        for (let i = 0; i < newVariant.tasks.length; i++) {
            if (newVariant.tasks[i].answers === undefined) newVariant.tasks[i].answers = [];
            let flag = newVariant.tasks[i].type === 'text';
            newVariant.tasks[i].answers.push({ 'id': Date.now(), 'content': '', correct: flag });
        }
        for (let i = 0; i < newVariant.questionListTasks.length; i++) {
            if (newVariant.questionListTasks[i].answers === undefined) newVariant.questionListTasks[i].answers = [];
            let flag = newVariant.questionListTasks[i].type === 'text';
            newVariant.questionListTasks[i].answers.push({ 'id': Date.now(), 'content': '', correct: flag });
        }
        for (let i = 0; i < newVariant.controlQuestion.length; i++) {
            if (newVariant.controlQuestion[i].answers === undefined) newVariant.controlQuestion[i].answers = [];
            let flag = newVariant.controlQuestion[i].type === 'text';
            newVariant.controlQuestion[i].answers.push({ 'id': Date.now(), 'content': '', correct: flag });
        }
        setVariant(newVariant);
    }, []);

    useEffect(() => {
        let e = document.getElementById('taskCreator' + props.variantNum);
        if (e) e.scrollIntoView({ block: "center", behavior: "smooth" });
    }, [selectedBlock]);

    const onSelectedBlock = (blockId: number, type: VariantQuestionType) => {
        setSelectedBlock(blockId);
        setSelectedBlockType(type)
    };

    const questionTypeSelectorHandler = (k: number, type: QuestionType) => {
        let newVariant: Variant = JSON.parse(JSON.stringify(variant));
        if (!selectedBlockType) return
        let tasks: Task[] = (newVariant[selectedBlockType] !== undefined) ? newVariant[selectedBlockType] : [];
        tasks[k] = { ...tasks[k], 'type': type, };
        let task: Task = tasks[k];
        if (task.answers === undefined) {
            task.answers = [];
        }
        task.answers = task.answers.map((answer) => {
            return { ...answer, 'correct': (task.type === 'text') }
        });
        if (task.answers.length === 0) {
            let flag = task.type === 'text';
            task.answers.push({ 'id': nanoid(), 'content': '', correct: flag });
        }
        newVariant[selectedBlockType][k] = task;
        setVariant(newVariant);
    };


    const onChangeAnswerHandler = (answerType: VariantQuestionType | undefined, answerNumber: number, content: string) => {
        console.log('in', selectedBlock)
        if (selectedBlock === undefined || !answerType) return;
        let newVariant = JSON.parse(JSON.stringify(variant));
        let len = (variant[answerType][selectedBlock].answers !== undefined) ? variant[answerType][selectedBlock].answers.length : 0;
        if (len - 1 === answerNumber) {
            let flag = newVariant[answerType][selectedBlock].type === 'text';
            newVariant[answerType][selectedBlock].answers.push({ 'id': Date.now(), 'content': '', correct: flag });
        }
        if (content === '') newVariant[answerType][selectedBlock].answers.splice(answerNumber, 1);
        else newVariant[answerType][selectedBlock].answers[answerNumber].content = content;
        setVariant(newVariant);
    };

    const onSelectCorrectAnswer = (answerType: VariantQuestionType | undefined, index: number) => {
        if (selectedBlock === undefined || !answerType) return;
        let newVariant: Variant = JSON.parse(JSON.stringify(variant));
        let task: Task | undefined
        task = newVariant[answerType][selectedBlock];
        if (!task) {
            return
        }
        if (task.type === 'radio') {
            task.answers = task.answers.map((answer, i) => {
                return { ...answer, 'correct': (index === i) }
            });
        }
        else if (task.type === 'checkbox') {
            task.answers[index].correct = !task.answers[index].correct;
        }
        setVariant(newVariant);
    };
    const onChangeContentTask = (questionNumber: number, content: string) => {
        if (selectedBlock===undefined || !selectedBlockType) return;
        let newVariant: Variant = JSON.parse(JSON.stringify(variant));
        newVariant[selectedBlockType][questionNumber].content = content;
        setVariant(newVariant);
    };

    async function updateFileContent(variantId: number, taskId: number, file: File, fieldName = 'content') {
        const formData = new FormData();
        formData.append('activityNumber', props.number.toString());
        formData.append('variant', variantId.toString());
        formData.append('taskId', taskId.toString());
        formData.append('file', file);
        let response = await fetch('/api/s3/upload', {
            method: 'POST',
            headers: {},
            body: formData
        });
        const result = await response.json();
        console.log(result)
        if (result.result === 'ok' && selectedBlockType) {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant[selectedBlockType];
            tasks[taskId][fieldName] = result.url;
            setVariant(newVariant);
            return 'done'
        }
        else return 'error';
    }
    async function updateAnswerFile(variantId: number, taskId: number, answerId: number, file: File) {
        const formData = new FormData();
        formData.append('activityNumber', props.number.toString());
        formData.append('variant', variantId.toString());
        formData.append('taskId', taskId.toString());
        formData.append('file', file);
        let response = await fetch('/api/s3/upload', {
            method: 'POST',
            headers: {},
            body: formData
        });
        const result = await response.json();
        if (result.result === 'ok' && selectedBlockType) {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant[selectedBlockType];
            tasks[taskId].answers[answerId].fileUrl = result.url;
            setVariant(newVariant);
            return 'done'
        }
        else return 'error';
    }

    async function deleteFileContent(variantId: number, taskId: number, previewImage: string, fieldName = 'content') {
        let response = await fetch('/api/s3/delete', {
            method: 'POST', headers: {}, body: previewImage,
        });
        const result = await response.json();
        if (result.result === 'ok' && selectedBlockType) {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant[selectedBlockType];
            tasks[taskId][fieldName] = undefined;
            setVariant(newVariant);
            return 'done'
        }
        else return 'error';
    }
    async function deleteAnswerFile(taskId: number, answerId: number, previewImage: string) {
        let response = await fetch('/api/s3/delete', {
            method: 'POST', headers: {}, body: previewImage,
        });
        const result = await response.json();
        if (result.result === 'ok' && selectedBlockType) {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant[selectedBlockType];
            tasks[taskId].answers[answerId].fileUrl = undefined;
            setVariant(newVariant);
            return 'done'
        }
        else return 'error';
    }
    //console.log(variant);
    let acceptedFiles = ['png', 'jpeg', 'jpg', 'bmp', 'JPEG', 'JPG', 'mp3', 'aac', 'ogg',];
    return (
        <div className={styles.editRoom__variant}>
            <div className={styles.editRoom__variantHeader}>
                <div className={`${styles.editRoom__variantTitle} 
                  ${(hide) ? styles.editRoom__variantTitle_hide : ''}`} onClick={() => { setHide(!hide); }}>
                    <span>{'Вариант'} {props.variantNum + 1}</span> <img src={'/images/icons/up.svg'} />
                </div>
                <div className={styles.editRoom__variantDelete} onClick={() => { props.onDelVariant(props.variantNum) }}>
                    <span>{'Удалить вариант'}</span> <img src={'/images/icons/trash_red.svg'} />
                </div>
            </div>
            {(!hide) && <div className={styles.editRoom__variantContent}>
                <div className={styles.editRoom__variantHint}>{'Нажмите на номер, чтобы загрузить задание. Все изменения сохраняются автоматически'}</div>

                <div className={styles.editRoom__blocks}>
                    {variant.controlQuestion[0] &&
                        <>
                            <div className={styles.editRoom__item} key={variant.controlQuestion[0].id} onClick={() => {onSelectedBlock(variant.controlQuestion[0].id, 'controlQuestion') }}>
                                <ButtonTask
                                    text={'выход'}
                                    pic={
                                        ((variant.controlQuestion[0].type === 'radio') && (variant.controlQuestion[0].content !== undefined) && '/images/icons/radio_tur.svg') ||
                                        ((variant.controlQuestion[0].type === 'radio') && (selectedBlock !== variant.controlQuestion[0].id) && '/images/icons/radio_black.svg') ||
                                        ((variant.controlQuestion[0].type === 'radio') && (selectedBlock === variant.controlQuestion[0].id) && '/images/icons/radio_green.svg') ||

                                        ((variant.controlQuestion[0].type === 'checkbox') && (variant.controlQuestion[0].content !== undefined) && '/images/icons/checkbox_tur.svg') ||
                                        ((variant.controlQuestion[0].type === 'checkbox') && (selectedBlock !== variant.controlQuestion[0].id) && '/images/icons/checkbox_black.svg') ||
                                        ((variant.controlQuestion[0].type === 'checkbox') && (selectedBlock === variant.controlQuestion[0].id) && '/images/icons/checkbox_green.svg') ||

                                        ((variant.controlQuestion[0].type === 'text') && (variant.controlQuestion[0].content !== undefined) && (variant.controlQuestion[0].content !== '') && '/images/icons/text_tur.svg') ||
                                        ((variant.controlQuestion[0].type === 'text') && (selectedBlock !== variant.controlQuestion[0].id) && '/images/icons/text_black.svg') ||
                                        ((variant.controlQuestion[0].type === 'text') && (selectedBlock === variant.controlQuestion[0].id) && '/images/icons/text_green.svg')
                                    }
                                    pressed={(selectedBlock === variant.controlQuestion[0].id)}
                                />
                            </div>
                        </>
                    }
                    {
                        variant.tasks.map((block, index) => {
                            return <div className={styles.editRoom__item} key={block.id} onClick={() => { onSelectedBlock(block.id, 'tasks') }}>
                                <ButtonTask
                                    text={(index + 1).toString()}
                                    pic={
                                        ((props.variant.tasks[block.id].type === 'radio') && (props.variant.tasks[block.id].content !== undefined) && '/images/icons/radio_tur.svg') ||
                                        ((props.variant.tasks[block.id].type === 'radio') && (selectedBlock !== block.id) && '/images/icons/radio_black.svg') ||
                                        ((props.variant.tasks[block.id].type === 'radio') && (selectedBlock === block.id) && '/images/icons/radio_green.svg') ||

                                        ((props.variant.tasks[block.id].type === 'checkbox') && (props.variant.tasks[block.id].content !== undefined) && '/images/icons/checkbox_tur.svg') ||
                                        ((props.variant.tasks[block.id].type === 'checkbox') && (selectedBlock !== block.id) && '/images/icons/checkbox_black.svg') ||
                                        ((props.variant.tasks[block.id].type === 'checkbox') && (selectedBlock === block.id) && '/images/icons/checkbox_green.svg') ||

                                        ((props.variant.tasks[block.id].type === 'text') && (props.variant.tasks[block.id].content !== undefined) && (props.variant.tasks[block.id].content !== '') && '/images/icons/text_tur.svg') ||
                                        ((props.variant.tasks[block.id].type === 'text') && (selectedBlock !== block.id) && '/images/icons/text_black.svg') ||
                                        ((props.variant.tasks[block.id].type === 'text') && (selectedBlock === block.id) && '/images/icons/text_green.svg')
                                    }
                                    pressed={(selectedBlock === block.id)}
                                />
                            </div>
                        }
                        )
                    }
                    {variant.questionListTasks.map((block, index) => {
                        return <div className={styles.editRoom__item} key={block.id} onClick={() => { onSelectedBlock(block.id, 'questionListTasks') }}>
                            <ButtonTask
                                text={`${(index + 1).toString()} задание в списке`}
                                pic={
                                    ((props.variant.questionListTasks[block.id].type === 'radio') && (props.variant.questionListTasks[block.id].content !== undefined) && '/images/icons/radio_tur.svg') ||
                                    ((props.variant.questionListTasks[block.id].type === 'radio') && (selectedBlock !== block.id) && '/images/icons/radio_black.svg') ||
                                    ((props.variant.questionListTasks[block.id].type === 'radio') && (selectedBlock === block.id) && '/images/icons/radio_green.svg') ||

                                    ((props.variant.questionListTasks[block.id].type === 'checkbox') && (props.variant.questionListTasks[block.id].content !== undefined) && '/images/icons/checkbox_tur.svg') ||
                                    ((props.variant.questionListTasks[block.id].type === 'checkbox') && (selectedBlock !== block.id) && '/images/icons/checkbox_black.svg') ||
                                    ((props.variant.questionListTasks[block.id].type === 'checkbox') && (selectedBlock === block.id) && '/images/icons/checkbox_green.svg') ||

                                    ((props.variant.questionListTasks[block.id].type === 'text') && (props.variant.questionListTasks[block.id].content !== undefined) && (props.variant.questionListTasks[block.id].content !== '') && '/images/icons/text_tur.svg') ||
                                    ((props.variant.questionListTasks[block.id].type === 'text') && (selectedBlock !== block.id) && '/images/icons/text_black.svg') ||
                                    ((props.variant.questionListTasks[block.id].type === 'text') && (selectedBlock === block.id) && '/images/icons/text_green.svg')
                                }
                                pressed={(selectedBlock === block.id)}
                            />
                        </div>
                    })}
                </div>
                {(selectedBlock !== undefined && selectedBlockType) && 
                <div className={styles.fullContainer} id={'taskCreator' + props.variantNum}>
                    <div className={styles.testVariant}>
                        <div className={styles.testVariant__questionInfo}>
                            <div className={styles.testVariant__question}>
                                {<div className={styles.testVariant__type}>
                                    <DropdownList title={'Выберите тип вопроса'}
                                        disabled={false}
                                        list={typeList} value={variant[selectedBlockType][selectedBlock].type}
                                        onChange={(type) => { questionTypeSelectorHandler(selectedBlock, type as QuestionType) }}
                                    />
                                </div>}
                                <div className={styles.testVariant__value} key={selectedBlock}>
                                    {
                                        <TextAreaInput caption={'Введите вопрос'}
                                            warning={false} placeholder={'Вопрос'} fullwidth={true}
                                            warningText={''}
                                            disabled={false}
                                            defaultValue={props.variant[selectedBlockType][selectedBlock].content}
                                            onChange={(content) => { onChangeContentTask(selectedBlock, content) }}
                                        />
                                    }
                                </div>
                            </div>
                            <div className={styles.testVariant__image} key={selectedBlock}>
                                <FileInput acceptedFiles={acceptedFiles}
                                    moveOrClick={'Перетащите сюда файлы или нажмите, чтобы загрузитиь изображение или аудио'}
                                    format={'Формат: PNG, JPEG, BMP, MP3, ААС, OOG до 20 МБ'}
                                    previewImage={props.variant[selectedBlockType][selectedBlock].image}
                                    disabled={false}
                                    onDeleteFileContent={async () => { return await deleteFileContent(props.variantNum, selectedBlock, props.variant[selectedBlockType][selectedBlock].image as string, 'image') }}
                                    onChange={async (file) => { return await updateFileContent(props.variantNum, selectedBlock, file, 'image') }}
                                />
                            </div>
                        </div>
                        <div className={styles.testVariant__variants}>
                            {(variant[selectedBlockType][selectedBlock].type === 'text') &&
                                <div className={styles.answerList} key={selectedBlock}>
                                    {variant[selectedBlockType][selectedBlock].answers.map((answer, index) => {
                                        return <div className={styles.answerList__item} key={answer.id}>
                                            <TextInputSecondary
                                                fullwidth={true}
                                                value={answer.content}
                                                placeholder={'Введите вариант ответа'}
                                                disabled={false}
                                                clearning
                                                onChange={(content) => { onChangeAnswerHandler(selectedBlockType, index, content) }}
                                            />
                                        </div>
                                    })
                                    }
                                </div>}
                            {(variant[selectedBlockType][selectedBlock].type === 'radio') &&
                                <div className={styles.questAnswerList} key={selectedBlock}>
                                    {(variant[selectedBlockType][selectedBlock].answers !== undefined) && variant[selectedBlockType][selectedBlock].answers.map((answer, index) => {
                                        return <div className={styles.questAnswerList__item} key={answer.id}>
                                            <div className={styles.questAnswerList__row}>
                                                <div className={styles.questAnswerList__answerSelector} onClick={() => { onSelectCorrectAnswer(selectedBlockType, index) }}>
                                                    <Radio selected={answer.correct} />
                                                </div>
                                                <div className={styles.questAnswerList__answerContent}>
                                                    <TextInputSecondary clearning disabled={false} fullwidth={true} value={answer.content} placeholder={'Добавьте вариант ответа'}
                                                        onChange={(content) => { onChangeAnswerHandler(selectedBlockType, index, content) }} />
                                                </div>
                                            </div>
                                            <div className={styles.questAnswerList__image}>
                                                {
                                                    <div className={styles.questAnswerList__answerImage}>
                                                        <ImageInput
                                                            previewImage={variant[selectedBlockType][selectedBlock].answers[index].fileUrl}
                                                            onDeleteAnswerFile={async () => { return await deleteAnswerFile(selectedBlock, index, props.variant[selectedBlockType][selectedBlock].answers[index].fileUrl as string) }}
                                                            onChange={async (file) => { return await updateAnswerFile(props.variantNum, selectedBlock, index, file) }} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    })
                                    }
                                </div>}
                            {(variant[selectedBlockType][selectedBlock].type === 'checkbox') &&
                                <div className={styles.questAnswerList} key={selectedBlock}>
                                    {(variant[selectedBlockType][selectedBlock].answers !== undefined) && variant[selectedBlockType][selectedBlock].answers.map((answer, index) => {
                                        return <div className={styles.questAnswerList__item} key={answer.id}>
                                            <div className={styles.questAnswerList__row}>
                                                <div className={styles.questAnswerList__answerSelector} onClick={() => { onSelectCorrectAnswer(selectedBlockType, index) }}>
                                                    <CheckBox selected={answer.correct} />
                                                </div>
                                                <div className={styles.questAnswerList__answerContent}>
                                                    <TextInputSecondary disabled={false} clearning fullwidth={true} value={answer.content} placeholder={'Добавьте вариант ответа'}
                                                        onChange={(content) => { onChangeAnswerHandler(selectedBlockType, index, content) }} />
                                                </div>
                                            </div>
                                            <div className={styles.questAnswerList__image}>
                                                {
                                                    <div className={styles.questAnswerList__answerImage}>
                                                        <ImageInput
                                                            previewImage={variant[selectedBlockType][selectedBlock].answers[index].fileUrl}
                                                            onDeleteAnswerFile={async () => { return await deleteAnswerFile(selectedBlock, index, props.variant[selectedBlockType][selectedBlock].answers[index].fileUrl as string) }}
                                                            onChange={async (file) => { return await updateAnswerFile(props.variantNum, selectedBlock, index, file) }} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    })}
                                </div>}
                        </div>

                    </div>

                </div>}
            </div>}
        </div>
    )
}