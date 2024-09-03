import mongoose from "mongoose"

export interface IUserCourse extends mongoose.Document {
  userId: mongoose.Types.ObjectId
  courseId: mongoose.Types.ObjectId
  completedAt: Date
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
  }
}, {
  timestamps: true
})

const UserCourseModel: mongoose.Model<IUserCourse> = mongoose.models.UserCourse
export default UserCourseModel || mongoose.model<IUserCourse>("UserCourse", UserCourseSchema)