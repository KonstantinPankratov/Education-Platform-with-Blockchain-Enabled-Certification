import dbConnect from "@/db/dbConnect";
import Course from "@/db/models/Course";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(req: NextRequest, { params }: { params: { courseSlug: string }}) {
  try {
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
                      as: "exercises"
                    }
                  },
                  { $sort: { order: 1 } },
                  {
                    $addFields: {
                      exerciseCount: { $size: "$exercises" }
                    }
                  }
                ]
              }
            },
            { $sort: { order: 1 } },
            {
              $addFields: {
                lectureCount: { $size: "$lectures" },
                exerciseCount: { $sum: "$lectures.exerciseCount" }
              }
            }
          ]
        }
      },
      { $sort: { order: 1 } },
      {
        $addFields: {
          moduleCount: { $size: "$modules" },
          lectureCount: { $sum: "$modules.lectureCount" },
          exerciseCount: { $sum: "$modules.exerciseCount" }
        }
      }
    ])

    return NextResponse.json(courses[0] || null)
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}