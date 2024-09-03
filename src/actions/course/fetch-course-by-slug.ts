import IExtCourse from "@/types/IExtCourse"

const fetchCourseBySlug = async (slug: string): Promise<IExtCourse | null> => {
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