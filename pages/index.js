import { useEffect, useState } from "react"
import { getAny } from "../utils/requests"

export default function Home(){
  const [user, setUser] = useState()
  useEffect(()=>{
    async function getResult(){
      let user = await getAny()
      setUser(user)
    }
    getResult()
  },[])
  useEffect(()=>{
    console.log(user)
  },[user])
  return <>
    Start PAge
  </>
}