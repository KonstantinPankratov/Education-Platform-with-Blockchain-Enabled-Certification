"use client"

import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"
import { NOT_AUTH_ROUTE } from "@/lib/routes"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ICourse } from "@/db/models/Course"
import doEnrollment from "@/actions/user/enrollment/do-enrollment"
import { getCoursePartLink } from "@/lib/helpers"

const CourseEnrollment = ({
  course,
  isUserEnrolled,
  className
}: {
  course: ICourse,
  isUserEnrolled: boolean,
  className?: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
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

    if (enrolled) {
      return // TODO router.push( %CONTINUE URL% )
    }

    setLoading(true)

    const enrollPromise = doEnrollment(session?.user?._id!, course._id)
      .then(async data => {
        setEnrolled(true)
        setTimeout(() => {
          const coursePage = getCoursePartLink({ courseSlug: course.slug })
          if (pathname === coursePage) {
            router.refresh()
          } else {
            router.push(coursePage)
          }
        }, 100)
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
        onClick: () => { }
      }
    })
  }

  return (
    <>
      {enrolled ?
        <Button onClick={enroll} disabled={enrolled} className={cn(className)}>You&apos;re enrolled</Button> :
        <Button onClick={enroll} disabled={loading} className={cn(className)}>Enroll</Button>}
    </>
  )
}

export default CourseEnrollment