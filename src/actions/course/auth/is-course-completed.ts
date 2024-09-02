"use server"

import dbConnect from "@/db/dbConnect"
import Course from "@/db/models/Course"
import UserCourse from "@/db/models/UserCourse"
import { Types } from "mongoose"
import fetchAuthCourseBySlug from "./fetch-course-by-slug"

const isCourseCompleted = async (userId: string, courseId: string): Promise<boolean> => {
  await dbConnect()

  const userObjectId = new Types.ObjectId(userId)
  const courseObjectId = new Types.ObjectId(courseId)

  const enrollment = await UserCourse.findOne({ userId: userObjectId, courseId: courseObjectId })

  if (!enrollment) {
    return false
  }

  if (enrollment.completedAt) {
    return true
  }

  const course = await Course.findById(courseObjectId)

  if (!course) {
    return false
  }

  const ExtendedCourse = await fetchAuthCourseBySlug(userId, course.slug)

  if (!ExtendedCourse) {
    return false
  }

  if (!ExtendedCourse.isCompleted) {
    return false
  }

  enrollment.completedAt = new Date()
  enrollment.save()

  return true
}

export default isCourseCompleted