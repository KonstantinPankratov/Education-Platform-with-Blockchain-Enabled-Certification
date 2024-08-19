import dbConnect from "@/db/dbConnect"
import UserSolution from "@/db/models/UserSolution"
import { NextRequest, NextResponse } from "next/server"

dbConnect()

interface ParamsProps {
  params: {
    userId: string,
    exerciseId: string
  }
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  try {
    const { userId, exerciseId } = params

    const solution = await UserSolution.findOne({ userId: userId, exerciseId: exerciseId })
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