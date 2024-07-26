import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Post from "@/components/exercise/post"
import Link from "next/link"
import { Play } from "lucide-react"
import { getCourseModuleLectureExerciseBySlugs } from "@/db/services/courseService"
import { notFound } from "next/navigation"
import { parseContent, sanitizeContent } from "@/lib/helpers"
import CodeEditorPanel from "@/components/exercise/code-editor-panel"

interface PageProps {
  params: {
    courseSlug: string,
    exerciseSlug: string
  }
}

export default async function Page({ params: { courseSlug, exerciseSlug } }: PageProps) {
  const { course, module, lecture, exercise } = await getCourseModuleLectureExerciseBySlugs(courseSlug, exerciseSlug)

  if (!course || !module || !lecture || !exercise)
    notFound()

  const parsedExerciseContent = parseContent(sanitizeContent(exercise?.content))

  return (
    <ResizablePanelGroup
      direction="horizontal">
      <ResizablePanel defaultSize={45} minSize={20} className="p-6 pt-3 flex"> {/* left */}
        <Tabs defaultValue="Description" className="w-full flex flex-col items-start">
          <TabsList>
            <TabsTrigger value="Description">Description</TabsTrigger>
            <TabsTrigger value="Discussion">Discussion (23)</TabsTrigger>
          </TabsList>
          <TabsContent value="Description" className="w-full overflow-auto pr-5">
            <Breadcrumb className="mb-3 mt-5">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/course/${course?.slug}`}>{course?.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>{module?.order}. {module?.name}</DropdownMenuItem>
                      <DropdownMenuItem>{lecture?.name}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{exercise?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl sm:text-4xl mb-5">{exercise?.name}</h1>
            <div className="flex flex-col gap-y-5">
              {parsedExerciseContent}
            </div>
            <p className="border py-2 px-3 mt-4 rounded-sm text-base">Is there anything unclear? Feel free to <Link href={`/course/${course.slug}/lecture/${lecture.slug}`} className="underline underline-offset-2 hover:text-primary">go back to the theory</Link>.</p>
          </TabsContent>
          <TabsContent value="Discussion" className="w-full overflow-auto pr-5">
            <div className="flex flex-col gap-y-10 mt-8">
              <Post />
              <Post />
            </div>
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55} minSize={20} className="p-6 pt-3"> {/* right */}
        <CodeEditorPanel exercise={exercise} nextLink={nextLink} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
