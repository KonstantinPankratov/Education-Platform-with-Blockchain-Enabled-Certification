"use server"

import dbConnect from "@/db/dbConnect"
import Exercise from "@/db/models/Exercise";
import { ILecture } from "@/db/models/Lecture";
import { IModule } from "@/db/models/Module";
import { Types } from "mongoose";

const fetchCourseByExerciseId = async (exerciseId: string): Promise<string | undefined> => {
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

    if (!exercise) {
      throw new Error('Invalid exercise ID')
    }

    const lecture = exercise.lectureId as unknown as ILecture
    const mod = lecture.moduleId as unknown as IModule

    return mod.courseId as unknown as string
  } catch (error: any) {
    console.error(error)
  }
}

export default fetchCourseByExerciseId