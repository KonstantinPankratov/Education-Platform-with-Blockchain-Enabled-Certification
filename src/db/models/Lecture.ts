import mongoose, { Document, Schema, model } from "mongoose"
import { IExercise } from "./Exercise"
import Module from "./Module"

export interface ILecture extends Document {
  moduleId: mongoose.Types.ObjectId
  name: string
  slug: string
  content: string
  order: number
  exercises?: IExercise[]
}

export const LectureSchema: Schema = new Schema({
  moduleId: {
    type: mongoose.Types.ObjectId,
    ref: Module,
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
