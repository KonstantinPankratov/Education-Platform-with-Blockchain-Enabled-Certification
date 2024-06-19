import { Separator } from "@/components/ui/separator"
import Course from "./course"

const Courses = function () {
  return (
    <section className="relative py-20" id="courses">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-base md:text-lg font-semibold text-neutral-500">Let&apos;s start learning with our</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold">Courses</h2>
          <p className="mt-5 text-neutral-50">Lorem ipsum dolor sit amet consectetur. Arcu pharetra orci sit euismod ullamcorper tempor sed cras. Facilisi lacus netus est quis cursus eros.</p>
        </div>
        <div className="mx-auto max-w-4xl mt-14">
          <Course/>
          <Separator className="my-8"/>
          <div className="text-base md:text-lg text-neutral-50 text-center">More comming soon<span className="text-neutral-500">, probably...</span></div>
        </div>
      </div>
    </section>
  )
}

export default Courses
