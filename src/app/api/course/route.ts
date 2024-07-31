import dbConnect from "@/db/dbConnect";
import Course from "@/db/models/Course";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
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
                      as: "exercises"
                    }
                  },
                  { $sort: { order: 1 } }
                ]
              }
            },
            { $sort: { order: 1 } }
          ]
        }
      },
      { $sort: { order: 1 } },
    ])

    return NextResponse.json(courses)
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}