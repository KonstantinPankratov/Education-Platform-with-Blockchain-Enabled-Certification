"use client"

import { resendSignIn } from "@/actions/user/signIn"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { ResendFormSchema } from "@/lib/zod"
import { toast } from "sonner"

export function SignInWithResend() {
  const form = useForm<ResendFormSchema>({
    resolver: zodResolver(ResendFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: ResendFormSchema) {
    resendSignIn(values).then(() => {
      toast.success("Check your email, a sign in link has been sent to your email address.", {
        duration: 10000,
        position: "bottom-center",
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 my-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in with email</Button>
      </form>
    </Form>
  )
}