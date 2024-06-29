import mongoose, { Document, Schema, model } from "mongoose"
import { IModule } from "./Module"

export interface ICourse extends Document {
  name: string
  slug: string
  content?: string
  modules?: IModule[]
  lectureCount?: number
  exerciseCount?: number
}

const CourseSchema: Schema = new Schema({
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

export default mongoose.models.Course || model<ICourse>('Course', CourseSchema)
