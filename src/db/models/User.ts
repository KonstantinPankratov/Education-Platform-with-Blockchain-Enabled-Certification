import mongoose, { Document, Schema, model } from "mongoose"
import Course from "./Course"
import Lecture from "./Lecture"
import Exercise from "./Exercise"

export interface IUser extends Document {
  first_name: string,
  second_name: string,
  email: string,
  enrolled_courses: [{
    course_id: mongoose.Types.ObjectId,
    completed_lectures: mongoose.Types.ObjectId[],
    completed_exercises: mongoose.Types.ObjectId[],
  }]
}

export const UserSchema: Schema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  second_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
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
