import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { IModule } from "@/db/models/Module"
import { notFound } from "next/navigation"
import { ILecture } from "@/db/models/Lecture"
import { IExercise } from "@/db/models/Exercise"
import { Book, Pickaxe } from "lucide-react"
import CourseEnrollment from "@/components/forms/CourseEnrollment"
import { auth } from "@/auth"
import fetchAuthCourseBySlug from "@/actions/course/auth/fetch-course-by-slug"
import fetchCourseBySlug from "@/actions/course/fetch-course-by-slug"
import isUserEnrolled from "@/actions/user/enrollment/is-enrolled"

interface PageProps {
  params: {
    courseSlug: string
  }
}

export default async function Page({ params: { courseSlug } }: PageProps) {

  const session = await auth()

  const course = session ? await fetchAuthCourseBySlug(session.user._id, courseSlug) : await fetchCourseBySlug(courseSlug)

  if (!course)
    notFound()

  const isEnrolled: boolean = session ? await isUserEnrolled(session?.user._id, course._id) : false

  let moduleNodes: React.ReactNode[] = []

  course.modules?.map((module: IModule, index: number) => {
    let itemNodes: React.ReactNode[] = []

    module.lectures?.map((lecture: ILecture) => {
      itemNodes.push(
        <tr key={`lecture-${lecture._id}`}>
          <td>
            <Book size={20} className="mr-2" />
          </td>
          <td className="p-1">
            lecture
          </td>
          <td className="p-1">
            {lecture.name}
          </td>
          <td>{lecture.isCompleted && 'Completed'}</td>
          <td>{lecture.isAccessible && 'Accessible'}</td>
        </tr>
      )

      lecture.exercises?.map((exercise: IExercise) => {
        itemNodes.push(
          <tr key={`exercise-${exercise._id}`}>
            <td>
              <Pickaxe size={20} className="mr-2" />
            </td>
            <td className="p-1 whitespace-nowrap">
              exercise
            </td>
            <td className="p-1">
              {exercise.name}
            </td>
            <td>
              {exercise.isCompleted && 'Completed'}
            </td>
          </tr>
        )
      })
    })

    moduleNodes.push(<AccordionItem key={`module-${module._id}`} value={`module-${index}`} >
      <AccordionTrigger className="text-base md:text-lg">{`${module.order}. ${module.name}`} {module.isCompleted && 'Completed'}</AccordionTrigger>
      <AccordionContent className="text-neutral-400 text-base md:text-lg">
        {module.content}
        {module.lectures?.length && <table className="m-5">
          <tbody>
            {itemNodes}
          </tbody>
        </table>}
      </AccordionContent>
    </AccordionItem>)
  })

  return (
    <>
      <section className="relative isolate pt-14">
        <div className="container">
          <h1 className="text-4xl sm:text-6xl">{course.name} {`${course.progress}%`}</h1>
          <p className="mt-6 w-3/5">{course.content}</p>
          <CourseEnrollment course={course} isUserEnrolled={isEnrolled} className="mt-8" />
        </div>
      </section>

      <section className="container mt-20">
        <h2 className="text-3xl sm:text-4xl">Modules</h2>
        <div className="flex gap-3 mt-4">
          <Badge variant="outline">{`${course.lectureCount} lectures`}</Badge>
          <Badge variant="outline">{`${course.exerciseCount} exercises`}</Badge>
        </div>
        {course.modules?.length ?
          <Accordion type="single" className="w-full mt-10">
            {moduleNodes}
          </Accordion> :
          <div className="font-semibold text-base md:text-lg rounded-lg p-3 mt-3 bg-red-950 text-red-600">No modules found</div>
        }

        <div className="flex justify-center">
          <CourseEnrollment course={course} isUserEnrolled={isEnrolled} className="mt-8" />
        </div>
      </section>
    </>
  )
}
