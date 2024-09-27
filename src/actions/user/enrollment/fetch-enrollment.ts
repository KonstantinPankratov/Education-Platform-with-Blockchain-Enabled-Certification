"use server"

import dbConnect from "@/db/dbConnect"
import UserCourse, { IUserCourse } from "@/db/models/UserCourse"
import { Types } from "mongoose"

const fetchUserEnrollment = async (userId: string, courseId: string): Promise<IUserCourse | null> => {
  await dbConnect()

  const userObjectId = new Types.ObjectId(userId)
  const courseObjectId = new Types.ObjectId(courseId)

  return JSON.parse(JSON.stringify(await UserCourse.findOne({ userId: userObjectId, courseId: courseObjectId })))
}

export default fetchUserEnrollment