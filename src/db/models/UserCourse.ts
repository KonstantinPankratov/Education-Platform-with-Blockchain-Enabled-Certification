import mongoose, { Document, Schema, Types, model } from "mongoose"

export interface IUserCourse extends Document {
  userId: Types.ObjectId
  courseId: Types.ObjectId
}

const UserCourseSchema: Schema = new Schema<IUserCourse>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  }
})

export default mongoose.models.UserCourse || model<IUserCourse>('UserCourse', UserCourseSchema)
