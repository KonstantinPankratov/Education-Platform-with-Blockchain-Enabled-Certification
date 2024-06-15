import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { useState } from "react";
import { Bell } from "lucide-react";

const Header = function () {
  const [loggedIn, setLoggedIn] = useState<Boolean>(true)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between py-4">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 font-bold text-xl">
            EDUPLA
          </a>
        </div>
        { !loggedIn && <nav className="flex items-center gap-6 font-medium">
          <Link
            href="#"
            className="hidden md:block transition-colors hover:text-neutral-300">
            How it works
          </Link>
          <Link
            href="#"
            className="hidden md:block transition-colors hover:text-neutral-300">
            Courses
          </Link>
          <Button>Sign in</Button>
        </nav> }

        { loggedIn && <nav className="flex items-center gap-6 font-medium">
          <Button variant="ghost" size="icon">
            <Bell/>
          </Button>
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/30325297?v=4" alt="@KonstantinPankratov" />
            <AvatarFallback>KP</AvatarFallback>
          </Avatar>
        </nav> }
      </div>
    </header>
  )
}

export default Header;
