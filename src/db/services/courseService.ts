import dbConnect from "../dbConnect"
import Course, { ICourse } from "../models/Course"
import { IExercise } from "../models/Exercise"
import { ILecture } from "../models/Lecture"
import { IModule } from "../models/Module"

interface PopulateOption {
  path: string
  select?: string
  match?: any
  options?: any
  populate?: PopulateOption
}

interface GetCourseOptions {
  populate?: PopulateOption[]
  sort?: any
}

export async function getCourses(
  options: GetCourseOptions = {}
): Promise<ICourse[]> {
  await dbConnect()

  let query = Course.find({})

  if (options.sort) {
    query = query.sort(options.sort)
  }

  if (options.populate) {
    options.populate.forEach((populateOption) => {
      query = query.populate(populateOption)
    })
  }
  
  return await query.exec()
}

export async function getCourseBySlug(
  slug: string,
  options: GetCourseOptions = {}
): Promise<ICourse | null> {
  await dbConnect()

  let query = Course.findOne({ slug: slug })

  if (options.sort) {
    query = query.sort(options.sort)
  }

  if (options.populate) {
    options.populate.forEach((populateOption) => {
      query = query.populate(populateOption)
    })
  }

  return await query.exec()
}

/**
 * Returns { course, module, lecture } by course and lecture slugs
 * @param courseSlug 
 * @param lectureSlug 
 * @returns object
 */
export async function getCourseModuleLectureBySlugs (
  courseSlug: string,
  lectureSlug: string
): Promise<{
  course: ICourse | null,
  module: IModule | null,
  lecture: ILecture | null
}> {
  await dbConnect()

  const result = await Course.aggregate([
    { $match: { slug: courseSlug } },
    {
      $lookup: {
        from: 'modules',
        localField: 'modules',
        foreignField: '_id',
        as: 'modules'
      }
    },
    { $unwind: '$modules' },
    {
      $lookup: {
        from: 'lectures',
        localField: 'modules.lectures',
        foreignField: '_id',
        as: 'modules.lectures'
      }
    },
    { $unwind: '$modules.lectures' },
    { $match: { 'modules.lectures.slug': lectureSlug } },
    {
        $project: {
          'course._id': '$_id',
          'course.slug': '$slug',
          'course.name': '$name',

          'module._id': '$modules._id',
          'module.order': '$modules.order',
          'module.name': '$modules.name',
          'module.slug': '$modules.slug',
          'module.description': '$modules.description',

          'lecture._id': '$modules.lectures._id',
          'lecture.slug': '$modules.lectures.slug',
          'lecture.name': '$modules.lectures.name',
          'lecture.content': '$modules.lectures.content'
        }
    }
  ]).exec()

  if (result.length === 0) {
    return { course: null, module: null, lecture: null }
  }

  return result[0]
}

export async function getCourseModuleLectureExerciseBySlugs(
  courseSlug: string,
  exerciseSlug: string
): Promise<{
  course: ICourse | null,
  module: IModule | null,
  lecture: ILecture | null,
  exercise: IExercise | null
}> {
  await dbConnect()

  const result = await Course.aggregate([
    { $match: { slug: courseSlug } },
    {
      $lookup: {
        from: 'modules',
        localField: 'modules',
        foreignField: '_id',
        as: 'modules'
      }
    },
    { $unwind: '$modules' },
    {
      $lookup: {
        from: 'lectures',
        localField: 'modules.lectures',
        foreignField: '_id',
        as: 'modules.lectures'
      }
    },
    { $unwind: '$modules.lectures' },
    {
      $lookup: {
        from: 'exercises',
        localField: 'modules.lectures.exercises',
        foreignField: '_id',
        as: 'modules.lectures.exercises'
      }
    },
    { $unwind: '$modules.lectures.exercises' },
    { $match: { 'modules.lectures.exercises.slug': exerciseSlug } },
    {
        $project: {
          'course._id': '$_id',
          'course.slug': '$slug',
          'course.name': '$name',

          'module._id': '$modules._id',
          'module.order': '$modules.order',
          'module.name': '$modules.name',
          'module.slug': '$modules.slug',
          'module.description': '$modules.description',

          'lecture._id': '$modules.lectures._id',
          'lecture.slug': '$modules.lectures.slug',
          'lecture.name': '$modules.lectures.name',
          'lecture.content': '$modules.lectures.content',

          'exercise' : '$modules.lectures.exercises'
        }
    }
  ]).exec()

  if (result.length === 0) {
    return { course: null, module: null, lecture: null }
  }

  return result[0]
}

