import Hero from "@/components/home/hero"
import HowItWorks from "@/components/home/how-it-works"
import Courses from "@/components/home/courses"
import isCourseCompleted from "@/actions/course/auth/is-course-completed"
import fetchCourseByExerciseId from "@/actions/course/auth/fetch-course-by-exercise-id"

export default function Page() {

  // isCourseCompleted('66a366f682ceea03e33a2a98', '66742b0704792f833165af73')

  fetchCourseByExerciseId('6676fc576e692c13ed9d3815')
  return (
    <>
      <Hero />
      <HowItWorks />
      <Courses />
    </>
  )
}
