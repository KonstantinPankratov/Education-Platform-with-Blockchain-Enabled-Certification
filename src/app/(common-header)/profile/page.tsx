import { auth } from "@/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CardChart from '@/components/profile/card-chart'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { getUserEnrollments } from "@/db/services/userService"
import { Progress } from "@/components/ui/progress"
import { File } from "lucide-react"


export default async function Page() {
  const session = await auth()

  const enrolledCourses = await getUserEnrollments(session?.user._id!)
  const enrolledCourseCount = enrolledCourses.length
  const completedExerciseCount = enrolledCourses.reduce((sum, { completedExerciseCount }) => sum + completedExerciseCount, 0)

  const learningData = [
    { key: '9.06', value: 3 },
    { key: '10.06', value: 8 },
    { key: '11.06', value: 2 },
    { key: '12.06', value: 5 },
    { key: '13.06', value: 7 },
    { key: '14.06', value: 4 },
    { key: '15.06', value: 6 },
  ]

  return (
    <>
      <section className="container mt-14">
        <div className="flex items-center gap-x-5 my-10">
          <h1 className="text-4xl sm:text-6xl">Profile</h1>
          <Button asChild variant={"link"}>
            <Link href="#">Edit</Link>
          </Button>
        </div>
        <div className="flex gap-5">
          <CardChart data={learningData} desc="Modules" />
        </div>
      </section>

      <section className="container pt-14" id="enrolled-courses">
        <h2 className="text-3xl sm:text-4xl">Enrolled courses</h2>
        <div className="flex gap-3 mt-4 mb-10">
          <Badge variant="outline">{`${enrolledCourseCount} courses`}</Badge>
          <Badge variant="outline">{`${completedExerciseCount} completed exercises`}</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Progress</TableHead>
              <TableHead className="w-[150px]">Enrolled date</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrolledCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">
                  <Link className="underline-offset-4 hover:underline" href={`/course/${course.slug}`}>{course.name}</Link>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="py-2"><Progress value={course.progress} className="w-[100px] h-1" /></TooltipTrigger>
                      <TooltipContent>
                        <span>{`${course.progress}%`}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{course.enrolledAt}</TableCell>
                <TableCell>
                  <Button asChild variant="link">
                    <Link href={`/course/${course.slug}`}>View course</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!enrolledCourses.length && <div className="flex flex-col justify-center items-center py-5">
          <File size={70} strokeWidth={1} className="mb-3" />
          <div className="font-bold text-xl mb-1">No enrolled courses</div>
          <div className="font-semibold text-sm text-muted-foreground mb-4">Courses you enroll in will be displayed here</div>
          <Button asChild variant="outline">
            <Link href="/#courses">View all courses</Link>
          </Button>
        </div>}
      </section>
    </>
  )
}
