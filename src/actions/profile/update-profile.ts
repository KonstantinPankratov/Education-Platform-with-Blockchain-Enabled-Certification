"use server"

import { auth } from "@/auth"
import dbConnect from "@/db/dbConnect"
import User from "@/db/models/auth/User"
import { ProfileSchema } from "@/lib/zod"
import { z } from "zod"

const updateProfile = async (data: z.infer<typeof ProfileSchema>) => {
  try {
    const session = await auth()

    if (!session)
      throw new Error('No session found')

    await dbConnect()

    const validatedData = ProfileSchema.safeParse(data)

    if (validatedData.error)
      throw new Error('Data validation failed')

    const { name, dateOfBirth } = validatedData.data

    await User.findOneAndUpdate({
      _id: session.user._id
    }, {
      name: name,
      dateOfBirth: dateOfBirth
    })

    return { message: "Profile successfully updated" }
  } catch (error) {
    throw error
  }
}

export default updateProfile