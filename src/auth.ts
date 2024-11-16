import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import type { Provider } from "next-auth/providers"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import dbConnect from "./db/dbConnect"
import MongooseAdapter from "./lib/mongooseAdapter"

const Providers: Provider[] = [
  GitHub,
  Google,
  Nodemailer({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
  }),
]

export const { handlers, auth, signIn } = NextAuth({
  ...authConfig,
  providers: Providers,
  adapter: MongooseAdapter(dbConnect())
})