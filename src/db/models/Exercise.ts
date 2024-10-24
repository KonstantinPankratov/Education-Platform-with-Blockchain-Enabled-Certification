import mongoose from "mongoose"
import { ITest } from "./Test"

export interface IExercise extends mongoose.Document {
  _id: string
  lectureId: mongoose.Types.ObjectId
  name: string
  slug: string
  content: string
  snippet: string
  order: number
  tests: ITest[]
  isCompleted?: boolean
  isAccessible?: boolean
}

export const ExerciseSchema: mongoose.Schema = new mongoose.Schema<IExercise>({
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
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
  snippet: {
    type: String
  },
  order: {
    type: Number,
    default: 1
  }
})

const ExerciseModel: mongoose.Model<IExercise> = mongoose.models.Exercise
export default ExerciseModel || mongoose.model<IExercise>("Exercise", ExerciseSchema)