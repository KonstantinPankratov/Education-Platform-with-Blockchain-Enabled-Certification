import mongoose, { Document, Schema, Types, model } from "mongoose"

export interface IExercise extends Document {
  _id: Types.ObjectId
  lectureId: Types.ObjectId
  name: string
  slug: string
  content: string
  snippet: string
  order: number
}

export const ExerciseSchema: Schema = new Schema<IExercise>({
  lectureId: {
    type: Schema.Types.ObjectId,
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

export default mongoose.models.Exercise || model<IExercise>('Exercise', ExerciseSchema)
