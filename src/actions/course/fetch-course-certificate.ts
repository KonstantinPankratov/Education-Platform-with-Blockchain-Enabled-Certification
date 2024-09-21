"use server"

import { IUser } from "@/db/models/auth/User";
import { ICourse } from "@/db/models/Course";
import UserCourse, { IUserCourse } from "@/db/models/UserCourse"

interface IPopulatedUserCourse extends IUserCourse {
  userId: IUser;
  courseId: ICourse;
}

const fetchCourseCertificate = async (tonAddress: string) => {
  const enrollement = await UserCourse.findOne({ certificateTonAddress: tonAddress })
    .populate('userId courseId') as IPopulatedUserCourse
  return enrollement
}

export default fetchCourseCertificate