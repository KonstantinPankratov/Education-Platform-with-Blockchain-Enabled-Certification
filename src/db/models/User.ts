import mongoose, { Document, Schema, model } from "mongoose"
import Course from "./Course"
import Lecture from "./Lecture"
import Exercise from "./Exercise"
import { string } from "zod"

export interface IUser extends Document {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  enrolled_courses: [{
    course_id: mongoose.Types.ObjectId,
    completed_lectures: mongoose.Types.ObjectId[],
    completed_exercises: mongoose.Types.ObjectId[],
  }]
}

export const UserSchema: Schema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  completed_courses: {
    course_id: {
      type: Schema.Types.ObjectId,
      ref: Course
    },
    completed_lectures: [{
      type: Schema.Types.ObjectId,
      ref: Lecture,
    }],
    completed_exercises: [{
      type: Schema.Types.ObjectId,
      ref: Exercise,
    }]
  }
})

export default mongoose.models.User || model<IUser>('User', UserSchema)
