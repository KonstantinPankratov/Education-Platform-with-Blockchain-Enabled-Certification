import { Types } from "mongoose"
import dbConnect from "../dbConnect"
import { ICourse } from "../models/Course"
import UserCourse from "../models/UserCourse"
import UserSolution from "../models/UserSolution"

interface IUserEnrollment extends ICourse {
  moduleCount: number,
  lectureCount: number,
  exerciseCount: number,
  completedExerciseCount: number,
  isCompleted: boolean,
  enrolledAt: string,
  progress: number
}

export async function getUserEnrollments(userId: string): Promise<IUserEnrollment[]> {
  await dbConnect()

  const courses = await UserCourse.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $sort: { createdAt: -1 }
    },
    { $unwind: '$course' },
    {
      $addFields: {
        'course.enrolledAt': {
          $dateToString: {
            format: '%b %d, %Y',
            date: '$createdAt',
          },
        },
      },
    },
    { $replaceRoot: { newRoot: '$course' } },
    {
      $lookup: {
        from: "modules",
        localField: "_id",
        foreignField: "courseId",
        as: "modules",
        pipeline: [
          {
            $lookup: {
              from: "lectures",
              localField: "_id",
              foreignField: "moduleId",
              as: "lectures",
              pipeline: [
                {
                  $lookup: {
                    from: "exercises",
                    localField: "_id",
                    foreignField: "lectureId",
                    as: "exercises",
                    pipeline: [
                      {
                        $lookup: {
                          from: 'usersolutions',
                          localField: '_id',
                          foreignField: 'exerciseId',
                          as: 'usersolutions',
                          pipeline: [
                            {
                              $match: {
                                userId: userId,
                                failedTestIds: { $size: 0 },
                              },
                            },
                          ],
                        }
                      }, {
                        $addFields: {
                          isCompleted: { $gt: [{ $size: '$usersolutions' }, 0] },
                        }
                      }
                    ]
                  }
                },
                { $sort: { order: 1 } },
                {
                  $addFields: {
                    isCompleted: { $allElementsTrue: ['$exercises.isCompleted'] },
                  },
                },
                {
                  $addFields: {
                    isAccessible: true,
                  },
                },
              ]
            }
          },
          { $sort: { order: 1 } },
          {
            $addFields: {
              isCompleted: { $allElementsTrue: ['$lectures.isCompleted'] },
            },
          }
        ]
      }
    },
    { $sort: { order: 1 } },
    {
      $addFields: {
        isCompleted: { $allElementsTrue: ['$modules.isCompleted'] },
      },
    },
    {
      $addFields: {
        moduleCount: { $sum: { $size: '$modules' } },
        lectureCount: {
          $sum: {
            $map: {
              input: '$modules',
              as: 'module',
              in: {
                $sum: { $size: '$$module.lectures' }
              },
            },
          }
        },
        exerciseCount: {
          $sum: {
            $map: {
              input: '$modules',
              as: 'module',
              in: {
                $sum: {
                  $map: {
                    input: '$$module.lectures',
                    as: 'lecture',
                    in: {
                      $sum: { $size: '$$lecture.exercises' },
                    },
                  },
                },
              },
            },
          },
        },
        completedExerciseCount: {
          $sum: {
            $map: {
              input: '$modules',
              as: 'module',
              in: {
                $sum: {
                  $map: {
                    input: '$$module.lectures',
                    as: 'lecture',
                    in: {
                      $sum: {
                        $map: {
                          input: '$$lecture.exercises',
                          as: 'exercise',
                          in: { $cond: ['$isCompleted', 1, 0] },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        progress: {
          $ceil: {
            $multiply: [
              {
                $cond: {
                  if: { $eq: ['$exerciseCount', 0] },
                  then: 0,
                  else: { $divide: ['$completedExerciseCount', '$exerciseCount'] }
                }
              },
              100
            ]
          }
        },
      },
    }
  ])

  return JSON.parse(JSON.stringify(courses))
}

export async function getUserLastSolution(userId: string): Promise<ICourse[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/enrollment`, {
    next: {
      tags: ['userEnrollments'],
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch enrollment courses')
  }

  return res.json()
}

export async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  const userEnrollments = await getUserEnrollments(userId)
  return userEnrollments.some(course => course._id === courseId)
}

export async function enrollUser(userId: string, courseId: string): Promise<Response> {
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