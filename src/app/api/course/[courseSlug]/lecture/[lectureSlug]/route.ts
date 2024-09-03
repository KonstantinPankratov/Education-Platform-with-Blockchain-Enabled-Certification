import fetchNextModulePartLink from "@/actions/course/fetch-next-module-part";
import dbConnect from "@/db/dbConnect";
import Course from "@/db/models/Course";
import ICourseModuleLecture from "@/types/ICourseModuleLecture";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { courseSlug: string, lectureSlug: string } }): Promise<NextResponse<ICourseModuleLecture | null>> {
  await dbConnect()

  const { courseSlug, lectureSlug } = params

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
                { $match: { slug: lectureSlug } },
                {
                  $lookup: {
                    from: "exercises",
                    localField: "_id",
                    foreignField: "lectureId",
                    as: "exercises"
                  }
                }
              ]
            }
          },
          { $unwind: "$lectures" }
        ]
      }
    },
    { $unwind: "$modules" },
    { $match: { "modules.lectures.slug": lectureSlug } },
    {
      $project: {
        course: {
          _id: "$_id",
          name: "$name",
          slug: "$slug"
        },
        module: "$modules",
        lecture: "$modules.lectures"
      }
    }
  ])

  if (result.length === 0) {
    return NextResponse.json({ course: null, module: null, lecture: null, nextPartUrl: null })
  }

  return NextResponse.json({
    course: result[0].course,
    module: result[0].module,
    lecture: result[0].lecture,
    nextPartUrl: await fetchNextModulePartLink({ courseSlug: result[0].course.slug, lectureId: result[0].lecture._id })
  })
}