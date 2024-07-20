import mongoose, { Document, Schema, Types, model } from "mongoose"
import { IExercise } from "./Exercise"

export interface ILecture extends Document {
  _id: Types.ObjectId
  moduleId: Types.ObjectId
  name: string
  slug: string
  content: string
  order: number
  exercises?: IExercise[]
}

export const LectureSchema: Schema = new Schema<ILecture>({
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "Module",
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

export default mongoose.models.Lecture || model<ILecture>('Lecture', LectureSchema)
