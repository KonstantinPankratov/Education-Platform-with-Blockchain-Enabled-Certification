import fetchUserEnrollments from "./fetch-enrollments"

const isUserEnrolled = async (userId: string, courseId: string): Promise<boolean> => {
  const userEnrollments = await fetchUserEnrollments(userId)
  return userEnrollments.some(course => course._id === courseId)
}

export default isUserEnrolled