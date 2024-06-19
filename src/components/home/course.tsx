import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import Link from "next/link";

const Course = function() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>JavaScript For Beginners</CardTitle>
      </CardHeader>
      <CardContent className=" pb-4">
        <p>Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.</p>
        <ul className="list-decimal pl-7">
          <li>Introduction</li>
          <li>Operations</li>
          <li>Variables</li>
        </ul>
      </CardContent>
      <CardFooter className="gap-x-4">
        <Button asChild variant="link">
          <Link href="/course">View all modules</Link>
        </Button>
        <Button asChild>
          <Link href="#">Enroll</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Course;