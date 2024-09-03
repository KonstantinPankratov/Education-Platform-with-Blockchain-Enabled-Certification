import ICourseModuleLectureExercise from "@/types/ICourseModuleLectureExercise"

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
