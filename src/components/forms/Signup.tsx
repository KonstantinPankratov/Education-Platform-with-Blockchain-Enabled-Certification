"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SignUpSchema } from "@/lib/zod"
import { useState } from "react"


export function SignUp() {
  const [loading, setLoading] = useState<Boolean>(false)

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: ""
    },
  })

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setLoading(true)

    const userCreation = fetch(`/api/user/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
    .then(async response => {
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      form.reset()
      return response.json()
    }).finally(() => {
      setLoading(false)
    })
  
    toast.promise(userCreation, {
      loading: 'Creating...',
      position: 'bottom-center',
      success: (data) => {
        return data.message
      },
      error: (error) => {
        return error.message
      },
      action: {
        label: 'Got it'
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
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Pa$sword!1" type="password" autoComplete="confirm-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>Sign up</Button>
      </form>
    </Form>
  )
} 