import mongoose from "mongoose"
import { ICourse } from "./Course"
import { IUser } from "./auth/User"

export interface IUserCourse extends mongoose.Document {
  userId: mongoose.Types.ObjectId | IUser
  courseId: mongoose.Types.ObjectId | ICourse
  completedAt: Date
  certificateTonAddress: string
  certificateRequestedAt: Date
  certificateIssuedAt: Date
}

const UserCourseSchema: mongoose.Schema = new mongoose.Schema<IUserCourse>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedAt: {
    type: mongoose.Schema.Types.Date
  },
  certificateTonAddress: {
    type: String
  },
  certificateRequestedAt: {
    type: mongoose.Schema.Types.Date
  },
  certificateIssuedAt: {
    type: mongoose.Schema.Types.Date
  }
}, {
  timestamps: true
})

const UserCourseModel: mongoose.Model<IUserCourse> = mongoose.models.UserCourse
export default UserCourseModel || mongoose.model<IUserCourse>("UserCourse", UserCourseSchema)