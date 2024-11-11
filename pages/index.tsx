import { useEffect, useState } from "react"
import { getAny } from "../utils/requests"
import styles from './index.module.scss'
import Header from "@/components/header/header"
import { Button } from "@/components/button/button"
import Card from "@/components/card/card"

export default function Home(){
  return (
    <>
      <Header isNewQuest/>
      <main className={styles.main}>
        <div className={styles.main__list}>
          <h1 className={styles.main__title}>ВАШИ КВЕСТЫ</h1>
          <div></div>
          <Button mainClass="ld_button_secondary2" onClick={()=>{}} text='СОЗДАТЬ КВЕСТ' style={{width: '345px', height: '55px', fontSize: '20px'}}/>
        </div>
        <div className={styles.main__cards}>
          <Card title="Квест 1" description="описание" onClick={()=>{}}/>
          <Card title="Квест 2" onClick={()=>{}}/>
          <Card title="Безымянный" onClick={()=>{}}/>
          <Card title="Квест 1" description="описание" onClick={()=>{}}/>
          <Card title="Квест 1" description="описание" onClick={()=>{}}/>
        </div>
      </main>
    </>
  )
}