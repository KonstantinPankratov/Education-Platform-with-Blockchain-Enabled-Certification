import dbConnect from "@/db/dbConnect"
import Course from "@/db/models/Course"
import IExtCourse from "@/types/IExtCourse"
import { NextRequest, NextResponse } from "next/server"

interface ParamsProps {
  params: { courseSlug: string }
}

export async function GET(req: NextRequest, { params }: ParamsProps): Promise<NextResponse<IExtCourse | null>> {
  await dbConnect()

  const { courseSlug } = params

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

  if (courses.length === 0)
    return NextResponse.json(null)

  return NextResponse.json(courses[0])
}