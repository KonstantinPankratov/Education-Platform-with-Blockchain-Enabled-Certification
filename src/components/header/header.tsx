import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { auth } from "@/auth"
import NavDefault from "./navDefault"
import NavLoggedIn from "./navLoggedIn"

interface HeaderProps {
  size?: string
}

const Header = async ({ size }: HeaderProps) => {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={cn(
        "flex items-center justify-between py-4",
        {
          "container": size !== 'full',
          "px-6": size === 'full',
        }
      )}>
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 font-bold text-xl">EDUPLA</Link>
        </div>
        { !session?.user && <NavDefault/>}

        { session?.user && <NavLoggedIn user={session.user}/>}
      </div>
    </header>
  )
}

export default Header
