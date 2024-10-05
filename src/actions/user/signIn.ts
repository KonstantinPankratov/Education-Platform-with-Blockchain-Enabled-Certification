"use server"

import { signIn } from "@/auth"

export async function resendSignIn(formData: FormData) {
  await signIn('resend', formData)
}

export async function googleSignIn() {
  await signIn('google')
}

export async function githubSignIn() {
  await signIn('github')
}