import { auth } from "@/auth"
import dbConnect from "@/db/dbConnect"
import UserSolution from "@/db/models/UserSolution"
import { NextRequest, NextResponse } from "next/server"

dbConnect()

interface ParamsProps {
  params: { exerciseId: string }
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  try {
    const { exerciseId } = params

    const session = await auth()

    if (!session?.user) {
      throw new Error('User session is missing')
    }

    const solution = await UserSolution.findOne({ userId: session.user._id, exerciseId: exerciseId })
      .populate('failedTestIds')
      .sort({ createdAt: -1 })

    return NextResponse.json(solution)
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 500
    })
  }
}