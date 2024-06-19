"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { Github } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-col space-y-2 text-center mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your email and password below to create your account</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
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
                  <Input placeholder="Pa$sword!1" type="password" {...field} />
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
                  <Input placeholder="Pa$sword!1" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Sign up</Button>
        </form>
      </Form>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-neutral-700"></div>
        <span className="flex-shrink mx-4 text-neutral-700">Or continue with</span>
        <div className="flex-grow border-t border-neutral-700"></div>
      </div>

      <div className="flex flex-col items-center">
        <Button variant="outline" size="lg" className="w-full">
          <Github size={20} className="mr-3"/> Github
        </Button>
      </div>

      <div className="flex justify-center mt-10">
        <Button variant="link" asChild>
          <Link href="/sign-in">Already have an account? Sign in!</Link>
        </Button>
      </div>
    </div>
  )
}
