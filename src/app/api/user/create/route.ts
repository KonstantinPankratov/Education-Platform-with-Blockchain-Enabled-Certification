import dbConnect from "@/db/dbConnect"
import User from "@/db/models/auth/User"
import { genSalt, hash } from "bcrypt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  await dbConnect()

  const data = await req.json()

  try {
    const saltRounds = 10
    const password = data.password
    const salt = await genSalt(saltRounds)
    const hashedPassword = await hash(password, salt)

    const user = new User({
      ...data,
      password: hashedPassword
    })

    const save = await user.save()

    return NextResponse.json({
      message: "Account has been successfully created."
    })
  } catch (error: any) {
    return NextResponse.json({
      error: userFriendlyErrorMessage(error)
    }, { status: 500 })
  }
}

function userFriendlyErrorMessage(err: any) {
  let message = 'An error occured, please try again later.'

  if (err.name !== 'MongoServerError')
    return message

  const field = Object.keys(err.keyPattern)[0]

  switch (err.code) {
    case 11000:
      message = `User with this ${field} already exists`
      break
  }

  return message
}
