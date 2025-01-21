// 'use client'
import { redirect } from "next/navigation"
import landing from "./landing/page"
// import { useAuth } from "@clerk/nextjs"

export default  function Home() {
  // const  {userId}=  useAuth()

  
    redirect("/landing")
    

  

}