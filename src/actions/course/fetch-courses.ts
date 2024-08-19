import { ICourse } from "@/db/models/Course"

const fetchCourses = async (): Promise<ICourse[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`, {
    method: 'GET',
    next: {
      revalidate: 3600
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch courses')
  }

  return res.json()
}

export default fetchCourses