import mongoose, { Document, Schema, Types, model } from "mongoose"
import { ITest } from "./Test"

export interface IUserSolution extends Document {
  userId: Types.ObjectId
  exerciseId: Types.ObjectId
  failedTestId: Types.ObjectId | ITest | null
  content: string
}

const UserSolutionSchema: Schema = new Schema<IUserSolution>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  failedTestId: {
    type: Schema.Types.ObjectId,
    ref: 'Test',
    default: null
  },
  content: {
    type: Schema.Types.String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.models.UserSolution || model<IUserSolution>('UserSolution', UserSolutionSchema)
