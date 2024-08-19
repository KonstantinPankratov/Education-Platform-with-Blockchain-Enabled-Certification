import { ICourse } from "@/db/models/Course"
import { getCoursePartLink } from "@/lib/helpers"

export const fetchFirstCourseLecture = (course: ICourse) => {
  if (course.modules && course.modules[0].lectures) {
    return course.modules[0].lectures[0]
  }
  return null
}

export const fetchFirstCourseLectureLink = (course: ICourse) => {
  const lecture = fetchFirstCourseLecture(course)
  return getCoursePartLink({ courseSlug: course.slug, lectureSlug: lecture?.slug })
}