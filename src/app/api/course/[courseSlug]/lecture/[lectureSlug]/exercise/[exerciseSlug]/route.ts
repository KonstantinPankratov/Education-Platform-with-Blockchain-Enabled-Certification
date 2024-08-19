import fetchNextModulePartLink from "@/actions/course/fetch-next-module-part";
import dbConnect from "@/db/dbConnect";
import Course from "@/db/models/Course";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { courseSlug: string, exerciseSlug: string } }) {
  try {
    await dbConnect()

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
                        { $match: { slug: exerciseSlug } },
                        {
                          $lookup: {
                            from: "tests",
                            localField: "_id",
                            foreignField: "exerciseId",
                            as: "tests",
                            pipeline: [
                              { $sort: { order: 1 } }
                            ]
                          }
                        }
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
            _id: "$_id",
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

    return NextResponse.json({
      course: result[0].course,
      module: result[0].module,
      lecture: result[0].lecture,
      exercise: result[0].exercise,
      nextPartUrl: await fetchNextModulePartLink({ courseSlug: result[0].course.slug, lectureId: result[0].lecture._id, exerciseId: result[0].exercise._id })
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}