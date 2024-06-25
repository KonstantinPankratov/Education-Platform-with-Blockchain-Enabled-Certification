import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCourseBySlug } from "@/db/services/courseService"
import { IModule } from "@/db/models/Module"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ILecture } from "@/db/models/Lecture"
import { IExercise } from "@/db/models/Exercise"
import { Book, Pickaxe } from "lucide-react"

interface PageProps {
  params: {
    courseSlug: string
  }
}

export default async function Page({ params: { courseSlug } }: PageProps) {
  const course = await getCourseBySlug(courseSlug, {
    populate: [
      {
        path: 'modules',
        options: { sort: { order: 1 } },
        populate: {
          path: 'lectures',
          options: { sort: { order: 1 } },
          populate: {
            path: 'exercises',
            options: { sort: { order: 1 } }
          }
        }
      }
    ]
  })

  if (!course)
    notFound()

  let lectureNumber = 0
  let exerciseNumber = 0

  let moduleNodes: React.ReactNode[] = []

  course.modules?.map((module: IModule, index: number) => {
    lectureNumber += module.lectures?.length ?? 0

    let itemNodes: React.ReactNode[] = []

    module.lectures.map((lecture: ILecture) => {
      exerciseNumber += lecture.exercises?.length ?? 0

      itemNodes.push(
        <tr className="" key={`lecture-${lecture._id}`}>
          <td>
            <Book size={20} className="mr-2"/>
          </td>
          <td className="p-1">
            lecture
          </td>
          <td className="p-1">
            { lecture.name }
          </td>
        </tr>
      )

      lecture.exercises?.map((exercise: IExercise) => {
        itemNodes.push(
          <tr className="" key={`exercise-${exercise._id}`}>
            <td>
              <Pickaxe size={20} className="mr-2"/>
            </td>
            <td className="p-1 whitespace-nowrap">
              exercise
            </td>
            <td className="p-1">
              { exercise.name }
            </td>
          </tr>
        )
      })
    })

    moduleNodes.push(<AccordionItem key={module._id} value={`module-${index}`} >
      <AccordionTrigger className="text-base md:text-lg">{module.order}. {module.name}</AccordionTrigger>
      <AccordionContent className="text-neutral-400 text-base md:text-lg">
        { module.content }
        { module.lectures?.length && <table className="m-5">
          <tbody>
          { itemNodes }
          </tbody>
        </table> }
      </AccordionContent>
    </AccordionItem>)
  })

  const isEnrollable = course && !!course.modules?.length

  return (
    <>
      <section className="relative isolate pt-14">
        <div className="container">
          <h1 className="text-4xl sm:text-6xl">{course.name}</h1>
          <p className="mt-6 w-3/5">{ course.content }</p>
          { isEnrollable && <Button asChild className="mt-8" size="lg">
            <Link href="#">Enroll</Link>
          </Button> }
        </div>
      </section>

      <section className="container mt-20">
        <h2 className="text-3xl sm:text-4xl">Modules</h2>
        <div className="flex gap-3 mt-4">
          <Badge variant="outline">{lectureNumber} lectures</Badge>
          <Badge variant="outline">{exerciseNumber} exercises</Badge>
        </div>
        { course.modules?.length ?
          <Accordion type="single" className="w-full mt-10">
            {moduleNodes}
          </Accordion> :
          <div className="font-semibold text-base md:text-lg rounded-lg p-3 mt-3 bg-red-950 text-red-600">No modules found</div>
        }

        <div className="flex justify-center">
          { isEnrollable && <Button asChild className="mt-8" size="lg">
            <Link href="#">Enroll</Link>
          </Button> }
        </div>
      </section>
    </>
  )
}
  