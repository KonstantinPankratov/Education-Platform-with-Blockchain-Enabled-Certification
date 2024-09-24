import { Accordion } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { IModule } from "@/db/models/Module"
import { notFound } from "next/navigation"
import { ILecture } from "@/db/models/Lecture"
import { IExercise } from "@/db/models/Exercise"
import CourseEnrollment from "@/components/forms/CourseEnrollment"
import { auth } from "@/auth"
import fetchAuthCourseBySlug from "@/actions/course/auth/fetch-course-by-slug"
import fetchCourseBySlug from "@/actions/course/fetch-course-by-slug"
import ModuleCollapsiblePanelRow from "@/components/course/module-collapsible-panel-row"
import { Progress } from "@/components/ui/progress"
import ModuleCollapsiblePanel from "@/components/course/module-collapsible-panel"
import TonCertification from "@/components/course/ton-certification"
import fetchUserEnrollment from "@/actions/user/enrollment/fetch-enrollment"

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

  const enrollment = session ? await fetchUserEnrollment(session?.user._id, course._id) : null
  const isEnrolled: boolean = !!enrollment

  let moduleNodes: React.ReactNode[] = []
  let activeAccordionValue: string | undefined = undefined

  course.modules?.map((module: IModule, index: number) => {
    let itemNodes: React.ReactNode[] = []

    module.lectures?.map((lecture: ILecture) => {
      itemNodes.push(
        <ModuleCollapsiblePanelRow key={`lecture-${lecture._id}`} course={course} coursePart={lecture} type="lecture" isEnrolled={isEnrolled} />
      )

      lecture.exercises?.map((exercise: IExercise) => {
        itemNodes.push(
          <ModuleCollapsiblePanelRow key={`lecture-${exercise._id}`} course={course} coursePart={exercise} type="exercise" isEnrolled={isEnrolled} />
        )
      })
    })

    if (!activeAccordionValue && !module.isCompleted) {
      activeAccordionValue = `module-${module._id}`;
    }

    moduleNodes.push(
      <ModuleCollapsiblePanel key={`module-${module._id}`} module={module} lecturesAndExercises={itemNodes} />
    )
  })

  const isCertificationEnabled = 'isCompleted' in course && course.isCompleted && enrollment;

  return (
    <main>
      <div className="relative isolate pt-14">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h1 className="text-4xl sm:text-6xl font-bold">{course.name}</h1>
              <p className="mt-6">{course.content}</p>
              <div className="flex items-center gap-4 mt-8">
                <CourseEnrollment course={course} isUserEnrolled={isEnrolled} />
                {
                  isEnrolled && 'progress' in course &&
                  <div className="flex flex-col gap-2 text-xs text-neutral-400">
                    {`${course.progress}% completed`}
                    <Progress value={course.progress} className="w-[120px] md:w-[200px] h-2 rounded-md" />
                  </div>
                }
              </div>
            </div>
            <div className="-order-1 lg:order-1">
              {
                isCertificationEnabled &&
                <TonCertification enrollment={enrollment} />
              }
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold">Modules</h2>
        <div className="flex gap-3 mt-4">
          <Badge variant="outline">{`${course.lectureCount} lectures`}</Badge>
          <Badge variant="outline">{`${course.exerciseCount} exercises`}</Badge>
        </div>
        {
          course.modules?.length ?
            <Accordion type="single" className="w-full mt-10" defaultValue={activeAccordionValue}>
              {moduleNodes}
            </Accordion>
            :
            <div className="font-semibold text-base md:text-lg rounded-lg p-3 mt-3 bg-red-950 text-red-600">No modules found</div>
        }

        <div className="flex justify-center">
          <CourseEnrollment course={course} isUserEnrolled={isEnrolled} className="mt-8" />
        </div>
      </div>
    </main>
  )
}
