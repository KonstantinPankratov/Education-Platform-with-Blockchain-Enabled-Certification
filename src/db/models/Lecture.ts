import mongoose from "mongoose"
import { IExercise } from "./Exercise"

export interface ILecture extends mongoose.Document {
  _id: string
  moduleId: string
  name: string
  slug: string
  content: string
  order: number
  exercises?: IExercise[]
  isCompleted?: boolean
  isAccessible?: boolean
}

export const LectureSchema: mongoose.Schema = new mongoose.Schema<ILecture>({
  moduleId: {
    type: String,
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

const LectureModel: mongoose.Model<ILecture> = mongoose.models.Lecture
export default LectureModel || mongoose.model<ILecture>("Lecture", LectureSchema)