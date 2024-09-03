import { ICourse } from "@/db/models/Course"

export default interface IAuthExtCourse extends ICourse {
  isCompleted: boolean
  lectureCount: number
  exerciseCount: number
  completedExerciseCount: number
  progress: undefined
}