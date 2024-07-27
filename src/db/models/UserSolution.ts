import mongoose from "mongoose"
import { ITest } from "./Test"

export interface IUserSolution extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  exerciseId: mongoose.Types.ObjectId
  failedTestIds: mongoose.Types.ObjectId[] | ITest[]
  content: string
}

const UserSolutionSchema: mongoose.Schema = new mongoose.Schema<IUserSolution>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  failedTestIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    default: null
  }],
  content: {
    type: mongoose.Schema.Types.String
  }
}, {
  timestamps: true
})

const UserSolutionModel: mongoose.Model<IUserSolution> = mongoose.models.UserSolution
export default UserSolutionModel || mongoose.model<IUserSolution>("UserSolution", UserSolutionSchema)