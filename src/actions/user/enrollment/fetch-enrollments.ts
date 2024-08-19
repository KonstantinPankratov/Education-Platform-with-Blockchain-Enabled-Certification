"use server"

import dbConnect from "@/db/dbConnect"
import { ICourse } from "@/db/models/Course"
import UserCourse from "@/db/models/UserCourse"
import { Types } from "mongoose"

interface IUserEnrollment extends ICourse {
  moduleCount: number,
  lectureCount: number,
  exerciseCount: number,
  completedExerciseCount: number,
  isCompleted: boolean,
  enrolledAt: string,
  progress: number
}

const fetchUserEnrollments = async (userId: string): Promise<IUserEnrollment[]> => {
  try {
    const userObjectId = new Types.ObjectId(userId)

    await dbConnect()

    const courses = await UserCourse.aggregate([
      { $match: { userId: userObjectId } },
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
                                  userId: userObjectId,
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
  } catch (error) {
    throw error
  }
}

export default fetchUserEnrollments