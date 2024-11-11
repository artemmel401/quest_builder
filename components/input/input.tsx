import { useEffect, useRef, useState } from 'react'
import styles from './input.module.scss'
import useOutsideClick from '@/hooks/useOutsideClick'

type InputProps = {
  label: string
  placeholder: string
  value?: string | number
  onChange: (value: string | number) => void
}

type DropdownListInput = {
  label: string
  placeholder: string
  value?: string | number
  list: readonly string[]
  onChange: (value: string) => void
}

export function Input({label, placeholder, value, onChange}:InputProps){
  return (
    <div className={styles.conainer}>
      <p className={styles.label}>{label}</p>
      <input className={styles.input} onChange={(e)=>{onChange(e.target.value)}} value={value} placeholder={placeholder}/>
    </div>
  )
}

export function DropdownListInput({label, list, placeholder, value, onChange}:DropdownListInput) {

  const [isOpen, setIsOpen] = useState(false)

  const [search, setSearch] = useState('')

  const [filteredList, setFilteredList] = useState(list)

  const container = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    for (let point of list){
      if (search === point){
        setFilteredList(list)
        return
      }
    }
    setFilteredList(list.filter((value)=>(value.includes(search))))
  },[search])

  useEffect(()=>{
    setSearch(value ? value.toString() : '')
  },[value])

  useOutsideClick(container, ()=>(setIsOpen(false)))

  return (
    <div className={styles.conainer}>
      <p className={styles.label}>{label}</p>
      <div ref={container} onClick={()=>{setIsOpen(true)}} onFocus={()=>{setIsOpen(true)}} className={styles.inputContainer}>
        <input className={styles.input} onChange={(e)=>{setSearch(e.target.value)}} value={search} placeholder={placeholder}/>
        <img className={styles.input__icon} src={`/icons/menu/${isOpen ? 'open' : 'close'}.svg`}/>
        {(filteredList.length !== 0 && isOpen) && 
        <div className={styles.input__list}>
          {filteredList.map((el)=>(<p key={el} onClick={()=>{onChange(el); setIsOpen(false)}} className={styles.list__point}>{el}</p>))}
        </div>}
      </div>
    </div>
  )
}