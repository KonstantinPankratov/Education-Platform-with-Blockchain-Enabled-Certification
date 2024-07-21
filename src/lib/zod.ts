import { z } from "zod"

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type SignInSchema = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
})
// TODO pwd complexity

export type SignUpSchema = z.infer<typeof SignUpSchema>