"use server"

import dbConnect from "@/db/dbConnect"
import Exercise from "@/db/models/Exercise";
import { Types } from "mongoose";

const fetchCourseByExerciseId = async (exerciseId: string): Promise<string> => {
  try {
    await dbConnect()

    const exerciseObjectId = new Types.ObjectId(exerciseId)

    const exercise = await Exercise.findById(exerciseObjectId).populate({
      path: 'lectureId',
      populate: {
        path: 'moduleId',
        populate: {
          path: 'courseId'
        }
      }
    })

    return exercise?.lectureId.moduleId.courseId
  } catch (error: any) {
    console.error(error)
  }
}

export default fetchCourseByExerciseId