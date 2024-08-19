import dbConnect from "@/db/dbConnect"
import User, { IUser } from "@/db/models/auth/User"
import { Types } from "mongoose"

export type IUserProfile = Pick<IUser, "email" | "name" | "image" | "dateOfBirth"> | null // TODO move to @/types

const fetchProfile = async (userId: string): Promise<IUserProfile> => {
  try {
    const userObjectId = new Types.ObjectId(userId)

    await dbConnect()

    const user = await User.findById(userObjectId, 'email name image dateOfBirth')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    throw error
  }
}

export default fetchProfile