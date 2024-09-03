import mongoose from "mongoose"
import { ITest } from "./Test"

export interface IUserSolution extends mongoose.Document {
  userId: string
  exerciseId: string
  failedTestIds: string[] | ITest[]
  content: string
}

const UserSolutionSchema: mongoose.Schema = new mongoose.Schema<IUserSolution>({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  exerciseId: {
    type: String,
    ref: 'Exercise',
    required: true
  },
  failedTestIds: [{
    type: String,
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