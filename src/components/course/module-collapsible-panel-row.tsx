import { getCoursePartLink } from "@/lib/helpers"
import { TableCell, TableRow } from "../ui/table"
import { ICourse } from "@/db/models/Course"
import { ILecture } from "@/db/models/Lecture"
import { IExercise } from "@/db/models/Exercise"
import { Book, Check, FileCode, Lock, Unlock } from "lucide-react"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface ComponentProps {
  course: ICourse,
  coursePart: ILecture | IExercise,
  type: "lecture" | "exercise",
  isEnrolled: boolean
}

const ModuleCollapsiblePanelRow = ({
  course,
  coursePart,
  type,
  isEnrolled
}: ComponentProps) => {
  if (!isEnrolled) {
    return (
      <TableRow className="text-neutral-50">
        <TableCell>
          {
            type === 'lecture' ?
              <Book size={20} /> :
              <FileCode size={20} />
          }
        </TableCell>
        <TableCell>
          {type === "lecture" ? 'Lecture' : 'Exercise'}
        </TableCell>
        <TableCell className="w-full">
          {coursePart.name}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    )
  }

  const getAccessibilityIcon = (coursePart: ILecture | IExercise): ReactNode => {
    if (coursePart.isCompleted) {
      return (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex items-center">
              <Check size={20} />
            </TooltipTrigger>
            <TooltipContent side="right">
              Completed
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    if (coursePart.isAccessible) {
      return (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex items-center">
              <Unlock size={20} />
            </TooltipTrigger>
            <TooltipContent side="right">
              Available
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger className="flex items-center">
            <Lock size={20} />
          </TooltipTrigger>
          <TooltipContent side="right">
            Unavailable<br /> Complete previous tasks
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const url = getCoursePartLink({ courseSlug: course.slug, lectureSlug: type === "lecture" ? coursePart.slug : undefined, exerciseSlug: type === "exercise" ? coursePart.slug : undefined })

  return (
    <TableRow className={
      cn("text-neutral-600", {
        "text-neutral-50": coursePart.isAccessible
      })
    }>
      <TableCell>
        {getAccessibilityIcon(coursePart)}
      </TableCell>
      <TableCell>
        {type === "lecture" ? 'Lecture' : 'Exercise'}
      </TableCell>
      <TableCell className="w-full">
        {
          coursePart.isAccessible ?
            <Link className="underline-offset-4 hover:underline" href={url}>{coursePart.name}</Link>
            :
            coursePart.name
        }
      </TableCell>
      <TableCell className="p-0">
        {
          coursePart.isAccessible &&
          <Button asChild variant="link">
            <Link href={url}>Get to {type}</Link>
          </Button>
        }
      </TableCell>
    </TableRow>
  )
}

export default ModuleCollapsiblePanelRow