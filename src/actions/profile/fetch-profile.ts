import { auth } from "@/auth"
import dbConnect from "@/db/dbConnect"
import User, { IUser } from "@/db/models/auth/User"

export type IUserProfile = Pick<IUser, "email" | "name" | "image" | "dateOfBirth"> | null // TODO move to @/types

const fetchProfile = async (): Promise<IUserProfile> => {
  try {
    const session = await auth()

    if (!session)
      throw new Error('No session found')

    await dbConnect()

    const user = await User.findById(session.user._id, 'email name image dateOfBirth')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    throw error
  }
}

export default fetchProfile