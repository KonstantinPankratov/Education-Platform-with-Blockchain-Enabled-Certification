import dbConnect from "@/db/dbConnect";
import Course, { ICourse } from "@/db/models/Course";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: {
    courseSlug: string,
    userId: string
  }
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  try {
    const { courseSlug, userId } = params

    await dbConnect()

    const userObjectid = new Types.ObjectId(userId)

    const courses: ICourse[] = await Course.aggregate([
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
                                  userId: userObjectid,
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
      },
    ])

    if (!courses.length)
      return null

    const course = courses[0]

    if (course.modules) { // TODO rework using pipeline
      let isLastAccessible = false
      for (const m of course.modules) {
        if (m.lectures) {
          for (const l of m.lectures) {
            l.isAccessible = true
            if (!l.isCompleted) {
              isLastAccessible = true
              break
            }
            if (l.exercises) {
              for (const e of l.exercises) {
                e.isAccessible = true
                if (!e.isCompleted) {
                  isLastAccessible = true
                  break
                }
              }
            }
          }
        }
        if (isLastAccessible) {
          break
        }
      }
    }

    return NextResponse.json(course)
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}