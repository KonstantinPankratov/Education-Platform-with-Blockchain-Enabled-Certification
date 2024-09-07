import Exercise, { IExercise } from "@/db/models/Exercise"

const fetchNextExerciseByExerciseId = async (exerciseId: string): Promise<IExercise | null> => {
  const currentExercise = await Exercise.findById(exerciseId)

  if (!currentExercise)
    throw new Error('Invalid exercise ID')

  const nextExercise = await Exercise.findOne({
    lectureId: currentExercise.lectureId,
    order: { $gt: currentExercise.order },
  }).sort({ order: 1 })

  return nextExercise
}

export default fetchNextExerciseByExerciseId