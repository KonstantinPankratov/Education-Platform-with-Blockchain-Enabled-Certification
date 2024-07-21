import dbConnect from "@/db/dbConnect";
import Course from "@/db/models/Course";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(req: NextRequest, { params }: { params: { courseSlug: string, exerciseSlug: string }}) {
  try {
    const { courseSlug, exerciseSlug } = params

    const result = await Course.aggregate([
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
                        { $match: { slug: exerciseSlug } }
                      ]
                    }
                  },
                  { $unwind: "$exercises" }
                ]
              }
            },
            { $unwind: "$lectures" }
          ]
        }
      },
      { $unwind: "$modules" },
      { $match: { "modules.lectures.exercises.slug": exerciseSlug } },
      {
        $project: {
          course: {
            name: "$name",
            slug: "$slug"
          },
          module: "$modules",
          lecture: "$modules.lectures",
          exercise: "$modules.lectures.exercises",
        }
      }
    ])
  
    if (result.length === 0) {
      return NextResponse.json({ course: null, module: null, lecture: null, exercise: null })
    }
  
    return NextResponse.json(result[0])
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}