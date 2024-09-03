import { ICourse } from "@/db/models/Course"
import { ILecture } from "@/db/models/Lecture"
import { IModule } from "@/db/models/Module"

export default interface ICourseModuleLecture {
  course: ICourse | null
  module: IModule | null
  lecture: ILecture | null
  nextPartUrl: string | null
}