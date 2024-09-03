import { ICourse } from "@/db/models/Course"
import { IExercise } from "@/db/models/Exercise"
import { ILecture } from "@/db/models/Lecture"
import { IModule } from "@/db/models/Module"

export default interface ICourseModuleLectureExercise {
  course: ICourse | null
  module: IModule | null
  lecture: ILecture | null
  exercise: IExercise | null
  nextPartUrl: string | null
}