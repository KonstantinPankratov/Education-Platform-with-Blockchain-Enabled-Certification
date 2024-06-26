import NextAuth, { AuthError } from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials  from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import dbConnect from "./db/dbConnect"
import User from "./db/models/User"
import { compare as bcryptCOmpare } from 'bcrypt'
import { SignInSchema } from "@/lib/zod"
import { z } from "zod"

// class InvalidCredentials extends AuthError {
//   public readonly kind = 'signIn';

//   constructor() {
//     super('Invalid credentials');
//     this.type = 'CredentialsSignin';
//   }
// }

const Providers: Provider[] = [
  GitHub,
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials: z.infer<typeof SignInSchema>) => {
      await dbConnect()

      const user = await User.findOne({ email: credentials.email })

      if (user && await bcryptCOmpare(credentials.password, user.password)) {
        return user
      }

      return null
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