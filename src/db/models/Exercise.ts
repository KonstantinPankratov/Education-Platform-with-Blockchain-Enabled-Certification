import mongoose, { Document, Schema, model } from "mongoose"
import Test from "./Test"

export interface IExercise extends Document {
  name: string,
  slug: string,
  content: string,
  tests: mongoose.Types.ObjectId[],
  order: number
}

export const ExerciseSchema: Schema = new Schema({
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
  tests: [{
    type: mongoose.Types.ObjectId,
    ref: Test
  }],
  order: {
    type: Number,
    default: 1
  }
})

export default mongoose.models.Exercise || model<IExercise>('Exercise', ExerciseSchema)
