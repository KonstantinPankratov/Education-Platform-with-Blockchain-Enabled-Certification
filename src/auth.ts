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
      throw new InvalidCredentials()

      await dbConnect()

      const user = await User.findOne({ email: credentials.email })

      if (user && await bcryptCompare(credentials.password, user.password)) {
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