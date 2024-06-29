import mongoose, { Document, Schema, model } from "mongoose"
import Lecture from "./Lecture"

export interface IExercise extends Document {
  lectureId: mongoose.Types.ObjectId
  name: string
  slug: string
  content: string
  snippet: string
  order: number
}

export const ExerciseSchema: Schema = new Schema({
  lectureId: {
    type: mongoose.Types.ObjectId,
    ref: Lecture,
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

export default mongoose.models.Exercise || model<IExercise>('Exercise', ExerciseSchema)
