import dbConnect from "../dbConnect"
import Course, { ICourse } from "../models/Course"
import Exercise, { IExercise } from "../models/Exercise"
import Lecture, { ILecture } from "../models/Lecture"
import Module, { IModule } from "../models/Module"
import { Types } from "mongoose"
import UserSolution, { IUserSolution } from "../models/UserSolution"

/**
 * Returns courses
 * @param upToLevel
 * @returns Promise<ICourse[]>
 */

export async function getCourses(): Promise<ICourse[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`, {
    method: 'GET',
    next: {
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch courses')
  }

  return res.json()
}

/**
 * Returns course by slug
 * @param slug
 * @returns Promise<ICourse | null>
 */

export async function getCourseBySlug(slug: string): Promise<ICourse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${slug}`, {
    method: 'GET',
    next: {
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course')
  }

  return res.json()
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${courseSlug}/lecture/${lectureSlug}`, {
    method: 'GET',
    next: {
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course, module, lecture')
  }

  return res.json()
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${courseSlug}/lecture/any/exercise/${exerciseSlug}`, {
    method: 'GET',
    next: {
      revalidate: 3600
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course, module, lecture, exercise')
  }

  return res.json()
}

/**
 * Returns next part of the course
 * TODO cache results
 */

interface NextCoursePartProps {
  courseId: Types.ObjectId,
  moduleId: Types.ObjectId,
  lectureId: Types.ObjectId,
  exerciseId?: Types.ObjectId
}

export async function getNextCoursePart({ courseId, moduleId, lectureId, exerciseId }: NextCoursePartProps): Promise<IExercise | ILecture | null> {
  if (exerciseId) {
    const currentExercise = await Exercise.findById(exerciseId)

    if (!currentExercise)
      throw new Error('Invalid exercise ID')

    // Next exercise
    const nextExercise = await Exercise.findOne({
      lectureId: lectureId,
      order: { $gt: currentExercise.order },
    }).sort({ order: 1 })

    if (nextExercise) return nextExercise
  }

  const exercise = await Exercise.findOne({ lectureId: lectureId }).sort({ order: 1 })

  if (!exerciseId && exercise) {
    return exercise
  }

  const currentLecture = await Lecture.findById(lectureId)

  if (!currentLecture)
    throw new Error('Invalid lecture ID')

  const nextLecture = await Lecture.findOne({
    moduleId: moduleId,
    order: { $gt: currentLecture.order },
  }).sort({ order: 1 })

  if (nextLecture) {
    return nextLecture
  }

  const currentModule = await Module.findById(moduleId)

  if (!currentModule)
    throw new Error('Invalid lecture ID')

  const nextModule = await Module.findOne({
    courseId: courseId,
    order: { $gt: currentModule.order },
  }).sort({ order: 1 })

  if (nextModule) {
    const firstLecture = await Lecture.findOne({ moduleId: nextModule._id }).sort({ order: 1 })
    return firstLecture
  }

  // TODO End of course
  return null
}

export async function getNextCoursePartLink({ courseId, moduleId, lectureId, exerciseId }: NextCoursePartProps): Promise<string> {
  const course = await Course.findById(courseId)

  if (!course)
    throw new Error('Invalid course ID')

  const nextCoursePart = await getNextCoursePart({ courseId, moduleId, lectureId, exerciseId })

  if (nextCoursePart) {
    if (nextCoursePart instanceof Exercise) {
      return getExerciseLink(course.slug, nextCoursePart.slug)
    }

    if (nextCoursePart instanceof Lecture) {
      return getLectureLink(course.slug, nextCoursePart.slug)
    }
  }

  return getCourseLink(course.slug)
}

export async function getContinueCoursePart(userId: string) {
  const solution: IUserSolution | null = await UserSolution.findOne({ userId: userId }).sort({ createdAt: -1 })

  if (!solution) {
    return await Lecture.findOne().sort({ order: 1 })
  }

  const exercise: IExercise | null = await Exercise.findById(solution.exerciseId)

  if (!exercise) {
    throw new Error(`Exercise not found with ID ${solution.exerciseId}`)
  }

  const lecture = await Lecture.findById(exercise.lectureId)
  if (!lecture) {
    throw new Error(`Lecture not found with ID ${exercise.lectureId}`)
  }

  const mod = await Module.findById(lecture.moduleId)

  if (!mod) {
    throw new Error(`Module not found with ID ${lecture.moduleId}`)
  }

  return await getNextCoursePart({ courseId: mod.courseId, moduleId: lecture.moduleId, lectureId: exercise.lectureId, exerciseId: solution.exerciseId })
}

export async function getContinueCoursePartLink(courseSlug: string, userId: string) {
  const nextCoursePart = await getContinueCoursePart(userId)

  if (nextCoursePart) {
    if (nextCoursePart instanceof Exercise) {
      return getExerciseLink(courseSlug, nextCoursePart.slug)
    }

    if (nextCoursePart instanceof Lecture) {
      return getLectureLink(courseSlug, nextCoursePart.slug)
    }
  }

  return getCourseLink(courseSlug)
}

export function getCourseLink(courseSlug: string) {
  return `/course/${courseSlug}`
}

export function getLectureLink(courseSlug: string, lectureSlug: string) {
  return `/course/${courseSlug}/lecture/${lectureSlug}`
}

export function getExerciseLink(courseSlug: string, exerciseSlug: string) {
  return `/course/${courseSlug}/exercise/${exerciseSlug}`
}
