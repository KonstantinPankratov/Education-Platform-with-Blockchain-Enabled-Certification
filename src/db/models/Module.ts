import mongoose, { Document, Schema, model } from "mongoose"
import Course from "./Course"
import { ILecture } from "./Lecture"

export interface IModule extends Document {
  courseId: mongoose.Types.ObjectId
  name: string
  slug: string
  content: string
  order: number
  lectures?: ILecture[]
}

export const ModuleSchema: Schema = new Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: Course,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 1
  }
})

export default mongoose.models.Module || model<IModule>('Module', ModuleSchema)
