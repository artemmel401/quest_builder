import Head from 'next/head'
import Header from '@/components/header/header'
import { useEffect, useState } from 'react'
import { ButtonTask } from '@/components/button/button'
import { useParams } from 'next/navigation'
import { LoaderFullScreen } from '../../components/loaders/Loaders'
import { changeQuestField, getQuest, getTemplate } from '@/utils/requests'
import { Answer, Quest, QuestionType, Task, Variant } from '@/types/quest'
import styles from './styles.module.scss'
import ImageInput, { DropdownList, FileInput, TextAreaInput, TextInput, TextInputSecondary } from '@/components/input/input'
import { CheckBox, Radio } from '@/components/selectors/Selectors'
import { Template } from '@/types/template'
import { nanoid } from 'nanoid'

export default function QuestConstructor() {

    const params = useParams()


    const [questTitle, setQuestTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [variants, setVariants] = useState<Variant[]>()

    const [number, setNumber] = useState<number>()
    const [quest, setQuest] = useState<Quest>()
    const [template, setTemplate] = useState<Template>()
    const [questionsCount, setQuestionsCount] = useState(0)

    const onGetTemplate = async (id: string) => {
        const userTemplate: Template[] = await getTemplate(id)
        let count = 0
        console.log(userTemplate[0])
        for (const relation of userTemplate[0].relations) {
            if (relation.type === 'question' || relation.type === 'questionList') {
                count++
            }
        }
        if (userTemplate[0].type === 'question') {
            count++
        }
        setQuestionsCount(count)
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
        newVariants[index] = {...variant};
        setVariants(newVariants)
    }

    const onDelVariant = (index: number) => {

    }

    const onAddVariant = () => {
        const newQuest: Quest = JSON.parse(JSON.stringify(quest));
        newQuest.variants.push({ id: new Date().getTime(), tasks: Array.from({ length: questionsCount }, (_, index) => ({ 
            id: index,
            type: 'radio',
            answers: [],
            content: '',
        }))
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
    },[variants])

    if (!quest || !number || !template) {
        return <LoaderFullScreen />
    }

    return (
        <>
            <Head>
                <title>КВЕСТ</title>
            </Head>
            <div>
                <Header isNewQuest />
                <main className={styles.editRoom}>
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
                </main>
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
        let tasks = newVariant.tasks;
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
        setVariant(newVariant);
    }, []);

    useEffect(() => {
        let e = document.getElementById('taskCreator' + props.variantNum);
        if (e) e.scrollIntoView({ block: "center", behavior: "smooth" });
    }, [selectedBlock]);

      const onSelectedBlock = (blockId: number) => {
        setSelectedBlock(blockId);
        console.log(blockId, variant.tasks);
      };

    const questionTypeSelectorHandler = (k: number, type: QuestionType) => {
        let newVariant: Variant = JSON.parse(JSON.stringify(variant));

        let tasks: Task[] = (newVariant.tasks !== undefined) ? newVariant.tasks : [];
        tasks[k] = { ...tasks[k], 'type': type, };
        let task: Task = tasks[k];
        if (task.answers === undefined) {
            task.answers = [];
        }
        task.answers = task.answers.map((answer, i) => {
            return { ...answer, 'correct': (task.type === 'text') }
        });
        if (task.answers.length === 0) {
            let flag = task.type === 'text';
            task.answers.push({ 'id': nanoid(), 'content': '', correct: flag });
        }
        setVariant(newVariant);
    };


    const onChangeAnswerHandler = (questionNumber: number, answerNumber: number, content: string) => {
        console.log('in', selectedBlock)
        if (selectedBlock === undefined) return;
        console.log(variant.tasks[selectedBlock].answers.length)
        let len = (variant.tasks[selectedBlock].answers !== undefined) ? variant.tasks[selectedBlock].answers.length : 0;
        let newVariant = JSON.parse(JSON.stringify(variant));
        if (len - 1 === answerNumber) {
            let flag = newVariant.tasks[selectedBlock].type === 'text';
            newVariant.tasks[selectedBlock].answers.push({ 'id': Date.now(), 'content': '', correct: flag });
        }
        if (content === '') newVariant.tasks[selectedBlock].answers.splice(answerNumber, 1);
        else newVariant.tasks[selectedBlock].answers[answerNumber].content = content;
        setVariant(newVariant);
    };

    const onSelectCorrectAnswer = (k: number, index: number) => {
        if (selectedBlock === undefined) return;
        let newVariant: Variant = JSON.parse(JSON.stringify(variant));
        let task = newVariant.tasks[selectedBlock];
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
        if (!selectedBlock) return;
        console.log(questionNumber, content);
        let newVariant: Variant = JSON.parse(JSON.stringify(variant));
        newVariant.tasks[questionNumber].content = content;
        setVariant(newVariant);
    };

    async function updateFileContent(variantId: number, taskId: number, file: File, fieldName = 'content') {
        const formData = new FormData();
        formData.append('activityNumber', props.number.toString());
        formData.append('variant', variantId.toString());
        formData.append('taskId', taskId.toString());
        formData.append('file', file);
        let response = await fetch('/api/upload', {
            method: 'POST',
            headers: {},
            body: formData
        });
        const result = await response.json();
        if (result.result === 'ok') {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant.tasks;
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
        if (result.result === 'ok') {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant.tasks;
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
        if (result.result === 'ok') {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant.tasks;
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
        if (result.result === 'ok') {
            let newVariant = JSON.parse(JSON.stringify(variant));
            let tasks = newVariant.tasks;
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
                    {
                        variant.tasks.map((block, index) => {
                            return <div className={styles.editRoom__item} key={block.id} onClick={() => { onSelectedBlock(block.id) }}>
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
                </div>
                {(selectedBlock !== undefined) && <div className={styles.fullContainer} id={'taskCreator' + props.variantNum}>
                    <div className={styles.testVariant}>
                        <div className={styles.testVariant__questionInfo}>
                            <div className={styles.testVariant__question}>
                                {<div className={styles.testVariant__type}>
                                    <DropdownList title={'Выберите тип вопроса'}
                                        disabled={false}
                                        list={typeList} value={props.variant.tasks[selectedBlock].type}
                                        onChange={(type) => { questionTypeSelectorHandler(selectedBlock, type as QuestionType) }}
                                    />
                                </div>}
                                <div className={styles.testVariant__value} key={selectedBlock}>
                                    {
                                        <TextAreaInput caption={'Введите вопрос'}
                                            warning={false} placeholder={'Вопрос'} fullwidth={true}
                                            warningText={''}
                                            disabled={false}
                                            defaultValue={props.variant.tasks[selectedBlock].content}
                                            onChange={(content) => { onChangeContentTask(selectedBlock, content) }} 
                                        />
                                    }
                                </div>
                            </div>
                            <div className={styles.testVariant__image} key={selectedBlock}>
                                <FileInput acceptedFiles={acceptedFiles}
                                    moveOrClick={'Перетащите сюда файлы или нажмите, чтобы загрузитиь изображение или аудио'}
                                    format={'Формат: PNG, JPEG, BMP, MP3, ААС, OOG до 20 МБ'}
                                    previewImage={props.variant.tasks[selectedBlock].image}
                                    disabled={false}
                                    onDeleteFileContent={async () => { return await deleteFileContent(props.variantNum, selectedBlock, props.variant.tasks[selectedBlock].image as string, 'image') }}
                                    onChange={async (file) => { return await updateFileContent(props.variantNum, selectedBlock, file, 'image') }}
                                />
                            </div>
                        </div>
                        <div className={styles.testVariant__variants}>
                            {(variant.tasks[selectedBlock].type === 'text') &&
                                <div className={styles.answerList} key={selectedBlock}>
                                    {variant.tasks[selectedBlock].answers.map((answer, index) => {
                                        return <div className={styles.answerList__item} key={answer.id}>
                                            <TextInputSecondary
                                                fullwidth={true}
                                                value={answer.content}
                                                placeholder={'Введите вариант ответа'}
                                                disabled={false}
                                                clearning
                                                onChange={(content) => { onChangeAnswerHandler(selectedBlock, index, content) }}
                                            />
                                        </div>
                                    })
                                    }
                                </div>}
                            {(variant.tasks[selectedBlock].type === 'radio') &&
                                <div className={styles.questAnswerList} key={selectedBlock}>
                                    {(variant.tasks[selectedBlock].answers !== undefined) && variant.tasks[selectedBlock].answers.map((answer, index) => {
                                        return <div className={styles.questAnswerList__item} key={answer.id}>
                                            <div className={styles.questAnswerList__row}>
                                                <div className={styles.questAnswerList__answerSelector} onClick={() => { onSelectCorrectAnswer(props.variantNum, index) }}>
                                                    <Radio selected={answer.correct} />
                                                </div>
                                                <div className={styles.questAnswerList__answerContent}>
                                                    <TextInputSecondary clearning disabled={false} fullwidth={true} value={answer.content} placeholder={'Добавьте вариант ответа'}
                                                        onChange={(content) => { onChangeAnswerHandler(selectedBlock, index, content) }} />
                                                </div>
                                            </div>
                                            <div className={styles.questAnswerList__image}>
                                                {
                                                    <div className={styles.questAnswerList__answerImage}>
                                                        <ImageInput
                                                            previewImage={variant.tasks[selectedBlock].answers[index].fileUrl}
                                                            onDeleteAnswerFile={async () => { return await deleteAnswerFile(selectedBlock, index, props.variant.tasks[selectedBlock].answers[index].fileUrl as string) }}
                                                            onChange={async (file) => { return await updateAnswerFile(props.variantNum, selectedBlock, index, file) }} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    })
                                    }
                                </div>}
                            {(variant.tasks[selectedBlock].type === 'checkbox') &&
                                <div className={styles.questAnswerList} key={selectedBlock}>
                                    {(variant.tasks[selectedBlock].answers !== undefined) && variant.tasks[selectedBlock].answers.map((answer, index) => {
                                        return <div className={styles.questAnswerList__item} key={answer.id}>
                                            <div className={styles.questAnswerList__row}>
                                                <div className={styles.questAnswerList__answerSelector} onClick={() => { onSelectCorrectAnswer(props.variantNum, index) }}>
                                                    <CheckBox selected={answer.correct} />
                                                </div>
                                                <div className={styles.questAnswerList__answerContent}>
                                                    <TextInputSecondary disabled={false} clearning fullwidth={true} value={answer.content} placeholder={'Добавьте вариант ответа'}
                                                        onChange={(content) => { onChangeAnswerHandler(selectedBlock, index, content) }} />
                                                </div>
                                            </div>
                                            <div className={styles.questAnswerList__image}>
                                                {
                                                    <div className={styles.questAnswerList__answerImage}>
                                                        <ImageInput
                                                            previewImage={variant.tasks[selectedBlock].answers[index].fileUrl}
                                                            onDeleteAnswerFile={async () => { return await deleteAnswerFile(selectedBlock, index, props.variant.tasks[selectedBlock].answers[index].fileUrl as string) }}
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