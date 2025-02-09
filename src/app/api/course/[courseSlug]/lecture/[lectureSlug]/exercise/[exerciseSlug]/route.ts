import fetchNextExerciseByExerciseId from "@/actions/course/auth/fetch-next-exercise-by-exercise-id";
import dbConnect from "@/db/dbConnect";
import Course from "@/db/models/Course";
import { getCoursePartLink } from "@/lib/helpers";
import ICourseModuleLectureExercise from "@/types/ICourseModuleLectureExercise";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { courseSlug: string, exerciseSlug: string } }): Promise<NextResponse<ICourseModuleLectureExercise>> {
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
    return NextResponse.json({ course: null, module: null, lecture: null, exercise: null, nextPartUrl: null })
  }

  const nextExercise = await fetchNextExerciseByExerciseId(result[0].exercise._id)
  const nextExerciseLink = nextExercise ? getCoursePartLink({ courseSlug: result[0].course.slug, exerciseSlug: nextExercise.slug }) : null

  return NextResponse.json({
    course: result[0].course,
    module: result[0].module,
    lecture: result[0].lecture,
    exercise: result[0].exercise,
    nextPartUrl: nextExerciseLink
  })
}