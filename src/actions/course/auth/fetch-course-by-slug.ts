import { ICourse } from "@/db/models/Course"

interface IAuthExtCourse extends ICourse {
  isCompleted: boolean
  lectureCount: number
  exerciseCount: number
  progress: undefined
}

const fetchAuthCourseBySlug = async (userId: string, slug: string): Promise<IAuthExtCourse | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${slug}/user/${userId}`, {
    method: 'GET',
    next: {
      revalidate: 3600,
      tags: ['auth-course']
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course')
  }

  return res.json()
}

export default fetchAuthCourseBySlug