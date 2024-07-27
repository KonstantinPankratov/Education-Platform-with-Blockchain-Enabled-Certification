import { auth } from "@/auth"
import dbConnect from "@/db/dbConnect"
import { ITest } from "@/db/models/Test"
import UserSolution from "@/db/models/UserSolution"
import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

dbConnect()

interface RequestBody {
  exerciseId: Types.ObjectId,
  solution: string,
  tests: ITest[]
}

export async function POST(req: NextRequest) {
  const { exerciseId, solution, tests }: RequestBody = await req.json()
  let failedTestIds: Types.ObjectId[] = []
  let passedTestIds: Types.ObjectId[] = []
  let userId = null

  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "User session is missing" }, { status: 401 })
    }

    userId = session.user._id

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

    return NextResponse.json(userSolution)
  }
}