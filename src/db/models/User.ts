import mongoose, { Document, Schema, model } from "mongoose"

export interface IUser extends Document {
  first_name: string,
  last_name: string,
  email: string,
  image: string,
  password: string
}

export const UserSchema: Schema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  password: {
    type: String
  }
})

export default mongoose.models.User || model<IUser>('User', UserSchema)
