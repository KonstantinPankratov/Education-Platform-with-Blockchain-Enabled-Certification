import { Types } from "mongoose";
import { ITest } from "../models/Test";
import { IUserSolution } from "../models/UserSolution";
import { TExecutionResult } from "@/types/executionResult";

export const getLastExerciseSolution = async (exerciseId: Types.ObjectId): Promise<IUserSolution | null> => { // TODO userId
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/solution/${exerciseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Failed to get last submited code')
  }

  return res.json()
}

export const executeSolution = async (exerciseId: Types.ObjectId, solution: string, tests: ITest[]): Promise<IUserSolution | null> => { // TODO userId
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/solution`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      exerciseId: exerciseId,
      solution: solution,
      tests: tests
    })
  });

  if (!res.ok) {
    throw new Error('Failed to run code')
  }

  return res.json()
}