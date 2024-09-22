import { Separator } from "@/components/ui/separator"
import Course from "./course"
import fetchCourses from "@/actions/course/fetch-courses"

const Courses = async function () {
  const courses = await fetchCourses()

  return (
    <section className="relative py-20" id="courses">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-base md:text-lg font-semibold text-neutral-500">Let&apos;s start learning with our</span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold">Courses</h2>
          <p className="mt-5 text-neutral-50">Dive into our courses and build real programming skills through practical exercises and interactive lessons. Learn at your own pace while solving challenges that prepare you for the real world.</p>
        </div>
        <div className="mx-auto max-w-4xl mt-14">
          {!!courses.length && courses.map(course =>
            <Course key={course._id} course={course} />
          )}
          <Separator className="my-8" />
          <div className="text-base md:text-lg text-neutral-50 text-center">More comming soon<span className="text-neutral-500">, probably...</span></div>
        </div>
      </div>
    </section>
  )
}

export default Courses
