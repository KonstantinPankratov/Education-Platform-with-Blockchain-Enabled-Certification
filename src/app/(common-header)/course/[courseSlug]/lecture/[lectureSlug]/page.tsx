import fetchLectureData from "@/actions/course/fetch-by-course-lecture-slugs"
import isUserEnrolled from "@/actions/user/enrollment/is-enrolled"
import { auth } from "@/auth"
import NavigationButton from "@/components/shared/course/navigation-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation"
import sanitizeHtml from 'sanitize-html'

interface PageProps {
  params: {
    courseSlug: string,
    lectureSlug: string
  }
}

export default async function Page({ params: { courseSlug, lectureSlug } }: PageProps) {
  const session = await auth()

  const { course, module, lecture, nextPartUrl } = await fetchLectureData(courseSlug, lectureSlug)

  if (!course || !module || !lecture)
    notFound()

  if (!isUserEnrolled(session?.user._id!, course._id))
    throw new Error('You are not enrolled in this course')

  const lectureContent = sanitizeHtml(lecture?.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h2', 'h3', 'p']),
    allowedAttributes: {
      '*': ['style', 'class'],
      'a': ['href', 'name', 'target'],
      'img': ['src'],
    }
  })

  return (
    <section className="relative isolate pt-14">
      <div className="container max-w-4xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/course/${course?.slug}`}>{course?.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {module?.order}. {module?.name}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lecture?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl sm:text-6xl mt-10 mb-5">{lecture?.name}</h1>
        <div className="flex flex-col gap-y-5" dangerouslySetInnerHTML={{ __html: lectureContent }}></div>
        <div className="flex justify-center mt-10">
          <NavigationButton url={nextPartUrl} course={course} />
        </div>
      </div>
    </section>
  )
}
