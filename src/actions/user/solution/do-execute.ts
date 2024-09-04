"use server"

import fetchCourseIdByExerciseId from "@/actions/course/auth/fetch-course-by-exercise-id"
import isCourseCompleted from "@/actions/course/auth/is-course-completed"
import dbConnect from "@/db/dbConnect"
import User from "@/db/models/auth/User"
import { ITest } from "@/db/models/Test"
import UserSolution from "@/db/models/UserSolution"
import { Types } from "mongoose"
import { revalidateTag } from "next/cache"

const executeSolution = async (userId: string, exerciseId: string, solution: string, tests: ITest[]) => {
  const failedTestIds: string[] = []
  const passedTestIds: string[] = []
  const errorMessages: string[] = []
  const stdout: string[] = []

  try {
    await dbConnect()

    const userObjectId = new Types.ObjectId(userId)

    const user = await User.exists({ _id: userObjectId })

    if (!user)
      throw new Error("Oops, an error occured, please try again later")

    const ivm = eval("require")("isolated-vm") // import ivm from 'isolated-vm' doesn't work

    const isolate = new ivm.Isolate({
      memoryLimit: 8 // MB
    })

    const context = isolate.createContextSync()

    // Capture console.log output
    context.evalClosureSync(`globalThis.console = { log: $0 }`,
      [(...args: string[]) => stdout.push(args.join(' '))]
    )

    context.evalSync(solution)

    for (const test of tests) {
      const result = context.evalSync(test.input)

      if (result !== test.output) {
        errorMessages.push(test.errorMsg)
        failedTestIds.push(test._id)
      }

      passedTestIds.push(test._id)
    }

    isolate.dispose()
  } catch (error: any) {
    errorMessages.push(error.message)
  } finally {
    await UserSolution.deleteMany()

    const userSolution = await UserSolution.create({
      userId: userId,
      exerciseId: exerciseId,
      content: solution,
      failedTestIds: failedTestIds
    })

    await userSolution.populate('failedTestIds')

    if (errorMessages.length === 0 && failedTestIds.length === 0) { // solution is correct, exercise is completed
      revalidateTag('auth-course')
      const courseId = await fetchCourseIdByExerciseId(exerciseId)
      if (courseId)
        isCourseCompleted(userId, courseId)
    }

    return {
      errorMessages: errorMessages,
      stdout: stdout
    }
  }
}

export default executeSolution