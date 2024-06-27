import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Course from "@/components/profile/course"
import CardChart from '@/components/profile/card-chart'


export default function Page() {
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
          <CardChart data={learningData} desc="Modules"/>
        </div>
      </section>

      <section className="container pt-14" id="enrolled-courses">
        <h2 className="text-3xl sm:text-4xl">Enrolled courses</h2>
        <div className="flex gap-3 mt-4">
          <Badge variant="outline">1 / 1  courses</Badge>
          <Badge variant="outline">8  completed lessons</Badge>
          <Badge variant="outline">6  completed exercises</Badge>
        </div>
        <div className="grid grid-cols-2 gap-7 mt-4">
          <Course/>
          <Course/>
        </div>
      </section>
    </>
  )
}