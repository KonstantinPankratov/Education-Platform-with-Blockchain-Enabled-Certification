import dbConnect from "../dbConnect"
import Course, { ICourse } from "../models/Course"
import { IExercise } from "../models/Exercise"
import { ILecture } from "../models/Lecture"
import { IModule } from "../models/Module"

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

