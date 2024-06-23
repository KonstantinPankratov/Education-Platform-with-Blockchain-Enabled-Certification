import mongoose, { Document, Schema, model } from "mongoose"
import Exercise from "./Exercise"

export interface ILecture extends Document {
  name: string,
  slug: string,
  content: string,
  exercises: mongoose.Types.ObjectId[],
  order: number
}

export const LectureSchema: Schema = new Schema({
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
  exercises: [{
    type: mongoose.Types.ObjectId,
    ref: Exercise
  }],
  order: {
    type: Number,
    default: 1
  }
})

export default mongoose.models.Lecture || model<ILecture>('Lecture', LectureSchema)
