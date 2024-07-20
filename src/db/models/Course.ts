import mongoose, { Document, Schema, model, Types } from "mongoose"
import { IModule } from "./Module"

export interface ICourse extends Document {
  _id: Types.ObjectId
  name: string
  slug: string
  content?: string
  modules?: IModule[]
  lectureCount?: number
  exerciseCount?: number
}

const CourseSchema: Schema = new Schema<ICourse>({
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
