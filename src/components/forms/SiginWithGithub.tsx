"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
 
export function SignInWithGithub() {
  return (
    <Button variant="outline" size="lg" className="w-full" type="submit" onClick={() => signIn('github')}>
      <Github size={20} className="mr-3"/> Github
    </Button>
  )
} 