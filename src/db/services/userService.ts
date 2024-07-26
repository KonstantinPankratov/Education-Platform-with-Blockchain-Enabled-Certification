import { Types } from "mongoose";

export async function getUserEnrollments(userId: Types.ObjectId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/enrollment`, {
    next: {
      tags: ['userEnrollments'],
      revalidate: 3600
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch enrollment courses')
  }

  return res.json()
}

export async function isUserEnrolled(userId: Types.ObjectId, courseId: Types.ObjectId): Promise<boolean> {
  const userEnrollments = await getUserEnrollments(userId);
  return userEnrollments.includes(courseId)
}

export async function enrollUser(userId: Types.ObjectId, courseId: Types.ObjectId): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/enrollment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'userId': userId,
      'courseId': courseId
    })
  })
}

// export function isUserHasAccessToLecture (user: { enrolledCourses: [] }, lectureId: string) {
//   return user?.enrolledCourses.includes(lectureId)
// }

// export function isUserHasAccessToExercise (user: { enrolledCourses: [] }, ExerciseId: string) {
//   return user?.enrolledCourses.includes(ExerciseId)
// }