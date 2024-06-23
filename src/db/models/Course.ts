import mongoose, { Document, Schema, model } from "mongoose"
import dbConnect from "@/db/dbConnect"
import Module from "./Module"

export interface ICourse extends Document {
  name: string,
  content: string,
  slug: string,
  modules: mongoose.Types.ObjectId[]
}

const CourseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Module
  }]
})

export default mongoose.models.Course || model<ICourse>('Course', CourseSchema)
