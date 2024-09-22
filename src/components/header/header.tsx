import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { auth } from "@/auth"
import NavDefault from "./navDefault"
import NavLoggedIn from "./navLoggedIn"
import Image from "next/image"

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
          <Link href="/" className="-m-1.5 p-1.5 tracking-wider font-bold text-xl flex items-center gap-2">
            <svg className="size-6" x="0" y="0" viewBox="0 0 100 100" fill="#FFF"><g><path d="M75.2 5.2c-.7-.1-1.5-.2-2.3-.2H17.8c-7 0-12.7 5.7-12.7 12.7V72.8c0 .8.1 1.6.2 2.4 0 7 15 19.9 22 19.9h54.9c7 0 12.7-5.7 12.7-12.7V27.2c0-6.9-12.6-21.7-19.7-22zM30.4 23.5h29.9v7.4H38.6v10.7h21.6v7.3H38.6v10.8h21.6v7.4H30.4zm62.5 58.8c0 5.9-4.8 10.6-10.6 10.6h-55c-2.7 0-7.8-2.8-12.3-6.8-.5-.5-1.1-1-1.6-1.5 1.3.5 2.8.7 4.3.7h55.1c7 0 12.7-5.7 12.7-12.7V17.7c0-1.4-.2-2.7-.6-4 .4.4.8.8 1.2 1.3 4 4.5 6.8 9.6 6.8 12.3z"></path></g></svg>
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </Link>
        </div>
        {!session?.user && <NavDefault />}

        {session?.user && <NavLoggedIn user={session.user} />}
      </div>
    </header>
  )
}

export default Header
