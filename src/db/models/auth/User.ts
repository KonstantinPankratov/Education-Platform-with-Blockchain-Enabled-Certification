import mongoose, {Model} from "mongoose"
import type {Date} from "mongoose"

export interface IUser {
  first_name: string
  last_name: string
  email: string
  emailVerified: Date
  image: string
  password: string
}

const UserSchema = new mongoose.Schema<IUser>({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
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
export default registeredModel ||
  mongoose.model<IUser>("User", UserSchema)
