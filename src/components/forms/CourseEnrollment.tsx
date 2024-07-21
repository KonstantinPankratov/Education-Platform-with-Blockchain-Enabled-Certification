"use client"

import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { NOT_AUTH_ROUTE } from "@/lib/routes"
import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ICourse } from "@/db/models/Course"
import { enrollUser } from "@/db/services/userService"

const CourseEnrollment = ({
  course,
  isUserEnrolled,
  className
} : {
  course: ICourse,
  isUserEnrolled: boolean,
  className?: string
}) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [enrolled, setEnrolled] = useState<boolean>(isUserEnrolled)
  const [loading, setLoading] = useState<boolean>(false)

  const enroll = async () => {
    if (status === "unauthenticated") {
      toast.error("You must be authorized to enroll in the course.", {
        position: "bottom-center",
        action: {
          label: "Yeah, let's log in",
          onClick: () => {
            toast.dismiss()
            router.push(NOT_AUTH_ROUTE)
          }
        }
      })

      return
    }

    setLoading(true)

    const enrollPromise = enrollUser(session?.user?._id!, course._id)
      .then(async response => {
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error)
        }
        return response.json()
      }).then(async data => {
        setEnrolled(true)
        setTimeout(() => {
          router.push('/course/javascript-for-beginners/lecture/what-is-javascript')
        }, 10000)
        return data
      }).finally(() => {
        setLoading(false)
      })

    toast.promise(enrollPromise, {
      loading: `Enrolling in the ${course.name} ...`,
      position: 'bottom-center',
      success: (data) => {
        return data.message
      },
      error: (error) => {
        return error.message
      },
      action: {
        label: "Got it",
        onClick: () => {}
      }
    })
  }

  return (
    <>
    { enrolled ?
       <Button onClick={enroll} disabled={enrolled} className={ cn(className) }><Check className="mr-2 h-4 w-4"/> Continue learning</Button> : 
       <Button onClick={enroll} disabled={loading} className={ cn(className) }>Enroll</Button> }
    </>
  )
}

export default CourseEnrollment