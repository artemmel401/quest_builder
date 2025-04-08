import { ChangeEvent, CSSProperties, useState } from 'react';
import styles from './button.module.scss'

const BUTTON_STYLES = ['ld_button_primary', 'ld_button_secondary1', 'ld_button_secondary2', 'ld_button_secondary3'] as const

type ButtonProps = {
  disabled?: boolean
  type?: string
  mainClass: typeof BUTTON_STYLES[number]; 
  fullwidth?: boolean
  text: string
  onClick: () => void
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void
  style?: CSSProperties
}

type ButtonTaskProps = {
    pressed: boolean
    text: string
    pic: string | boolean
}

export function Button(props: ButtonProps) {
  const [hover, setHover] = useState(false);
  function toggleHover() {
      setHover(!hover);
  }

  const [pressed, setPressed] = useState(false);
  function togglePressed() {
      setPressed(!pressed);
  }

  const [disabled, setDisabled] = useState(props.disabled);

  function setDefault() {
      setHover(false);
      setPressed(false);
  }

  if(props?.type==='file') {
      return <><label className={styles.ld_inputFile} onMouseEnter={toggleHover} onMouseLeave={setDefault}
                              onMouseDown={togglePressed}
                              onMouseUp={togglePressed}>
      <input type={"file"} disabled={props.disabled} onChange={(e) => { if(!disabled) {console.log('btn'); props.onChange && props.onChange(e);} }}/>
      <span className={` 
                      ${(props.mainClass === 'ld_button_primary') ? styles.ld_button_primary : ''} 
                      ${(props.mainClass === 'ld_button_secondary1') ? styles.ld_button_secondary1 : ''} 
                      ${(props.mainClass === 'ld_button_secondary2') ? styles.ld_button_secondary2 : ''} 
                      ${(props.mainClass === 'ld_button_secondary3') ? styles.ld_button_secondary3 : ''} 
                      ${(hover === true) ? styles.ld_button_hover : ''}
                      ${(pressed === true) ? styles.ld_button_pressed : ''}
                      ${(props.disabled === true) ? styles.ld_button_disabled : ''}
                      ${(props.fullwidth === true) ? styles.ld_button_fullwidth : ''}
                   `}>{props.text}</span>
  </label>
  </>
  }
  return (
      <>
          <input style={props.style} className={` 
                          ${(props.mainClass === 'ld_button_primary') ? styles.ld_button_primary : ''} 
                          ${(props.mainClass === 'ld_button_secondary1') ? styles.ld_button_secondary1 : ''} 
                          ${(props.mainClass === 'ld_button_secondary2') ? styles.ld_button_secondary2 : ''} 
                          ${(props.mainClass === 'ld_button_secondary3') ? styles.ld_button_secondary3 : ''} 
                          ${(hover === true) ? styles.ld_button_hover : ''}
                          ${(pressed === true) ? styles.ld_button_pressed : ''}
                          ${(props.disabled === true) ? styles.ld_button_disabled : ''}
                          ${(props.fullwidth === true) ? styles.ld_button_fullwidth : ''}
                       `}
              type={"button"}
              title={props.text}
              value={props.text}
              onMouseEnter={toggleHover}
              onMouseLeave={setDefault}
              onMouseDown={togglePressed}
              onMouseUp={togglePressed}
              onClick={props.onClick}
          />

      </>
  )
}

export function ButtonTask(props:ButtonTaskProps) {
    return (
        <div className={`${styles.buttonTask} ${(props.pressed) && styles.buttonTask_pressed}`}>
            <div className={styles.buttonTask__text}>{props.text}</div>
            {typeof props.pic === 'string' && <div className={styles.buttonTask__pic}>
                <img src={props.pic} />
            </div>}
        </div>
    )
}

