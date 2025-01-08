"use client"

import Link from "next/link"
// import { ModeToggle } from "@/components/mode-toggle"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Search } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center gap-x-4">
          <Link href="/" className="flex items-center space-x-2 ml-5">
            <span className="font-bold">Event Aura Admin Panel</span>
          </Link>
          {/* <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full max-w-[300px] pl-8"
              />
            </div>
          </div> */}
        </div>
        <div className="flex items-center gap-x-2 mr-5">
          <SignOutButton />
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  )
}