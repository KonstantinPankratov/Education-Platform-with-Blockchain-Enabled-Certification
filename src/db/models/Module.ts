import mongoose from "mongoose"
import { ILecture } from "./Lecture"

export interface IModule extends mongoose.Document {
  _id: string
  courseId: string
  name: string
  slug: string
  content: string
  order: number
  lectures?: ILecture[]
  isCompleted?: boolean
}

export const ModuleSchema: mongoose.Schema = new mongoose.Schema<IModule>({
  courseId: {
    type: String,
    ref: "Course",
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

const ModuleModel: mongoose.Model<IModule> = mongoose.models.Module
export default ModuleModel || mongoose.model<IModule>("Module", ModuleSchema)