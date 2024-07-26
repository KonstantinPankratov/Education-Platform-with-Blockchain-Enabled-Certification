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
  let failedTestId: Types.ObjectId | null = null
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

    context.evalSync(solution)

    for (const test of tests) {
      const result = context.evalSync(test.input)

      if (result !== test.output) {
        failedTestId = test._id
        throw new Error(test.errorMsg)
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
      failedTestId: failedTestId
    })

    await userSolution.populate('failedTestId')

    return NextResponse.json(userSolution)
  }
}