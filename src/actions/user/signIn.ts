"use server"

import { signIn } from "@/auth"
import { ResendFormSchema } from "@/lib/zod"

export async function resendSignIn(data: ResendFormSchema) {
  await signIn('resend', data)
}

export async function googleSignIn() {
  await signIn('google')
}

export async function githubSignIn() {
  await signIn('github')
}