"use client"

import { Button } from "@/components/ui/button"
import { ICourse } from "@/db/models/Course"
import { getCoursePartLink } from "@/lib/helpers"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ComponentProps {
  url: string | null
  course: ICourse
}

const NavigationButton = ({ url, course }: ComponentProps) => {
  const router = useRouter()
  const redirectHandler = () => {
    if (url) {
      router.push(url)
      return
    }

    // TODO complete course action
    toast.info("Excellent, you've successfully completed another module!", {
      position: "bottom-center",
      action: {
        label: "Yeah!",
        onClick: () => {
          toast.dismiss()
        }
      }
    })
    router.push(getCoursePartLink({ courseSlug: course.slug }))
  }
  return (
    <Button onClick={redirectHandler}>
      Continue
    </Button>
  )
}

export default NavigationButton