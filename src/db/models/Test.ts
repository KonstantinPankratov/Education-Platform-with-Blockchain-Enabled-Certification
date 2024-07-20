import mongoose, { Document, Schema, model } from "mongoose"

export interface ITest extends Document {
  exerciseId: mongoose.Types.ObjectId,
  input: string,
  output: string
}

export const TestSchema: Schema = new Schema<ITest>({
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
  }
})

export default mongoose.models.Test || model<ITest>('Test', TestSchema)
