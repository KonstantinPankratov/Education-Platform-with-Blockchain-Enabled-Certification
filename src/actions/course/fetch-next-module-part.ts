"use server"

import dbConnect from "@/db/dbConnect"
import Exercise, { IExercise } from "@/db/models/Exercise"
import Lecture, { ILecture } from "@/db/models/Lecture"
import { getCoursePartLink } from "@/lib/helpers"

interface NextModulePartLinkProps {
  courseSlug: string,
  lectureId: string,
  exerciseId?: string
}

const fetchNextModulePartLink = async ({ courseSlug, lectureId, exerciseId }: NextModulePartLinkProps): Promise<string | null> => {
  const nextPart = await fetchNextModulePart({ lectureId, exerciseId })

  if (nextPart instanceof Exercise) {
    return getCoursePartLink({ courseSlug: courseSlug, exerciseSlug: nextPart.slug })
  }

  if (nextPart instanceof Lecture) {
    return getCoursePartLink({ courseSlug: courseSlug, lectureSlug: nextPart.slug })
  }

  return null  // Module is completed
}

interface NextModulePartProps {
  lectureId: string,
  exerciseId?: string
}

export const fetchNextModulePart = async ({ lectureId, exerciseId }: NextModulePartProps): Promise<IExercise | ILecture | null> => {
  try {
    await dbConnect()

    if (exerciseId) {
      const nextExercise = await getNextExercise(lectureId, exerciseId)

      if (nextExercise) {
        return nextExercise
      }
    } else {
      const firstExercise = await getFirstExercise(lectureId)

      if (firstExercise) {
        return firstExercise
      }
    }

    return await getNextLecture(lectureId)
  } catch (error) {
    throw error
  }
}

const getNextLecture = async (lectureId: string): Promise<ILecture | null> => {
  const currentLecture = await Lecture.findById(lectureId)

  if (!currentLecture)
    throw new Error('Invalid lecture ID')

  return await Lecture.findOne({
    moduleId: currentLecture.moduleId,
    order: { $gt: currentLecture.order },
  }).sort({ order: 1 })
}

const getNextExercise = async (lectureId: string, exerciseId: string): Promise<IExercise | null> => {
  const currentExercise = await Exercise.findById(exerciseId)

  if (!currentExercise)
    throw new Error('Invalid exercise ID')

  const nextExercise = await Exercise.findOne({
    lectureId: lectureId,
    order: { $gt: currentExercise.order },
  }).sort({ order: 1 })

  return nextExercise
}

const getFirstExercise = async (lectureId: string): Promise<IExercise | null> => {
  return await Exercise.findOne({
    lectureId: lectureId
  }).sort({ order: 1 })
}

export default fetchNextModulePartLink