import Exercise, { IExercise } from "@/db/models/Exercise"

const fetchFirstExerciseByLectureId = async (lectureId: string): Promise<IExercise | null> => {
  return await Exercise.findOne({
    lectureId: lectureId
  }).sort({ order: 1 })
}

export default fetchFirstExerciseByLectureId