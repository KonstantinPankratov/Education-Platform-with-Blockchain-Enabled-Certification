import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
 
export function SignInWithGithub() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
    <Button variant="outline" size="lg" className="w-full" type="submit">
        <Github size={20} className="mr-3"/> Github
    </Button>
    </form>
  )
} 