
import mongoose from 'mongoose'
import Exercise from './models/Exercise'
import Lecture from './models/Lecture'
import Course from './models/Course'
import Module from './models/Module'
import Test from './models/Test'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = (global as { [key: string]: any }).mongoose

if (!cached) {
  cached = (global as { [key: string]: any }).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then(mongoose => {
      return mongoose
    }).catch((error) => {
      console.error("Failed to connect to DB")
      cached.promise = null
      throw error
    })

    mongoose.model('Test', Test.schema)
    mongoose.model('Exercise', Exercise.schema)
    mongoose.model('Lecture', Lecture.schema)
    mongoose.model('Module', Module.schema)
    mongoose.model('Course', Course.schema)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect