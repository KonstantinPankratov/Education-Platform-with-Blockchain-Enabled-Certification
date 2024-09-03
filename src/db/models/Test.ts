import mongoose from "mongoose"

export interface ITest extends Document {
  _id: string
  exerciseId: mongoose.Types.ObjectId
  input: string
  output: string
  errorMsg: string
}

const TestSchema: mongoose.Schema = new mongoose.Schema<ITest>({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  errorMsg: {
    type: String,
    required: true
  }
})

const TestModel: mongoose.Model<ITest> = mongoose.models.Test
export default TestModel || mongoose.model<ITest>("Test", TestSchema)