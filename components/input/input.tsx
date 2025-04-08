import { ChangeEvent, DragEventHandler, useEffect, useRef, useState } from 'react'
import styles from './input.module.scss'
import fileStyles from './fileInput.module.scss'

type InputProps = {
  label: string
  placeholder: string
  value?: string | number
  onChange: (value: string | number) => void
  onBlur?: () => void
}

type DropdownListInput = {
  label: string
  placeholder: string
  value?: string | number
  list: readonly string[]
  onChange: (value: string) => void
}

type TextInputSecondaryProps = {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  focus?: boolean
  onFocus?: () => void
  onBlur?: (value: string) => void
  fullwidth?: boolean
  warning?: boolean
  big?: boolean
  placeholder?: string
  clearning?: boolean
  warningText?: string
}

type TextAreaInputProps = {
  defaultValue?:string
  value?: string
  onChange?: (value: string) => void
  active?: boolean
  onFocus?: (value: string) => void
  onBlur?: (value: string) => void
  fullwidth?: boolean
  warning?: boolean
  disabled?: boolean
  placeholder?: string
  caption?: string
  rows?: number
  warningText?: string
}

type DropdownListProps = {
  onChange?: (value: string) => void
  list: {type: string, title: string}[]
  value: string
  disabled?: boolean
  title: string
  warning?: boolean
  scroll?: boolean
}

type TextInputProps = {
  value?: string
  onChange?: (value: string) => void
  active?: boolean
  onInput?: (value: string) => void
  onBlur?: (value: string) => void
  onFocus?: (value: string) => void
  format?: string
  fullwidth?: boolean
  warning?: boolean
  disabled?: boolean
  placeholder?: string
  screen?: boolean
  label?: string
  type: string
  onKeyUp?: (value: any) => void
  disableinput?: boolean
  maxlength?: number
}

type FileInputProps = {
  disabled?: boolean
  maxFileSize?: number
  acceptedFiles: string[]
  previewImage?: string
  onChange: (e: File) => Promise<"done" | "error">
  moveOrClick?: string
  format?: string
  onDeleteFileContent: () => void
}

type ImageInputProps = {
  previewImage?: string
  onDeleteAnswerFile: () => void
  onChange: (e: File) => Promise<"done" | "error">
}

export function Input({ label, placeholder, value, onChange, onBlur }: InputProps) {
  return (
    <div className={styles.conainer}>
      <p className={styles.label}>{label}</p>
      <input onBlur={onBlur} className={styles.input} onChange={(e) => { onChange(e.target.value) }} value={value} placeholder={placeholder} />
    </div>
  )
}

export function DropdownListInput({ label, list, placeholder, value, onChange }: DropdownListInput) {

  const [isOpen, setIsOpen] = useState(false)

  const [search, setSearch] = useState('')

  const [filteredList, setFilteredList] = useState(list)

  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    for (let point of list) {
      if (search === point) {
        setFilteredList(list)
        return
      }
    }
    setFilteredList(list.filter((value) => (value.includes(search))))
  }, [search])

  useEffect(() => {
    setSearch(value ? value.toString() : '')
  }, [value])

  //useOutsideClick(container, ()=>(setIsOpen(false)))

  return (
    <div className={styles.conainer}>
      <p className={styles.label}>{label}</p>
      <div ref={container} onClick={() => { setIsOpen(!isOpen) }} className={styles.inputContainer}>
        <input className={styles.input} onChange={(e) => { setSearch(e.target.value) }} value={search} placeholder={placeholder} />
        <img className={styles.input__icon} src={`/icons/menu/${isOpen ? 'open' : 'close'}.svg`} />
        {(filteredList.length !== 0 && isOpen) &&
          <div className={styles.input__list}>
            {filteredList.map((el) => (<p key={el} onClick={() => { onChange(el); setIsOpen(false) }} className={styles.list__point}>{el}</p>))}
          </div>}
      </div>
    </div>
  )
}

export function TextInputSecondary(props:TextInputSecondaryProps) {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    if (props.value !== undefined) setValue(props.value);
  }, [props.value]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  }

  function onClear() {
    setValue('');
    if (props.onChange) {
      props.onChange('');
    }
  }


  const [focus, setFocus] = useState(props.focus || false);
  function onFocus() {
    setFocus(true);
    if (props.onFocus) props.onFocus();
  }
  function onBlur(e: ChangeEvent<HTMLInputElement>) {
    setFocus(false);
    if (props.onBlur) props.onBlur(e.target.value);
  }

  return (
    <div className={`${styles.secondary} 
              ${(focus) ? styles.secondary_focus : ''}
              ${(props.fullwidth) ? styles.secondary_fullwidth : ''}
              ${(props.disabled) ? styles.secondary_disabled : ''}
          `}>
      <div className={styles.secondary__inputContainer}>
        <div className={`${props.big && styles.secondary__input_big} ${styles.secondary__input}`}>
          <input type={'text'} disabled={(props.disabled) ? true : false}
            placeholder={props.placeholder}
            onChange={onChange}
            value={value}
            onFocus={onFocus} onBlur={onBlur}
          />
        </div>
        <div className={styles.secondary__icon}>
          {(props.warning && !props.disabled) && <img src={'/images/icons/warning.svg'} />}
          {(props.clearning && !props.disabled) && <img src={'/images/icons/clearInput.svg'} onClick={onClear} className={styles.secondary__pointer} />}
        </div>
      </div>
      <div className={styles.secondary__message}>
        {(props.warning && !props.disabled) && <p>{props.warningText}</p>}
      </div>

    </div>
  )
}

export function TextAreaInput(props:TextAreaInputProps) {
  //const [value, setValue] = useState(props.value);
  const [value, setValue] = useState(props.defaultValue || '');

  useEffect(() => {
      if (props.defaultValue !== undefined) setValue(props.defaultValue);
  }, [props.defaultValue]);


  function onChange(e:ChangeEvent<HTMLTextAreaElement>) {
      //setValue(e.target.value);
      if (props.onChange) {
          props.onChange(e.target.value);
          setValue(e.target.value);
      }
  }

  const [active, setActive] = useState(props.active);
  function onBlur(e:ChangeEvent<HTMLTextAreaElement>) {
      setActive(false);
      //console.log('blur');
      if (props.onBlur) {
          props.onBlur(e.target.value);
      }
  }

  function onFocus(e:ChangeEvent<HTMLTextAreaElement>) {
      setActive(true);
      setWarning(false);
      if (props.onFocus) {
          props.onFocus(e.target.value);
      }
  }
  const [warning, setWarning] = useState(props.warning || false);

  return (
      <div className={`${styles.textarea} 
          ${(props.fullwidth) ? styles.textarea_fullwidth : ''}
          ${(active && !props.disabled) ? styles.textarea_active : ''}
          ${(props.disabled) ? styles.textarea_disabled : ''}
          ${(warning) ? styles.textarea_warning : ''}
          `}>
          <div className={styles.textarea__introText}>
              {props.caption}
          </div>
          <div className={styles.textarea__textarea}>
              <textarea placeholder={(props.placeholder) ? props.placeholder : ''}
                  onFocus={onFocus}
                  onClick={() => { setActive(true) }}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  readOnly={(props.disabled) ? true : false}
                  rows={props.rows || 3}
              />
          </div>
          <div className={styles.textarea__warning}>
              {(warning) ? props.warningText : ''} &nbsp;
          </div>
      </div>

  );
}

export function DropdownList(props:DropdownListProps) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState<boolean | string>(false);
  const lang = 'ru';

  const locale = {
      select: { ru: `Выберите из списка`, en: `Select from the list`, uk: `Виберіть зі списку` },
      error: { ru: `Ошибка`, en: `Error`, uk: `Помилка` },
  };


  function onChange(value:string) {
      setActive(false);
      if (props.onChange) {
          props.onChange(value);
      }
  }

  //on Render
  let title = '';
  props.list.forEach((e) => {
      if (e.type === props.value) title = e.title;
  });

  return (
      <div className={`${styles.dropdown}
      ${(active) ? styles.dropdown_active : ''}
      ${(props.disabled) ? styles.dropdown_disabled : ''}
      ${(props.value !== undefined) ? styles.dropdown_filled : ''}`}>
          <div className={styles.dropdown__main}>
              <div className={styles.dropdown__title}>{props.title}</div>
              <div className={styles.dropdown__input} onClick={() => { if (!props.disabled) setActive(!active) }}>
                  <div className={styles.dropdown__text}>
                      {(props.value !== undefined) ? title : locale.select[lang]}
                  </div>
                  {
                      (!active) ? <div className={styles.dropdown__icon}>
                          <img src={'/images/icons/up.svg'} />
                      </div> : <div className={styles.dropdown__img}> 
                          <img src={'/images/icons/dropup.svg'} />
                      </div>
                  }
              </div>
              {(props.warning) && <div className={styles.dropdown__warning}>
                  {locale.error[lang]}
              </div>}
          </div>
          <div className={`${styles.dropdown__drop}
              ${(!active) ? styles.dropdown__drop_hide : styles.dropdown__drop}
              ${(props.scroll) ? styles.dropdown__drop_scroll : ''}`}>
              {
                  props.list.map((item) =>
                      <div className={`${styles.dropdown__item} ${(item.type === props.value || hover === item.type) ? styles.dropdown__item_selected : ''}`} key={item.type} 
                          onClick={() => {if(!props.disabled) onChange(item.type)}} onMouseEnter={() => setHover(item.type)} onMouseLeave={() => setHover(false)}>
                          <div className={styles.dropdown__text}>{item.title}</div>
                          <div className={styles.dropdown__selected}>
                              {(item.type === props.value || hover === item.type) && <img src={'/images/icons/selected.svg'} />}
                          </div>
                      </div>
                  )
              }
          </div>
      </div>
  )
}

export function TextInput(props:TextInputProps) {
  const [value, setValue] = useState(props.value || '');
  const [active, setActive] = useState(props.active);


  useEffect(() => {
      if (props.value !== undefined) setValue(props.value);
  }, [props.value]);


  function onInput(e:ChangeEvent<HTMLInputElement>) {

      if (props.onInput) {
          //console.log(e.target.value);
          props.onInput(e.target.value);
          setValue(e.target.value);
      }
  }

  function changeValue(e:ChangeEvent<HTMLInputElement>) {

      let val = e.target.value;
      if (props.onChange) {
          props.onChange(e.target.value);
          setValue(val);
      }
      else setValue(val);
  }

  function onBlur(e:ChangeEvent<HTMLInputElement>) {
      setActive(false);
      if (props.onBlur) {
          props.onBlur(e.target.value);
      }
  }

  function onFocus(e:ChangeEvent<HTMLInputElement>) {
      setActive(true);
      if (props.onFocus) {
          props.onFocus(e.target.value);
      }
  }

  return <div className={`${styles.ld_textinput} ${props.fullwidth ? styles.ld_textinput_fullwidth : ''}
          ${props.disabled ? styles.ld_textinput_disabled : ''}
          ${props.screen ? styles.ld_textinput_screen : ''}
          `}>
      <div className={`${styles.ld_textinput__label} 
                  ${(props.warning) ? styles.ld_textinput__label_warning : ''}
              `}>
          {props.label}
      </div>
      <div className={`${styles.ld_textinput__border} 
                      ${(active) ? styles.ld_textinput__border_active : ''}
                      ${(props.warning) ? styles.ld_textinput__border_warning : ''}
                      ${(value !== '') ? styles.ld_textinput__border_value : ''}
                      `}>
          <div className={styles.ld_textinput__input}>
              {(props.format !== 'date') && <input type={props.type} placeholder={props.placeholder} value={value}
                  onChange={changeValue}
                  onFocus={onFocus}
                  onClick={() => { setActive(true) }}
                  onBlur={onBlur}
                  onInput={onInput}
                  onKeyUp={(e) => { if (props.onKeyUp !== undefined) props.onKeyUp(e) }}
                  disabled={props.disableinput === true ? true : (props.disabled) ? true : false}
                  maxLength={props.maxlength}
              />}
          </div>
          {(props.warning) && <div className={styles.ld_textinput__icon}>
              <img src={'/components/inputs/warning.svg'} />
          </div>}
      </div>
  </div>
}

export function FileInput(props:FileInputProps) {
  const [warning, setWarning] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [disabled, setDisabled] = useState(props.disabled || false);

  const lang = 'ru';

  const locale = {
      moveOrClick: {
          ru: `Перетащите сюда файлы или нажмите, чтобы загрузить изображение`,
          en: `Drag files here or click to upload an image`,
          uk: `Перетягніть сюди файли або натисніть, щоб завантажити зображення`
      },
      loading: { ru: `Загружаем файл`, en: `Uploading the file`, uk: `Завантажуємо файл` },
      loaded: { ru: `Файл загружен`, en: `File downloaded`, uk: `Файл завантажений` },
      delete: { ru: `Удалить`, en: `Delete`, uk: `Видалити` },
      format: { ru: `Формат: PNG, JPEG, BMP до 20 МБ`, en: `Format: PNG, JPEG, BMP up to 20 MB`, uk: `Формат: PNG, JPEG, BMP до 20 МБ` },
      temp: { ru: ``, en: ``, uk: `` },
  };

  async function onFilesAdd(e:ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
      for (let i = 0; i < e.target.files.length; i++) {
          let fileType = e.target.files[i].name.split('.').pop();
          if ((!(props.acceptedFiles.indexOf(fileType as string) !== -1))) {
              setAccepted(false);
              setWarning(true);
              return -1;
          }
      }
      setLoading(true);
      let result = await props.onChange(e.target.files[0]);
      if (result === 'done') {
          setLoading(false);
          setUpdating(!updating);
          setWarning(false);
      }
      else {
          setLoading(false);
          setWarning(true);
      }
      return result;
  }

  function onFileDrag(e: DragEvent) {
    if (!e.dataTransfer) return;
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
          let fileType = e.dataTransfer.items[i].type.split('/').pop();
          if (!((props.acceptedFiles.indexOf(fileType as string)) !== -1)) {
              setWarning(true);
              return;
          }
      }
      setAccepted(true);
  }

  function onFileLeave() {
      setWarning(false);
      setAccepted(false);
  }

  let fileType = (props.previewImage !== undefined) && props.previewImage.split('.').pop();
  const audioFormats = ['aac', 'aiff', 'dsd', 'flac', 'mp3', 'mqa', 'ogg', 'wma', 'wav'];
  const audioIndex = audioFormats.indexOf(fileType as string);

  return (
      <div className={`${styles.fileinput} 
              ${(warning) ? styles.fileinput_warning : ''}
              ${(disabled) ? styles.fileinput_disabled : ''}
              ${(accepted) ? styles.fileinput_accepted : ''}`}>
          {(!props.previewImage) && <label className={styles.fileinput__label} >
              {
                  disabled ? null : <input type={'file'} id={'inputFiles'}
                      onDragEnter={(e) => onFileDrag(e as unknown as DragEvent)}
                      onDragLeave={onFileLeave}
                      onDrag={() => { }}
                      onChange={async (e) => { await onFilesAdd(e) }} />
              }

              <div className={styles.fileinput__content}>
                  <div className={styles.fileinput__free}>
                      <div className={styles.fileinput__icon}>
                          {(!warning) && (!accepted) && (!loading) && <img src={'/images/icons/upload_gray.svg'} />}
                          {(warning) && (!accepted) && (!loading) && <img src={'/images/icons/upload_red.svg'} />}
                          {(accepted) && (!loading) && <img src={'/images/icons/upload_green.svg'} />}
                          {(loading) && <div className="lds-dual-ring"></div>}
                      </div>
                      <div className={styles.fileinput__text}>
                          {(!loading) && <div>{props.moveOrClick ? props.moveOrClick : locale.moveOrClick[lang]}</div>}
                          {(loading) && <div>{locale.loading[lang]}</div>}
                      </div>
                      <div className={styles.fileinput__underText}>
                          {props.format ? props.format : locale.format[lang]}
                      </div>
                  </div>
              </div>
          </label>}
          {(props.previewImage) && <div className={styles.fileinput__preview}>
              <div className={styles.fileinput__image}>
                  {audioIndex !== -1 ? <img src={'/images/icons/volume-black.svg'} /> : <img src={'' + "https://static.joyteka.com/" + props.previewImage} />}
              </div>
              <div className={styles.fileinput__text}>
                  {locale.loaded[lang]}
              </div>
              {
                  disabled ? null : <div className={styles.fileinput__delete} onClick={async () => {
                      await props.onDeleteFileContent();
                      //document.getElementById('inputFiles').value = '';
                      //console.log(document.getElementById('inputFiles').files);
                      //setFiles('');
                  }}><span>{locale.delete[lang]}</span> <img src={'/images/icons/trash_red.svg'} /></div>
              }

          </div>}

      </div>
  );
}

const locale = {
  warningText: { ru: 'неверный формат', uk: 'невірний форма', en: 'invalid format' },
};
export default function ImageInput(props:ImageInputProps){
  let lang = 'ru';
  const[active, setActive] = useState(false);
  const[warning, setWarning] = useState(false);
  const[loading, setLoading] = useState(false);
  const fileFormat = ['png', 'jpeg', 'jpg', 'bmp', 'JPEG', 'JPG', 'mp3', 'aac', 'ogg',]

  function onFileDrag(e: DragEvent) { 
      if (!e.dataTransfer) return; 
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
          let fileType = e.dataTransfer.items[i].type.split('/').pop();
          if (!((fileFormat.indexOf(fileType as string)) !== -1)) {
              setWarning(true);
              return;
          }
      }
      setWarning(false);
      setActive(true);
  }
  function onFileLeave() {
      setActive(false);
      setWarning(false);
  }
  async function onFilesAdd(e:ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
      for (let i = 0; i < e.target.files.length; i++) {
          let fileType = e.target.files[i].name.split('.').pop();
          if ((e.target.files[i].size < 0) || (!(fileFormat.indexOf(fileType as string) !== -1))) {
              setWarning(true);
              return -1;
          }
      }
      setLoading(true);
      let result = await props.onChange(e.target.files[0]);
      if (result === 'done') {
          setWarning(false);
          setLoading(false);
      }
      else {
          setWarning(true);
          setLoading(false);
      }
      return result;
  }
  //console.log('props.previewImage', props.previewImage)
  return(
      <div className={fileStyles.input}>
          <div className={fileStyles.input__container}>
              <div className={`${fileStyles.input__image} 
              ${active ? fileStyles.input__imagePressed : ''}
              ${warning ? fileStyles.input__imageWarning : ''}
              `}>
                  {
                      <input type={'file'}
                      onDragEnter={(e)=>onFileDrag(e as unknown as DragEvent)}
                      onDragLeave={onFileLeave}
                      onDrag={() => { }}
                      onChange={async (e) => {await onFilesAdd(e)}} />
                  }
                  {
                      props.previewImage !== undefined && props.previewImage !== '' ? 
                          <img src={'' + "https://static.joyteka.com/" + props.previewImage} /> : 
                          <div className={fileStyles.input__icons}>
                              {(!loading) && <div className={fileStyles.input__adddimg}/>}
                          </div>
                  }
                  {(loading && (props.previewImage === undefined || props.previewImage === '') ) && <div className="lds-dual-ring"></div>}
              </div>
              {props.previewImage !== undefined && props.previewImage !== '' ? 
                  <div className={fileStyles.input__delete} onClick={async () => {await props.onDeleteAnswerFile();}}>
                      <img src={'/images/icons/delete-cancelRed.svg'}/>
                  </div> : ''}
              {warning ? <div className={fileStyles.input__warningText}>{'неверный формат'}</div> : ''}
          </div>
      </div>
  )
}