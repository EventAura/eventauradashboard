"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { SignOutButton } from "@clerk/nextjs"
import { LetterPullUp } from "./eldoraui/letterpullup"
import { useAuth } from "@clerk/nextjs"


export function SiteHeader() {
  const { userId } = useAuth()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center gap-x-4">
          <Link href="/landing" className="flex items-center space-x-2 ml-5">
            <span className="font-bold">
              
                <LetterPullUp text="EventAura" />

            </span>
          </Link>
          <Link href={`/${userId}/event`} className="flex items-center space-x-2">
            <span className="font-bold text-accent">Events</span>
          </Link>
          
        </div>

        <div className="flex items-center gap-x-2 mr-5">
          <UserButton />
          {/* <SignOutButton/> */}
        </div>
      </div>
    </header>
  )
}
