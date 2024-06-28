import NextAuth, { AuthError } from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials  from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import dbConnect from "./db/dbConnect"
import User from "./db/models/User"
import { compare as bcryptCompare } from 'bcrypt'
import { SignInSchema } from "@/lib/zod"
import { z } from "zod"

class InvalidCredentials extends AuthError {
  constructor() {
    super()
    this.type = 'CredentialsSignin'
  }
}

const Providers: Provider[] = [
  GitHub,
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials: z.infer<typeof SignInSchema>) => {
      await dbConnect()

      const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

      const { email, password } : z.infer<typeof SignInSchema> = parsedCredentials.data

      const user = await User.findOne({ email: email })

      if (user && await bcryptCompare(password, user.password)) {
        return user
      } else {
        throw new InvalidCredentials()
      }
    },
  })
]

export const { handlers, auth } = NextAuth({
  providers: Providers,
  pages: {
    signIn: '/sign-in',
    newUser : '/sign-up',
  }
})