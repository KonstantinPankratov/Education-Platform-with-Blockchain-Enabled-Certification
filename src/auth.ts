import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import type { Provider } from "next-auth/providers"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import dbConnect from "./db/dbConnect"
import MongooseAdapter from "./lib/mongooseAdapter"

const Providers: Provider[] = [
  GitHub,
  Google,
  Resend({
    from: process.env.AUTH_RESEND_FROM,
  })
]

export const { handlers, auth, signIn } = NextAuth({
  ...authConfig,
  providers: Providers,
  adapter: MongooseAdapter(dbConnect())
})