"use client"

import { githubSignIn } from "@/actions/user/signIn"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function SignInWithGithub() {
  return (
    <Button variant="outline" size="lg" className="w-full" type="submit" onClick={() => githubSignIn()}>
      <Github size={20} className="mr-3" /> Github
    </Button>
  )
} 