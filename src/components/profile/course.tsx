import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

const Course = function() {
  return (
    <Card>
      <CardHeader>
          <CardTitle>JavaScript For Beginners</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p>Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.</p>
        <div className="flex gap-x-4 items-center mt-4 w-3/4">
          <Progress className="flex-grow" value={60}/>
          <span className="font-bold text-base text-neutral-50">{60}%</span>
        </div>
      </CardContent>
      <CardFooter className="gap-x-4">
        <Button asChild variant="link">
          <Link href="#">Check progress</Link>
        </Button>
        <Button asChild>
          <Link href="#">Continue learning</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Course