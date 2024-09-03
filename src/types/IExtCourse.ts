import { ICourse } from "@/db/models/Course"

export default interface IExtCourse extends ICourse {
  lectureCount: number
  exerciseCount: number
}