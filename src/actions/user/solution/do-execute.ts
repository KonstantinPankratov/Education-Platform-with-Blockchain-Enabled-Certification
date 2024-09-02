"use server"

import fetchCourseByExerciseId from "@/actions/course/auth/fetch-course-by-exercise-id";
import isCourseCompleted from "@/actions/course/auth/is-course-completed";
import dbConnect from "@/db/dbConnect";
import User from "@/db/models/auth/User";
import { ITest } from "@/db/models/Test";
import UserSolution, { IUserSolution } from "@/db/models/UserSolution";
import { Types } from "mongoose";
import { revalidateTag } from "next/cache";

const executeSolution = async (userId: string, exerciseId: string, solution: string, tests: ITest[]): Promise<IUserSolution | null> => {
  const failedTestIds: Types.ObjectId[] = []
  const passedTestIds: Types.ObjectId[] = []

  try {
    await dbConnect()

    const userObjectId = new Types.ObjectId(userId)

    const user = await User.exists({ _id: userObjectId })

    if (!user)
      throw new Error("Oops, an error occured, please try again later")

    const ivm = eval("require")("isolated-vm") // import ivm from 'isolated-vm' doesn't work

    const isolate = new ivm.Isolate({
      memoryLimit: 16 // MB
    })

    const context = isolate.createContextSync()

    // TODO 1) Collect console.log/debug/error using listener
    // TODO 2) Parse console.log 

    context.evalSync(solution)

    for (const test of tests) {
      const result = context.evalSync(test.input)

      if (result !== test.output) {
        failedTestIds.push(test._id)
      }

      passedTestIds.push(test._id)
    }

    isolate.dispose()
  } catch (error: any) {
    console.error(error)
  } finally {
    const userSolution = await UserSolution.create({
      userId: userId,
      exerciseId: exerciseId,
      content: solution,
      failedTestIds: failedTestIds
    })

    await userSolution.populate('failedTestIds')

    if (failedTestIds.length === 0) { // solution is correct, exercise is completed
      revalidateTag('auth-course')
      isCourseCompleted(userId, await fetchCourseByExerciseId(exerciseId))
    }

    return JSON.parse(JSON.stringify(userSolution)) // TODO create helper func convertObjectIdsToStrings
  }
}

export default executeSolution