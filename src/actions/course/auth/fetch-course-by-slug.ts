import { IAuthCourse } from "@/db/models/Course"

const fetchAuthCourseBySlug = async (userId: string, slug: string): Promise<IAuthCourse | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${slug}/user/${userId}`, {
    method: 'GET',
    next: {
      revalidate: 0
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course')
  }

  return res.json()
}

export default fetchAuthCourseBySlug