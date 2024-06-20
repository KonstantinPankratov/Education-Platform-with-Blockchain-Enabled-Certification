import { SignInWithGithub } from "@/components/forms/SiginWithGithub"
import { SignIn } from "@/components/forms/Signin"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export default function Page() {
  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-col space-y-2 text-center mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
        <p className="text-sm text-muted-foreground">Enter your email and password below to sign in to your account</p>
      </div>

      <SignIn/>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-neutral-700"></div>
        <span className="flex-shrink mx-4 text-neutral-700">Or continue with</span>
        <div className="flex-grow border-t border-neutral-700"></div>
      </div>

      <div className="flex flex-col items-center">
        <SignInWithGithub/>
      </div>
      <div className="flex justify-center mt-10">
        <Button variant="link" asChild>
          <Link href="/sign-up">Don&apos;t have an account? Sign up!</Link>
        </Button>
      </div>
    </div>
  )
}
