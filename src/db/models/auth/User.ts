import mongoose, { Model } from "mongoose"
import type { Date } from "mongoose"
import { DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

// Extend auth.js interfaces
declare module 'next-auth' {
  interface User {
    _id: string
    nameInitials?: string
  }

  interface Session {
    user: User & DefaultSession["user"] & {
      _id: string
      nameInitials: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    _id: string
    nameInitials: string
  }
}

export interface IUser {
  _id: string
  name: string
  dateOfBirth: string
  email: string
  emailVerified: Date
  image: string
  password: string
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
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
