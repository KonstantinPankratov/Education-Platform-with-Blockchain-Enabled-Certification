import mongoose, { Document, Schema, model } from "mongoose"
import Lecture from "./Lecture"

export interface IModule extends Document {
  name: string,
  slug: string,
  content: string,
  lectures: mongoose.Types.ObjectId[],
  order: number
}

export const ModuleSchema: Schema = new Schema({
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
  lectures: [{
    type: mongoose.Types.ObjectId,
    ref: Lecture
  }],
  order: {
    type: Number,
    default: 1
  }
})

export default mongoose.models.Module || model<IModule>('Module', ModuleSchema)
