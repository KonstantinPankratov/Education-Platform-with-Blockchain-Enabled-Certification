import mongoose, { Document, Schema, Types, model } from "mongoose"
import User from "./auth/User"
import Exercise from "./Exercise"

export interface IUserCompletedExercise extends Document {
  userId: Types.ObjectId
  exerciseId: Types.ObjectId,
  completedAt: Date
}

const UserCompletedExerciseSchema: Schema = new Schema<IUserCompletedExercise>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: Exercise,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.UserCompletedExercise || model<IUserCompletedExercise>('UserCompletedExercise', UserCompletedExerciseSchema)
