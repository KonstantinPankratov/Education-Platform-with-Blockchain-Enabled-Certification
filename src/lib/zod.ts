import { z } from "zod"
import { DATE_PLACEHOLDER, DATE_REGEX } from "./dateMask"

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


export const ProfileSchema = z.object({
  name: z.string({
    required_error: "Name is required"
  }),
  dateOfBirth: z.string({
    required_error: "Date of birth is required"
  }).regex(DATE_REGEX, { message: `Invalid date format. Use ${DATE_PLACEHOLDER}` })
})

export type ProfileSchema = z.infer<typeof ProfileSchema>

