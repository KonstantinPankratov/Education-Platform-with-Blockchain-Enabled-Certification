"use client"

import { Bell, LogOut, Scroll, User as UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface NavLoggedInProps {
  user: User
}

const NavLoggedIn = ({ user }: NavLoggedInProps) => {
  return (
    <nav className="flex items-center gap-6 font-medium">
      <Button variant="ghost" size="icon">
        <Bell/>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer hover:opacity-70 transition-opacity">
          <Avatar>
            <AvatarImage src={user.image?.toString()} alt="Avatar" />
            <AvatarFallback>{user.nameInitials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={10}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/profile">
                <UserIcon className="mr-2 h-4 w-4" />
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
          <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

export default NavLoggedIn