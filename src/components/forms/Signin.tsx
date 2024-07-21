"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignInSchema } from "@/lib/zod"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setLoading(true)

    const userSignin = signIn('credentials', {
      ...values,
      redirect: false
    })

    toast.promise(userSignin, {
      loading: 'Penetrating the platform...',
      position: 'bottom-center',
      success: (response) => {
        if (!response?.ok || response?.status !== 200 || response?.error?.length) {
          throw new Error(response?.error)
        } else {
          router.push('/profile')
        }
        return 'You have successfully logged into your account.'
      },
      error: (error) => {
        if (error.message === 'CredentialsSignin')
          return 'The email or password you have entered is invalid.'
        return 'Oops, there was an error while logging in, please try again.'
      },
      finally: () => {
        setLoading(false)
      },
      action: {
        label: 'Got it',
        onClick: () => {}
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Pa$sword!1" type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" className="w-full" disabled={loading}>Sign in</Button>
          <Button variant="link" asChild>
            <Link href="#">Forgot password?</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
} 