import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { ProfileSchema } from "@/lib/zod"
import { Button } from "../ui/button"
import { useState } from "react"
import { useMaskito } from '@maskito/react'
import dateMask, { DATE_PLACEHOLDER } from "@/lib/dateMask"
import updateProfile from "@/actions/profile/update-profile"
import { IUserProfile } from "@/actions/profile/fetch-profile"

interface ComponentProps {
  profile: IUserProfile,
  onProfileUpdate: (data: any) => void
  onSuccessfulCallback: () => void
}

const ProfileEditForm = ({ profile, onProfileUpdate, onSuccessfulCallback }: ComponentProps) => {
  const dobRef = useMaskito({ options: dateMask })
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: profile?.name,
      dateOfBirth: profile?.dateOfBirth,
    },
  })

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    if (loading) return false

    setLoading(true)

    const profileUpdatePromise = updateProfile(values)
      .finally(() => {
        setLoading(false)
      })

    toast.promise(profileUpdatePromise, {
      loading: 'Updating...',
      position: 'bottom-center',
      success: (data) => {
        onProfileUpdate(values)
        setTimeout(onSuccessfulCallback, 200)
        return data.message
      },
      error: (error) => {
        return error.message
      },
      action: {
        label: 'Got it',
        onClick: () => { }
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input {...field} placeholder={DATE_PLACEHOLDER} onInput={field.onChange} ref={dobRef} autoComplete="dob" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex justify-end">
          <Button className="grow" type="submit" disabled={loading}>Save changes</Button>
        </FormItem>
      </form>
    </Form>
  )
}

export default ProfileEditForm