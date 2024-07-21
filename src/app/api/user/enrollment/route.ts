import dbConnect from "@/db/dbConnect"
import UserCourse from "@/db/models/UserCourse"
import User from "@/db/models/auth/User"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    await dbConnect()
  
    const courseId = data.courseId
    const userId = data.userId
  
    const user = await User.exists({ _id: userId })
  
    if (!user)
      throw new Error("Oops, an error occured, please try again later")
  
    const enrollment = await UserCourse.findOne({userId: userId, courseId: courseId})

    if (enrollment)
      throw new Error("You are already enrolled in this course")
  
    const newEnrollment = new UserCourse({userId: userId, courseId: courseId})
  
    await newEnrollment.save()

    revalidateTag('userEnrollments')
  
    return NextResponse.json({
      message: "You have successfully enrolled in the course"
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}