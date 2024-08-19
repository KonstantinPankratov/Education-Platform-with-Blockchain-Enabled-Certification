import { ICourse } from "@/db/models/Course"

const fetchCourseBySlug = async (slug: string): Promise<ICourse | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${slug}`, {
    method: 'GET',
    next: {
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course')
  }

  return res.json()
}

export default fetchCourseBySlug