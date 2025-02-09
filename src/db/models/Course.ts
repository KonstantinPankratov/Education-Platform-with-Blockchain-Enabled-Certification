import mongoose from "mongoose"
import { IModule } from "./Module"

export interface ICourse extends mongoose.Document {
  _id: string
  name: string
  slug: string
  content?: string
  modules?: IModule[]
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