import { useState } from 'react'
import styles from './selectors.module.scss'

type RadioButtonProps = {
  size: 's' | 'm' | 'l'
  isChecked?: boolean
  isDisabled?: boolean
  isError?: boolean
  isHover?: boolean
}

type BigSelectoerProps = {
  checked: boolean
}

export function RadioButton({size, isChecked, isDisabled, isError, isHover}:RadioButtonProps){

  return <div className={`
    ${styles.radio}
    ${isHover === undefined ? styles.radio_hoverActive : ''}
    ${isChecked ? styles.radio_checked : ''} 
    ${isDisabled ? styles.radio_disabled : ''} 
    ${isHover ? styles.radio_hover : ''}
    ${size === 's' ? styles.block_s : size === 'm' ? styles.block_m : styles.block_l}
    ${size === 's' ? styles.radio_s : size === 'm' ? styles.radio_m : styles.radio_l}
    ${isError ? styles.radio_error : ''}`}>
    {isChecked && <div className={`
      ${styles.radio__checked}
      ${size === 's' ? styles.radio__checked_s : size === 'm' ? styles.radio__checked_m : styles.radio__checked_l}
      `}></div>}
  </div>
}

export function CheckBox({size, isChecked, isDisabled, isError}:RadioButtonProps){

  const [isHover, setIsHover] = useState(false)

  const getColor = () => {
    if (isDisabled){
      return '#E0E0E0'
    } else if (isError) {
      return '#D22D25'
    }
    return isHover ? "#00EAD9" : "#828282"
  }

  if (isChecked) {
    return (
      <svg className={`
        ${styles.checkbox}
        ${size === 's' ? styles.checkbox_s : size === 'm' ? styles.checkbox_m : styles.checkbox_l}
        ${size === 's' ? styles.checkbox_s : size === 'm' ? styles.checkbox_m : styles.checkbox_l}
      `}
        width={size === 's' ? '24' : size === 'm' ? '40' : '64'} 
        height={size === 's' ? '24' : size === 'm' ? '40' : '64'} 
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17L5 12.1923L6.4 10.8462L10 14.3077L17.6 7L19 8.34615L10 17Z" fill="#00EAD9" />
      </svg>
    )
  }

  return <div onMouseLeave={()=>setIsHover(false)} onMouseEnter={()=>{!isDisabled && !isError && setIsHover(true)}} className={`
    ${styles.checkbox}
    ${size === 's' ? styles.checkbox_s : size === 'm' ? styles.checkbox_m : styles.checkbox_l}
    ${size === 's' ? styles.checkbox_s : size === 'm' ? styles.checkbox_m : styles.checkbox_l}
  `}>
    <svg width={size === 's' ? '24' : size === 'm' ? '40' : '64'} height={size === 's' ? '24' : size === 'm' ? '40' : '64'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill={getColor()} />
    </svg>
  </div>
}

export function DragPoint({size, isChecked, isDisabled, isError}:RadioButtonProps){
  const [isHover, setIsHover] = useState(false)

  const getColor = () => {
    if (isDisabled){
      return '#E0E0E0'
    } else if (isError) {
      return '#D22D25'
    }
    return isHover || isChecked ? "#00EAD9" : "#828282"
  }

  return (
    <svg onMouseLeave={()=>setIsHover(false)} onMouseEnter={()=>{!isDisabled && !isError && setIsHover(true)}} className={`
      ${styles.checkbox}
    `} width={size === 's' ? '24' : size === 'm' ? '40' : '64'} height={size === 's' ? '24' : size === 'm' ? '40' : '64'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 16.5C9.82843 16.5 10.5 17.1716 10.5 18C10.5 18.8284 9.82843 19.5 9 19.5C8.17157 19.5 7.5 18.8284 7.5 18C7.5 17.1716 8.17157 16.5 9 16.5ZM15 16.5C15.8284 16.5 16.5 17.1716 16.5 18C16.5 18.8284 15.8284 19.5 15 19.5C14.1716 19.5 13.5 18.8284 13.5 18C13.5 17.1716 14.1716 16.5 15 16.5ZM9 10.5C9.82843 10.5 10.5 11.1716 10.5 12C10.5 12.8284 9.82843 13.5 9 13.5C8.17157 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.17157 10.5 9 10.5ZM15 10.5C15.8284 10.5 16.5 11.1716 16.5 12C16.5 12.8284 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8284 13.5 12C13.5 11.1716 14.1716 10.5 15 10.5ZM9 4.5C9.82843 4.5 10.5 5.17157 10.5 6C10.5 6.82843 9.82843 7.5 9 7.5C8.17157 7.5 7.5 6.82843 7.5 6C7.5 5.17157 8.17157 4.5 9 4.5ZM15 4.5C15.8284 4.5 16.5 5.17157 16.5 6C16.5 6.82843 15.8284 7.5 15 7.5C14.1716 7.5 13.5 6.82843 13.5 6C13.5 5.17157 14.1716 4.5 15 4.5Z" fill={getColor()}/>
  </svg>
  )
}

export function CirclePoint({size, isChecked, isDisabled, isError}:RadioButtonProps){
  return <div className={`
    ${styles.circle}
    ${isChecked ? styles.circle_checked : ''} 
    ${isDisabled ? styles.circle_disabled : ''} 
    ${size === 's' ? styles.block_s : size === 'm' ? styles.block_m : styles.block_l}
    ${size === 's' ? styles.circle_s : size === 'm' ? styles.circle_m : styles.circle_l}
    ${isError ? styles.radio_error : ''}`}>
    {isChecked && <div className={`
      ${styles.circle__checked}
      ${size === 's' ? styles.circle__checked_s : size === 'm' ? styles.circle__checked_m : styles.circle__checked_l}
      `}></div>}
  </div>
}

export function BigSelector({checked}:BigSelectoerProps) {

  const [isHovered, setIsHovered] = useState(false)

  return (<div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>{setIsHovered(false)}} className={`${styles.bigselector} 
                          ${(checked===true) ? styles.bigselector_checked : ''}
                          ${(isHovered===true) ? styles.bigselector_hover : ''}
                          `}>
          <div className={`${styles.bigselector__check}`}>

          </div>
      </div>
  )

}