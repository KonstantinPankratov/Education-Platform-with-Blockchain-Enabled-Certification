import dbConnect from "@/db/dbConnect"
import UserSolution from "@/db/models/UserSolution"
import { NextRequest, NextResponse } from "next/server"

interface ParamsProps {
  params: {
    userId: string,
    exerciseId: string
  }
}

export async function GET(req: NextRequest, { params }: ParamsProps) {
  await dbConnect()

  const { userId, exerciseId } = params

  const solution = await UserSolution.findOne({ userId: userId, exerciseId: exerciseId })
    .populate('failedTestIds')
    .sort({ createdAt: -1 })

  return NextResponse.json(solution)
}