import mongoose, { Document, Schema, model } from "mongoose"

export interface ITest extends Document {
  input: string,
  output: string
}

export const TestSchema: Schema = new Schema({
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
