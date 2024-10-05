import { SignInWithGithub } from "@/components/forms/SiginWithGithub"
import { SignInWithGoogle } from "@/components/forms/SiginWithGoogle"
import { SignInWithResend } from "@/components/forms/SiginWithResend"

export default function Page() {
  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-col space-y-2 text-center mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to platform</h1>
        <p className="text-sm text-muted-foreground">Enter your email below to sign in to your account</p>
      </div>

      <SignInWithResend />

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-neutral-700"></div>
        <span className="flex-shrink mx-4 text-neutral-700">Or continue with</span>
        <div className="flex-grow border-t border-neutral-700"></div>
      </div>

      <div className="flex gap-4 flex-col items-center">
        <SignInWithGithub />
        <SignInWithGoogle />
      </div>
    </div>
  )
}
