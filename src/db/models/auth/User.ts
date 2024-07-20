import mongoose, { Model, Types } from "mongoose"
import type { Date } from "mongoose"
import { DefaultSession } from "next-auth"

// Extend auth.js session.user type
declare module 'next-auth' {
  interface Session {
    user: {
      firstName: string
      lastName: string
      nameInitials: string
    } & DefaultSession['user']
  }
}

export interface IUser {
  _id: Types.ObjectId
  firstName?: string
  lastName?: string
  nameInitials?: string
  email: string
  emailVerified: Date
  image: string
  password: string
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  emailVerified: {
    type: Date,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
})

const registeredModel: Model<IUser> = mongoose.models.User
export default registeredModel || mongoose.model<IUser>("User", UserSchema)
