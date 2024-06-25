import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { ICourse } from "@/db/models/Course"
import { IModule } from "@/db/models/Module"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface CourseProps {
  course: ICourse
}

const Course = function({ course }: CourseProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/course/${course.slug}`} className="underline-offset-4 hover:underline">{ course.name }</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className=" pb-4">
        <p>{ course.content }</p>
        { course.modules.length && <div className="flex gap-3 mt-3 overflow-auto">
          { course.modules.slice(0, 7).map((module: IModule) => {
            return <Badge key={ module._id } className="whitespace-nowrap" variant="outline">{ module.order }. { module.name }</Badge>
          }) }
        </div> }
      </CardContent>
      <CardFooter className="gap-x-4">
      <Button asChild>
          <Link href="#">Enroll</Link>
        </Button>
        <Button asChild variant="link">
          <Link href={`/course/${course.slug}`}>View modules</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Course