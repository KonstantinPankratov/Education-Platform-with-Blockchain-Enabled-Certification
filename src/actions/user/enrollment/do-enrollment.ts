"use server"

import dbConnect from "@/db/dbConnect"
import User from "@/db/models/auth/User"
import UserCourse from "@/db/models/UserCourse"
import { Types } from "mongoose"

const doEnrollment = async (useId: string, courseId: string) => {
  try {
    await dbConnect()

    const courseObjectId = new Types.ObjectId(courseId)
    const userObjectId = new Types.ObjectId(useId)

    const user = await User.exists({ _id: userObjectId })

    if (!user)
      throw new Error("Oops, an error occured, please try again later")

    const enrollment = await UserCourse.findOne({ userId: userObjectId, courseId: courseObjectId })

    if (enrollment)
      throw new Error("You are already enrolled in this course")

    const newEnrollment = new UserCourse({ userId: userObjectId, courseId: courseObjectId })

    await newEnrollment.save()

    return { message: "You have successfully enrolled in the course" }
  } catch (error) {
    throw error
  }
}

export default doEnrollment