import dbConnect from "@/db/dbConnect";
import Course from "@/db/models/Course";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    // const pipeline = [
    //   {
    //     $lookup: {
    //       from: "modules",
    //       localField: "_id",
    //       foreignField: "courseId",
    //       as: "modules"
    //     }
    //   }, {
    //     $unwind: {
    //       path: "$modules",
    //       preserveNullAndEmptyArrays: true
    //     }
    //   }, {
    //     $lookup: {
    //         from: "lectures",
    //         localField: "modules._id",
    //         foreignField: "moduleId",
    //         as: "modules.lectures"
    //     }
    //   }, {
    //     $group: {
    //       _id: "$_id",
    //       name: { $first: "$name" },
    //       content: { $first: "$content" },
    //       slug: { $first: "$slug" },
    //       modules: { $push: "$modules" }
    //     }
    //   }
    // ]

    const pipeline = [
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
                  
                ]

              }
            }
          ]

        }
      }
    ]

    const courses = await Course.aggregate(pipeline)

    return NextResponse.json(courses)
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    })
  }
}