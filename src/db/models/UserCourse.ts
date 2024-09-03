import mongoose from "mongoose"

export interface IUserCourse extends mongoose.Document {
  userId: string
  courseId: string
  completedAt: Date
}

const UserCourseSchema: mongoose.Schema = new mongoose.Schema<IUserCourse>({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    ref: 'Course',
    required: true
  },
  completedAt: {
    type: mongoose.Schema.Types.Date
  }
}, {
  timestamps: true
})

const UserCourseModel: mongoose.Model<IUserCourse> = mongoose.models.UserCourse
export default UserCourseModel || mongoose.model<IUserCourse>("UserCourse", UserCourseSchema)