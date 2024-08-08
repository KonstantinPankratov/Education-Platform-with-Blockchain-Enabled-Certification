import NextAuth, { User as TUser } from "next-auth"
import { authConfig } from "./auth.config"
import { AuthError } from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import dbConnect from "./db/dbConnect"
import User, { IUser } from "./db/models/auth/User"
import { compare as bcryptCompare } from 'bcrypt'
import { SignInSchema } from "@/lib/zod"
import { z } from "zod"
import MongooseAdapter from "./lib/mongooseAdapter"

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
    authorize: async (credentials) => {
      await dbConnect()

      const { email, password } = SignInSchema.parse(credentials)

      const user = await User.findOne({ email: email })

      if (user && await bcryptCompare(password, user.password)) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      } else {
        throw new InvalidCredentials()
      }
    }
  })
]

export const { handlers, auth } = NextAuth({
  ...authConfig,
  providers: Providers,
  adapter: MongooseAdapter(dbConnect())
})