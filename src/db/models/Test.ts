import mongoose, { Document, Schema, Types, model } from "mongoose"

export interface ITest extends Document {
  _id: Types.ObjectId
  exerciseId: mongoose.Types.ObjectId
  input: string
  output: string
  errorMsg: string
}

const TestSchema: Schema = new Schema<ITest>({
  exerciseId: {
    type: Schema.Types.ObjectId,
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

export default mongoose.models.Test || model<ITest>('Test', TestSchema)
