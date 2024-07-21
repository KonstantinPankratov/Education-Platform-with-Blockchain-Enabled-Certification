import dbConnect from "@/db/dbConnect"
import { ICourse } from "@/db/models/Course"
import UserCourse, { IUserCourse } from "@/db/models/UserCourse"
import { Types } from "mongoose"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { userId: string }}) {
  try {
    const { userId } = params

    await dbConnect()

    const enrolledCourses = await UserCourse.aggregate<IUserCourse>([
      { $match: { userId: new Types.ObjectId(userId) } }
    ])

    return NextResponse.json(enrolledCourses.map(v => v.courseId))
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}