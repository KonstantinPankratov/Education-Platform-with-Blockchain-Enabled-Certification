import mongoose from "mongoose"
import { IModule } from "./Module"

export interface ICourse extends mongoose.Document {
  _id: string
  name: string
  slug: string
  content?: string
  modules?: IModule[]
}

export interface IAuthCourse extends ICourse {
  progress: number
  lectureCount: number
  exerciseCount: number
}

const CourseSchema: mongoose.Schema = new mongoose.Schema<ICourse>({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
})

const CourseModel: mongoose.Model<ICourse> = mongoose.models.Course
export default CourseModel || mongoose.model<ICourse>("Course", CourseSchema)