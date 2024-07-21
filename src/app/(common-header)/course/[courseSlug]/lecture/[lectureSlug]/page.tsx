import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import Shortcut from "@/components/ui/shortcut"
import { getCourseModuleLectureBySlugs } from "@/db/services/courseService"
import Link from "next/link"
import { notFound } from "next/navigation"
import sanitizeHtml from 'sanitize-html'


interface PageProps {
  params: {
    courseSlug: string,
    lectureSlug: string
  }
}

export default async function Page({ params: { courseSlug, lectureSlug } }: PageProps) {
  const { course, module, lecture } = await getCourseModuleLectureBySlugs(courseSlug, lectureSlug)

  if (!course || !module || !lecture)
    notFound()

  const lectureContent = sanitizeHtml(lecture?.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h2', 'h3', 'p' ]),
    allowedAttributes: {
        '*': ['style', 'class'],
        'a': [ 'href', 'name', 'target' ],
        'img': [ 'src' ],
    }
  })

  return (
    <section className="relative isolate pt-14">
      <div className="container max-w-4xl">
        <Breadcrumb>
          <BreadcrumbList>
          <BreadcrumbItem>
              <BreadcrumbLink href={`/course/${course?.slug}`}>{ course?.name }</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            { module?.order }. { module?.name }
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{ lecture?.name }</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl sm:text-6xl mt-10 mb-5">{ lecture?.name }</h1>
        <div className="flex flex-col gap-y-5" dangerouslySetInnerHTML={{__html: lectureContent}}></div>
        <div className="flex justify-center mt-10">
          <Button asChild>
            <Link href="/practice">Continue <Shortcut>Ctrl + Enter</Shortcut></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
