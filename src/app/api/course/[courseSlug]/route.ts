import dbConnect from "@/db/dbConnect"
import Course from "@/db/models/Course"
import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

dbConnect()

interface ParamsProps {
  params: { courseSlug: string }
}
interface RequestBody {
  userId: string
}

export async function POST(req: NextRequest, { params }: ParamsProps) {
  try {
    const { courseSlug } = params

    const body: RequestBody = await req.json()
    const userId = body.userId ? new Types.ObjectId(body.userId) : null

    const courses = await Course.aggregate([
      { $match: { slug: courseSlug } },
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
                  }
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

    return NextResponse.json(courses[0] || null)
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}