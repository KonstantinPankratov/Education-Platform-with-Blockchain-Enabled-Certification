import dbConnect from "../dbConnect"
import Course, { ICourse } from "../models/Course"

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
