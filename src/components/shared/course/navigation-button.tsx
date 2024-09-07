"use client"

import isCourseCompleted from "@/actions/course/auth/is-course-completed"
import { Button } from "@/components/ui/button"
import { ICourse } from "@/db/models/Course"
import { getCoursePartLink } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ComponentProps {
  targetUrl: string | null
  course: ICourse,
  userId: string
}

const NavigationButton = ({ targetUrl, course, userId }: ComponentProps) => {
  const router = useRouter()
  const redirectHandler = async () => {
    if (targetUrl) {
      router.push(targetUrl)
      return
    }

    if (await isCourseCompleted(userId, course._id)) {
      toast.success("Congratulations, you've successfully completed course! Do you want to generate certificate?", {
        duration: 30000,
        position: "bottom-center",
        action: {
          label: "Yes, I do!",
          onClick: () => {
            router.push(getCoursePartLink({ courseSlug: course.slug }))
          }
        }
      })
    } else {
      toast.success("Excellent, you've successfully completed another lecture!", { // TODO list of different congratulations
        position: "bottom-center",
        action: {
          label: "Yeah!",
          onClick: () => {
            toast.dismiss()
          }
        }
      })
    }

    router.push(getCoursePartLink({ courseSlug: course.slug }))
  }
  return (
    <Button onClick={redirectHandler}>
      Continue
    </Button>
  )
}

export default NavigationButton