import { z } from "zod"
import { DATE_PLACEHOLDER, DATE_REGEX } from "./dateMask"

export const ProfileSchema = z.object({
  name: z.string({
    required_error: "Name is required"
  }),
  dateOfBirth: z.string({
    required_error: "Date of birth is required"
  }).regex(DATE_REGEX, { message: `Invalid date format. Use ${DATE_PLACEHOLDER}` })
})

export type ProfileSchema = z.infer<typeof ProfileSchema>

export const ResendFormSchema = z.object({
  email: z.string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
})

export type ResendFormSchema = z.infer<typeof ResendFormSchema>
