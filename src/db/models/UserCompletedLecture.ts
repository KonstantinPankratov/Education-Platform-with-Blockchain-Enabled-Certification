import mongoose, { Document, Schema, Types, model } from "mongoose"
import User from "./auth/User"
import Lecture from "./Lecture"

export interface IUserCompletedLecture extends Document {
  userId: Types.ObjectId
  lectureId: Types.ObjectId,
  completedAt: Date
}

const UserCompletedLectureSchema: Schema = new Schema<IUserCompletedLecture>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  lectureId: {
    type: Schema.Types.ObjectId,
    ref: Lecture,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.UserCompletedLecture || model<IUserCompletedLecture>('UserCompletedLecture', UserCompletedLectureSchema)
