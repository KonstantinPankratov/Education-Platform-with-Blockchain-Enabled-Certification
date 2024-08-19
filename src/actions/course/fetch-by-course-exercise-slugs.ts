import { ICourse } from "@/db/models/Course"
import { IExercise } from "@/db/models/Exercise"
import { ILecture } from "@/db/models/Lecture"
import { IModule } from "@/db/models/Module"

interface ICourseModuleLectureExercise {
  course: ICourse | null
  module: IModule | null
  lecture: ILecture | null
  exercise: IExercise | null
  nextPartUrl: string | null
}

const fetchCourseModuleLectureExerciseBySlugs = async (courseSlug: string, exerciseSlug: string): Promise<ICourseModuleLectureExercise> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${courseSlug}/lecture/any/exercise/${exerciseSlug}`, {
    method: 'GET',
    next: {
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course, module, lecture, exercise')
  }

  return res.json()
}

export default fetchCourseModuleLectureExerciseBySlugs
