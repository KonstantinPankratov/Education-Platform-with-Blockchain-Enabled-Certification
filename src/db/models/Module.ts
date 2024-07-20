import mongoose, { Document, Schema, Types, model } from "mongoose"
import { ILecture } from "./Lecture"

export interface IModule extends Document {
  _id: Types.ObjectId
  courseId: Types.ObjectId
  name: string
  slug: string
  content: string
  order: number
  lectures?: ILecture[]
}

export const ModuleSchema: Schema = new Schema<IModule>({
  courseId: {
    type: Schema.Types.ObjectId,
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
