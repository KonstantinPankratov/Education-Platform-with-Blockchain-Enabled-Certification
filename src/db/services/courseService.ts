import dbConnect from "../dbConnect"
import Course, { ICourse } from "../models/Course"
import { IExercise } from "../models/Exercise"
import { ILecture } from "../models/Lecture"
import { IModule } from "../models/Module"

/**
 * Returns courses
 * @param upToLevel
 * @returns ICourse[]
 */

type courseLevels = 'modules' | 'lectures'

export async function getCourses(upToLevel?: courseLevels): Promise<ICourse[]> {
  await dbConnect()

  let pipeline = []
  let projection = {
    _id: 1,
    name: 1,
    slug: 1,
    content: 1
  }

  if (upToLevel === "modules" || upToLevel === "lectures") {
    pipeline.push({
      $lookup: {
        from: "modules",
        localField: "_id",
        foreignField: "courseId",
        as: "modules"
      }
    })
    projection.modules = 1
  }

  if (upToLevel === "lectures") {
    pipeline.push({
      $unwind: {
        path: "$modules",
        preserveNullAndEmptyArrays: true
      }
    })
    pipeline.push({
      $lookup: {
        from: "lectures",
        localField: "modules._id",
        foreignField: "moduleId",
        as: "modules.lectures"
      }
    })
    pipeline.push({
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        modules: { $push: "$modules" }
      }
    })
  }

  pipeline.push({
    $project: projection
  })

  return await Course.aggregate(pipeline)
}

/**
 * Returns course by slug
 * @param slug 
 * @returns ICourse | null
 */

export async function getCourseBySlug(slug: string): Promise<ICourse | null> {
  await dbConnect()

  const courses = await Course.aggregate([
    { $match: { slug: slug } },
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

  return courses[0] || null
}

/**
 * Returns { course, module, lecture } by course and lecture slugs
 * @param courseSlug 
 * @param lectureSlug 
 * @returns ICourseModuleLectureExercise
 */

interface ICourseModuleLecture {
  course: ICourse | null
  module: IModule | null
  lecture: ILecture | null
}

export async function getCourseModuleLectureBySlugs(courseSlug: string, lectureSlug: string): Promise<ICourseModuleLecture> {
  await dbConnect()

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
          name: "$name",
          slug: "$slug"
        },
        module: "$modules",
        lecture: "$modules.lectures"
      }
    }
  ])

  if (result.length === 0) {
    return { course: null, module: null, lecture: null }
  }

  return result[0]
}

/**
 * Returns { course, module, lecture, exercise } by course and exercise slugs
 * @param courseSlug 
 * @param exerciseSlug 
 * @returns ICourseModuleLectureExercise
 */

interface ICourseModuleLectureExercise {
  course: ICourse | null
  module: IModule | null
  lecture: ILecture | null
  exercise: IExercise | null
}

export async function getCourseModuleLectureExerciseBySlugs(courseSlug: string, exerciseSlug: string): Promise<ICourseModuleLectureExercise> {
  await dbConnect()

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
    return { course: null, module: null, lecture: null, exercise: null }
  }

  return result[0]
}

