import { ICourse } from "@/db/models/Course"
import { ILecture } from "@/db/models/Lecture"
import { IModule } from "@/db/models/Module"

interface ICourseModuleLecture {
  course: ICourse | null
  module: IModule | null
  lecture: ILecture | null
  nextPartUrl: string | null
}

const fetchLectureData = async (courseSlug: string, lectureSlug: string): Promise<ICourseModuleLecture> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${courseSlug}/lecture/${lectureSlug}`, {
    method: 'GET',
    next: {
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course, module, lecture')
  }

  return res.json()
}

export default fetchLectureData