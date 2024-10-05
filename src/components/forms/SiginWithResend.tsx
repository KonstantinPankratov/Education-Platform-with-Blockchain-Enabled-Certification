import { resendSignIn } from "@/actions/user/signIn"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export function SignInWithResend() {
  return (
    <form
      className="flex flex-col gap-5 my-8"
      action={resendSignIn}>
      <Input type="email" name="email" placeholder="example@email.com" autoComplete="email" />
      <Button type="submit">Sign in with email</Button>
    </form>
  )
}