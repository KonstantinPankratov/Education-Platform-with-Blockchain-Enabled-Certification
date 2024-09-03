import dbConnect from "@/db/dbConnect"
import Course from "@/db/models/Course"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  await dbConnect()

  const courses = await Course.aggregate([
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
                  }
                },
                { $sort: { order: 1 } },
              ]
            }
          },
          { $sort: { order: 1 } },
        ]
      }
    },
    { $sort: { order: 1 } },
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
      },
    }
  ])

  return NextResponse.json(courses)
}