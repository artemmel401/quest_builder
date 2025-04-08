import styles from './styles.module.scss'

type RadioProps = {selected: boolean, text?: string}

type CheckBoxProps = {selected: boolean, text?: string, disabled?: boolean, onClick?: () => void}

export function Radio(props:RadioProps) {
  return <div className={`${styles.radio} ${(props.selected) ? styles.radio_selected : ''}`}>
          <div className={`${styles.radio__selector}`}>
              <div className={styles.radio__outerCircle}>
                  {(props.selected)&&<div className={styles.radio__innerCircle}></div>}
              </div>
          </div>
          {(props.text)&&<div className={styles.radio__text}>{props.text}</div>}
      </div>
}

export function CheckBox(props:CheckBoxProps) {
    return <div onClick={props.onClick ? props.onClick : ()=>{}} className={`${styles.checkbox} ${(props.selected) ? styles.checkbox_selected : ''} ${(props.disabled) ? styles.checkbox_disabled : ''}`}>
        <div className={`${styles.checkbox__selector}`}>
            <div className={styles.checkbox__box}>
                {(props.selected)&&<img src={'/components/selectors/checked.svg'}/>}
            </div>
        </div>
        {(props.text)&&<div className={styles.checkbox__text}>{props.text}</div>}
    </div>
}