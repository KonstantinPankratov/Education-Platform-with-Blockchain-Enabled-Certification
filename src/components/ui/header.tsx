import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Bell, LogOut, Scroll, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  size?: string
}

const Header = ({ size }: HeaderProps) => {
  const loggedIn = true

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
        { !loggedIn && <nav className="flex items-center gap-6 font-medium">
          <Link
            href="/#how-it-works"
            className="hidden md:block transition-colors hover:text-neutral-300">
            How it works
          </Link>
          <Link
            href="/#courses"
            className="hidden md:block transition-colors hover:text-neutral-300">
            Courses
          </Link>
          <Button>Sign in</Button>
        </nav> }

        { loggedIn && <nav className="flex items-center gap-6 font-medium">
          <Button variant="ghost" size="icon">
            <Bell/>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer hover:opacity-70 transition-opacity">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/30325297?v=4" alt="@KonstantinPankratov" />
                <AvatarFallback>KP</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" sideOffset={10}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile#enrolled-courses">
                    <Scroll className="mr-2 h-4 w-4" />
                    <span>Enrolled courses</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav> }
      </div>
    </header>
  )
}

export default Header
